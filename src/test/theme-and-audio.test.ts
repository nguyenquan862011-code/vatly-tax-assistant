import { describe, expect, it, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { APP_CONFIG } from "@/lib/config";
import { BackgroundAudioManager } from "@/lib/audio-manager";

describe("TamGiangPhysics Design System & Audio System", () => {
  it("verifies exact Light Mode and Dark Mode color tokens in styles.css", () => {
    const cssPath = path.resolve(__dirname, "../styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Exact Light Mode tokens required by prompt
    expect(cssContent).toContain("#F7F8F2"); // Light primary background
    expect(cssContent).toContain("#EEF3EC"); // Light secondary background
    expect(cssContent).toContain("#FFFFFF"); // Light card background
    expect(cssContent).toContain("#E5F0E5"); // Light highlight area
    expect(cssContent).toContain("#075C40"); // Dark brand green
    expect(cssContent).toContain("#16845A"); // Light main green
    expect(cssContent).toContain("#63B77A"); // Light soft green
    expect(cssContent).toContain("#C8ED78"); // Lime accent
    expect(cssContent).toContain("#172C23"); // Light primary text
    expect(cssContent).toContain("#65756B"); // Light secondary text
    expect(cssContent).toContain("#DCE5DA"); // Light border

    // Exact Dark Mode tokens required by prompt
    expect(cssContent).toContain("#0B1511"); // Dark primary background
    expect(cssContent).toContain("#101F18"); // Dark secondary background
    expect(cssContent).toContain("#15271E"); // Dark card background
    expect(cssContent).toContain("#1B3025"); // Dark highlight card
    expect(cssContent).toContain("#38A875"); // Dark main green
    expect(cssContent).toContain("#72CF91"); // Dark bright green
    expect(cssContent).toContain("#EDF5ED"); // Dark primary text
    expect(cssContent).toContain("#A5B7A8"); // Dark secondary text
    expect(cssContent).toContain("#2B4033"); // Dark border
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

    it("pauses automatically when navigating to a lab route and resumes when returning if enabled", async () => {
      // User enables audio on homepage
      await manager.play();
      const state1 = manager.getState();
      expect(state1.isEnabled).toBe(true);
      expect(state1.isPlaying).toBe(true);

      // Navigate to lab route: audio MUST pause immediately
      manager.onRouteChanged("/mo-phong/lop-12/song-anh-sang");
      const stateInLab = manager.getState();
      expect(stateInLab.isPlaying).toBe(false);
      expect(stateInLab.isPausedByLab).toBe(true);

      // Navigating deeper into another lab keeps it silent
      manager.onRouteChanged("/mo-phong/lop-12/giao-thoa");
      expect(manager.getState().isPlaying).toBe(false);

      // Returning to homepage resumes audio automatically
      manager.onRouteChanged("/");
      const stateHome = manager.getState();
      expect(stateHome.isPlaying).toBe(true);
      expect(stateHome.isPausedByLab).toBe(false);
    });

    it("does NOT auto-resume when returning from lab if user manually turned off audio", () => {
      // User explicitly turned off audio
      manager.pause();
      expect(manager.getState().isEnabled).toBe(false);

      // Enter lab
      manager.onRouteChanged("/mo-phong");
      expect(manager.getState().isPlaying).toBe(false);

      // Return to homepage: remains off!
      manager.onRouteChanged("/");
      expect(manager.getState().isPlaying).toBe(false);
      expect(manager.getState().isEnabled).toBe(false);
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
