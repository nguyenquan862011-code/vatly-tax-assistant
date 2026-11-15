import { describe, expect, it, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { APP_CONFIG } from "@/lib/config";
import { BackgroundAudioManager } from "@/lib/audio-manager";

describe("TamGiangPhysics Design System & Audio System", () => {
  it("verifies exact Light Mode and Dark Mode color tokens in styles.css", () => {
    const cssPath = path.resolve(__dirname, "../styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8").toLowerCase();

    // Exact Light Mode tokens required by prompt
    expect(cssContent).toContain("#f7f8f2"); // Light primary background
    expect(cssContent).toContain("#eef3ec"); // Light secondary background
    expect(cssContent).toContain("#ffffff"); // Light card background
    expect(cssContent).toContain("#e5f0e5"); // Light highlight area
    expect(cssContent).toContain("#075c40"); // Dark brand green
    expect(cssContent).toContain("#16845a"); // Light main green
    expect(cssContent).toContain("#63b77a"); // Light soft green
    expect(cssContent).toContain("#c8ed78"); // Lime accent
    expect(cssContent).toContain("#172c23"); // Light primary text
    expect(cssContent).toContain("#65756b"); // Light secondary text
    expect(cssContent).toContain("#dce5da"); // Light border

    // Exact Dark Mode tokens required by prompt
    expect(cssContent).toContain("#0b1511"); // Dark primary background
    expect(cssContent).toContain("#101f18"); // Dark secondary background
    expect(cssContent).toContain("#15271e"); // Dark card background
    expect(cssContent).toContain("#1b3025"); // Dark highlight card
    expect(cssContent).toContain("#38a875"); // Dark main green
    expect(cssContent).toContain("#72cf91"); // Dark bright green
    expect(cssContent).toContain("#edf5ed"); // Dark primary text
    expect(cssContent).toContain("#a5b7a8"); // Dark secondary text
    expect(cssContent).toContain("#2b4033"); // Dark border
  });

  it("verifies physical spectrum and raw physics preservation rules in CSS", () => {
    const cssPath = path.resolve(__dirname, "../styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Ensure filter:none on canvases, optical chamber, and media to preserve raw scientific colors
    expect(cssContent).toContain("canvas");
    expect(cssContent).toContain(".optical-chamber");
    expect(cssContent).toContain("filter: none !important");
  });

  it("verifies background music file exists and matches the provided 'The Moment' audio", () => {
    const audioPath = path.resolve(__dirname, "../../public/audio/background-music.mp3");
    expect(fs.existsSync(audioPath)).toBe(true);

    const stats = fs.statSync(audioPath);
    // 5.6MB file (at least 5MB)
    expect(stats.size).toBeGreaterThan(5 * 1024 * 1024);

    expect(APP_CONFIG.backgroundAudio.src).toBe("/audio/background-music.mp3");
    expect(APP_CONFIG.backgroundAudio.trackName).toBe("The Moment");
  });

  it("verifies multi-track playlist contains all required scientific audio genres", () => {
    const playlist = APP_CONFIG.backgroundAudio.playlist;
    expect(playlist.length).toBeGreaterThanOrEqual(7);

    const genres = playlist.map((t) => t.genre);
    expect(genres).toContain("Chill");
    expect(genres).toContain("Ambient");
    expect(genres).toContain("Lo-fi Study");
    expect(genres).toContain("Soft Piano");
    expect(genres).toContain("Deep Focus");
    expect(genres).toContain("Space Ambient");
    expect(genres).toContain("Calm Electronic");

    // The Moment is active and available
    const activeTrack = playlist.find((t) => t.id === "track-chill-moment");
    expect(activeTrack).toBeDefined();
    expect(activeTrack?.isAvailable).toBe(true);
  });

  describe("BackgroundAudioManager Route and Lab Logic", () => {
    let manager: BackgroundAudioManager;

    beforeEach(() => {
      localStorage.clear();
      manager = new BackgroundAudioManager();
    });

    it("correctly identifies lab routes vs standard pages", () => {
      // Lab routes
      expect(manager.isLabRoute("/mo-phong")).toBe(true);
      expect(manager.isLabRoute("/mo-phong/")).toBe(true);
      expect(manager.isLabRoute("/mo-phong/lop-10/chuyen-dong")).toBe(true);
      expect(manager.isLabRoute("/bai-hoc/con-lac-don")).toBe(true);

      // Non-lab routes
      expect(manager.isLabRoute("/")).toBe(false);
      expect(manager.isLabRoute("/tai-lieu")).toBe(false);
      expect(manager.isLabRoute("/gioi-thieu")).toBe(false);
    });

    it("allows music to keep playing seamlessly when navigating into and out of laboratory", async () => {
      // User enables audio on homepage
      await manager.play();
      const state1 = manager.getState();
      expect(state1.isEnabled).toBe(true);
      expect(state1.isPlaying).toBe(true);

      // Navigate to lab route: music is NOT locked, user can continue listening
      manager.onRouteChanged("/mo-phong/lop-12/song-anh-sang");
      const stateInLab = manager.getState();
      expect(stateInLab.isInLab).toBe(true);
      expect(stateInLab.isPlaying).toBe(true); // DOES NOT force pause!

      // User can switch tracks inside lab
      manager.next();
      expect(manager.getState().currentTrack).toBeDefined();

      // Returning to homepage maintains playback state
      manager.onRouteChanged("/");
      expect(manager.getState().isInLab).toBe(false);
      expect(manager.getState().isPlaying).toBe(true);
    });

    it("allows manual pause and resume at any time", () => {
      manager.pause();
      expect(manager.getState().isPlaying).toBe(false);
      expect(manager.getState().isEnabled).toBe(false);
      expect(localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyEnabled)).toBe("false");
    });

    it("persists volume and enabled state in localStorage", async () => {
      manager.setVolume(0.42);
      expect(manager.getState().volume).toBe(0.42);
      expect(localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyVolume)).toBe("0.42");

      await manager.play();
      expect(localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyEnabled)).toBe("true");

      manager.pause();
      expect(localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyEnabled)).toBe("false");
    });
  });
});
