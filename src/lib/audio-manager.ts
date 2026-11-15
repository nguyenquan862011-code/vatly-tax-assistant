import { APP_CONFIG, type AudioTrackConfig } from "./config";

export interface AudioState {
  isPlaying: boolean;
  isEnabled: boolean; // user's explicit preference
  volume: number; // 0 to 1
  isMuted: boolean;
  autoplayBlocked: boolean;
  isInLab: boolean;
  isLoaded: boolean;
  currentTrack: AudioTrackConfig;
  playlist: AudioTrackConfig[];
  currentTime: number;
  duration: number;
  repeatMode: "off" | "all" | "one";
  isShuffle: boolean;
  trackNotice?: string | null;
}

type AudioListener = (state: AudioState) => void;

export class BackgroundAudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<AudioListener> = new Set();
  private playlist: AudioTrackConfig[] = APP_CONFIG.backgroundAudio.playlist;
  private currentTrackIndex: number = 0;
  private previousVolume: number = APP_CONFIG.backgroundAudio.defaultVolume;

  private state: AudioState = {
    isPlaying: false,
    isEnabled: true,
    volume: APP_CONFIG.backgroundAudio.defaultVolume,
    isMuted: false,
    autoplayBlocked: false,
    isInLab: false,
    isLoaded: false,
    currentTrack: APP_CONFIG.backgroundAudio.playlist[0],
    playlist: APP_CONFIG.backgroundAudio.playlist,
    currentTime: 0,
    duration: 0,
    repeatMode: "all",
    isShuffle: false,
    trackNotice: null,
  };

  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.initFromStorage();
    }
  }

  public getAvailableTracks(): AudioTrackConfig[] {
    return this.playlist.filter((t) => t.isAvailable && Boolean(t.src));
  }

  public getUnverifiedTracks(): AudioTrackConfig[] {
    return this.playlist.filter((t) => !t.isAvailable);
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
          if (parsed > 0) this.previousVolume = parsed;
          this.state.isMuted = parsed === 0;
        }
      }

      const storedTrackId = localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyTrack);
      if (storedTrackId) {
        const idx = this.playlist.findIndex((t) => t.id === storedTrackId);
        if (idx !== -1) {
          this.currentTrackIndex = idx;
          this.state.currentTrack = this.playlist[idx];
        }
      }

      const storedRepeat = localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyRepeat);
      if (storedRepeat === "off" || storedRepeat === "all" || storedRepeat === "one") {
        this.state.repeatMode = storedRepeat;
      }

      const storedShuffle = localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyShuffle);
      if (storedShuffle !== null) {
        this.state.isShuffle = storedShuffle === "true";
      }
    } catch (err) {
      console.warn("[TamGiang Audio] Storage access warning:", err);
    }
  }

  private getAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;

    if (!this.audio) {
      try {
        const audio = new Audio();
        audio.preload = "auto";
        audio.volume = this.state.isMuted ? 0 : this.state.volume;

        const initialSrc =
          this.state.currentTrack.isAvailable && this.state.currentTrack.src
            ? this.state.currentTrack.src
            : this.getAvailableTracks()[0]?.src || APP_CONFIG.backgroundAudio.src;

        audio.src = initialSrc;

        audio.addEventListener("playing", () => {
          this.state.isPlaying = true;
          this.state.autoplayBlocked = false;
          this.notify();
        });

        audio.addEventListener("pause", () => {
          this.state.isPlaying = false;
          this.notify();
        });

        audio.addEventListener("timeupdate", () => {
          this.state.currentTime = audio.currentTime || 0;
          this.state.duration = audio.duration || 0;
          this.notify();
        });

        audio.addEventListener("loadedmetadata", () => {
          this.state.duration = audio.duration || 0;
          this.state.isLoaded = true;
          this.notify();
        });

        audio.addEventListener("ended", () => {
          this.handleTrackEnded();
        });

        audio.addEventListener("error", (e) => {
          console.warn("[TamGiang Audio] Audio stream notice:", e);
          this.state.isLoaded = false;
          this.notify();
        });

        this.audio = audio;
      } catch (err) {
        console.warn("[TamGiang Audio] Could not instantiate Audio:", err);
      }
    }

    return this.audio;
  }

  private handleTrackEnded() {
    if (this.state.repeatMode === "one") {
      if (this.audio) {
        this.audio.currentTime = 0;
        this.audio.play().catch((err) => console.warn(err));
      }
    } else if (this.state.repeatMode === "all") {
      this.next();
    } else {
      // repeat off: stop at end of playlist
      if (this.currentTrackIndex < this.playlist.length - 1) {
        this.next();
      } else {
        this.state.isPlaying = false;
        this.notify();
      }
    }
  }

  public getState(): AudioState {
    return { ...this.state };
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
      lower.includes("bai-hoc") ||
      lower.includes("lab")
    );
  }

  /**
   * Handle route navigation:
   * Keeps music playing seamlessly when entering Lab.
   */
  public onRouteChanged(pathname: string) {
    if (typeof window !== "undefined") {
      this.getAudio();
    }
    const inLab = this.isLabRoute(pathname);
    this.state.isInLab = inLab;
    this.notify();
  }

  /**
   * Attempt playback
   */
  public async play(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    const audio = this.getAudio();
    if (!audio) return false;

    const available = this.getAvailableTracks();
    const fallback = available[0] || APP_CONFIG.backgroundAudio.playlist[0];

    // If active track is unverified/has no file, provide clear notice and play verified fallback
    if (!this.state.currentTrack.isAvailable || !this.state.currentTrack.src) {
      this.state.trackNotice = `Bài "${this.state.currentTrack.title}" chưa có tệp được xác minh bản quyền. Đang phát bài có bản quyền mở: "${fallback.title}".`;
      if (fallback.src) {
        audio.src = fallback.src;
      }
    } else {
      this.state.trackNotice = null;
      const expectedUrl = window.location.origin + this.state.currentTrack.src;
      if (audio.src !== expectedUrl && audio.src !== this.state.currentTrack.src) {
        audio.src = this.state.currentTrack.src;
      }
    }

    this.state.isPlaying = true;
    this.state.isEnabled = true;
    this.state.autoplayBlocked = false;

    try {
      localStorage.setItem(APP_CONFIG.backgroundAudio.storageKeyEnabled, "true");
    } catch (err) {
      console.warn("[TamGiang Audio] Storage write skipped:", err);
    }
    this.notify();

    try {
      audio.volume = this.state.isMuted ? 0 : this.state.volume;
      await audio.play();
      return true;
    } catch (err: unknown) {
      const error = err as { name?: string };
      if (error?.name === "NotAllowedError") {
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

    try {
      localStorage.setItem(APP_CONFIG.backgroundAudio.storageKeyEnabled, "false");
    } catch (err) {
      console.warn("[TamGiang Audio] Storage write skipped:", err);
    }
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
   * Select a specific track by index or ID
   */
  public selectTrack(trackId: string) {
    const idx = this.playlist.findIndex((t) => t.id === trackId);
    if (idx === -1) return;

    this.currentTrackIndex = idx;
    this.state.currentTrack = this.playlist[idx];

    try {
      localStorage.setItem(APP_CONFIG.backgroundAudio.storageKeyTrack, trackId);
    } catch (err) {
      console.warn("[TamGiang Audio] Storage write skipped:", err);
    }

    const available = this.getAvailableTracks();
    const fallback = available[0] || APP_CONFIG.backgroundAudio.playlist[0];

    if (!this.state.currentTrack.isAvailable || !this.state.currentTrack.src) {
      this.state.trackNotice = `Bài "${this.state.currentTrack.title}" chưa có tệp được xác minh giấy phép bản quyền. Vui lòng chọn bài đã có tệp được cấp phép mở.`;
    } else {
      this.state.trackNotice = null;
    }

    const audio = this.getAudio();
    if (audio) {
      if (!this.state.currentTrack.isAvailable || !this.state.currentTrack.src) {
        if (fallback.src) {
          audio.src = fallback.src;
          audio.currentTime = 0;
        }
      } else {
        audio.src = this.state.currentTrack.src;
        audio.currentTime = 0;
      }

      if (this.state.isEnabled || this.state.isPlaying) {
        this.play().catch((err) => console.warn(err));
      } else {
        this.notify();
      }
    } else {
      this.notify();
    }
  }

  /**
   * Next track (cycles through tracks, prefers verified tracks)
   */
  public next() {
    if (this.state.isShuffle) {
      const available = this.getAvailableTracks();
      const pool = available.length > 0 ? available : this.playlist;
      const nextIdx = Math.floor(Math.random() * pool.length);
      this.selectTrack(pool[nextIdx].id);
    } else {
      const nextIdx = (this.currentTrackIndex + 1) % this.playlist.length;
      this.selectTrack(this.playlist[nextIdx].id);
    }
  }

  /**
   * Previous track
   */
  public previous() {
    if (this.audio && this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    const prevIdx = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.selectTrack(this.playlist[prevIdx].id);
  }

  /**
   * Toggle shuffle mode
   */
  public toggleShuffle() {
    this.state.isShuffle = !this.state.isShuffle;
    try {
      localStorage.setItem(
        APP_CONFIG.backgroundAudio.storageKeyShuffle,
        this.state.isShuffle.toString(),
      );
    } catch (err) {
      console.warn(err);
    }
    this.notify();
  }

  /**
   * Cycle repeat mode (off -> all -> one -> off)
   */
  public cycleRepeatMode() {
    const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
    const current = modes.indexOf(this.state.repeatMode);
    const next = modes[(current + 1) % modes.length];
    this.state.repeatMode = next;
    try {
      localStorage.setItem(APP_CONFIG.backgroundAudio.storageKeyRepeat, next);
    } catch (err) {
      console.warn(err);
    }
    this.notify();
  }

  /**
   * Seek audio position in seconds
   */
  public seek(timeInSeconds: number) {
    if (!this.audio) return;
    const clamped = Math.max(0, Math.min(this.state.duration || 0, timeInSeconds));
    this.audio.currentTime = clamped;
    this.state.currentTime = clamped;
    this.notify();
  }

  /**
   * Set volume [0.0 - 1.0]
   */
  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.state.volume = clamped;
    this.state.isMuted = clamped === 0;
    if (clamped > 0) {
      this.previousVolume = clamped;
    }
    if (this.audio) {
      this.audio.volume = clamped;
    }
    try {
      localStorage.setItem(APP_CONFIG.backgroundAudio.storageKeyVolume, clamped.toString());
    } catch (err) {
      console.warn(err);
    }
    this.notify();
  }

  /**
   * Toggle mute
   */
  public toggleMute() {
    if (this.state.isMuted || this.state.volume === 0) {
      const restoreVol = this.previousVolume > 0 ? this.previousVolume : 0.25;
      this.setVolume(restoreVol);
    } else {
      this.previousVolume = this.state.volume;
      this.setVolume(0);
    }
  }
}

// Global Singleton instance
export const audioManager = new BackgroundAudioManager();
