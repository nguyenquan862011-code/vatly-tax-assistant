import { APP_CONFIG } from "./config";

export interface AudioState {
  isPlaying: boolean;
  isEnabled: boolean; // user's explicit preference
  volume: number; // 0 to 1
  autoplayBlocked: boolean;
  isInLab: boolean;
  isPausedByLab: boolean;
  isLoaded: boolean;
}

type AudioListener = (state: AudioState) => void;

export class BackgroundAudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<AudioListener> = new Set();
  private state: AudioState = {
    isPlaying: false,
    isEnabled: true, // Default to true on initial site visit, can be toggled
    volume: APP_CONFIG.backgroundAudio.defaultVolume,
    autoplayBlocked: false,
    isInLab: false,
    isPausedByLab: false,
    isLoaded: false,
  };
  private pausedByLab: boolean = false;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.initFromStorage();
    }
  }

  private initFromStorage() {
    if (typeof window === "undefined" || this.isInitialized) return;
    this.isInitialized = true;

    try {
      const storedEnabled = localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyEnabled);
      if (storedEnabled !== null) {
        this.state.isEnabled = storedEnabled === "true";
      }

      const storedVolume = localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyVolume);
      if (storedVolume !== null) {
        const parsed = parseFloat(storedVolume);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          this.state.volume = parsed;
        }
      }
    } catch {
      // localStorage may fail in private mode
    }
  }

  private getAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;

    if (!this.audio) {
      try {
        const audio = new Audio(APP_CONFIG.backgroundAudio.src);
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = this.state.volume;

        audio.addEventListener("playing", () => {
          this.state.isPlaying = true;
          this.state.autoplayBlocked = false;
          this.notify();
        });

        audio.addEventListener("pause", () => {
          this.state.isPlaying = false;
          this.notify();
        });

        audio.addEventListener("canplaythrough", () => {
          this.state.isLoaded = true;
          this.notify();
        });

        audio.addEventListener("error", (e) => {
          console.warn("[TamGiang Audio] Error loading audio file:", e);
        });

        this.audio = audio;
      } catch (err) {
        console.warn("[TamGiang Audio] Could not instantiate Audio:", err);
      }
    }

    return this.audio;
  }

  public getState(): AudioState {
    return {
      ...this.state,
      isPausedByLab: this.pausedByLab,
    };
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const currentState = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(currentState);
      } catch (err) {
        console.error("[TamGiang Audio] Listener error:", err);
      }
    });
  }

  public isLabRoute(pathname: string): boolean {
    if (!pathname) return false;
    const lower = pathname.toLowerCase();
    return (
      lower.startsWith("/mo-phong") ||
      lower.startsWith("/bai-hoc") ||
      lower.includes("mo-phong") ||
      lower.includes("bai-hoc")
    );
  }

  /**
   * Handle navigation change across TanStack Router
   */
  public onRouteChanged(pathname: string) {
    if (typeof window !== "undefined") {
      this.getAudio(); // ensure audio initialized
    }
    const isLab = this.isLabRoute(pathname);
    this.state.isInLab = isLab;

    if (isLab) {
      // Entered laboratory / simulation route: MUST STOP IMMEDIATELY
      if (this.state.isPlaying || (this.audio && !this.audio.paused)) {
        this.pausedByLab = true;
        if (this.audio) {
          this.audio.pause();
        }
        this.state.isPlaying = false;
      }
      this.notify();
    } else {
      // Leaving lab route back to standard pages (homepage, materials, etc.)
      if (this.pausedByLab && this.state.isEnabled) {
        this.pausedByLab = false;
        // Resume playback gently if user had enabled it
        this.play().catch(() => {
          // In case browser requires interaction
        });
      } else {
        this.notify();
      }
    }
  }

  /**
   * Attempt playback on initial visit or user action
   */
  public async play(): Promise<boolean> {
    if (typeof window === "undefined") return false;
    if (this.state.isInLab) {
      // Never play inside lab
      return false;
    }

    const audio = this.getAudio();
    if (!audio) return false;

    this.state.isPlaying = true;
    this.state.isEnabled = true;
    this.state.autoplayBlocked = false;
    this.pausedByLab = false;
    try {
      localStorage.setItem(APP_CONFIG.backgroundAudio.storageKeyEnabled, "true");
    } catch {}
    this.notify();

    try {
      audio.volume = this.state.volume;
      await audio.play();
      return true;
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      if (error && error.name === "NotAllowedError") {
        // Browser blocked autoplay
        this.state.autoplayBlocked = true;
        this.state.isPlaying = false;
        this.notify();
      } else {
        console.warn("[TamGiang Audio] Playback failed:", err);
        this.state.isPlaying = false;
        this.notify();
      }
      return false;
    }
  }

  /**
   * Pause playback
   */
  public pause() {
    if (typeof window === "undefined") return;
    if (this.audio) {
      this.audio.pause();
    }
    this.state.isPlaying = false;
    this.state.isEnabled = false;
    this.pausedByLab = false;
    try {
      localStorage.setItem(APP_CONFIG.backgroundAudio.storageKeyEnabled, "false");
    } catch {}
    this.notify();
  }

  /**
   * Toggle playback
   */
  public toggle() {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      return this.play();
    }
  }

  /**
   * Set volume [0.0 - 1.0]
   */
  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.state.volume = clamped;
    if (this.audio) {
      this.audio.volume = clamped;
    }
    try {
      localStorage.setItem(APP_CONFIG.backgroundAudio.storageKeyVolume, clamped.toString());
    } catch {}
    this.notify();
  }
}

// Global Singleton instance
export const audioManager = new BackgroundAudioManager();
