import { describe, expect, it, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { APP_CONFIG } from "@/lib/config";
import { BackgroundAudioManager } from "@/lib/audio-manager";

describe("TamGiangPhysics Design System & Audio System", () => {
  it("verifies exact Light Mode and Dark Mode color tokens in styles.css", () => {
    const cssPath = path.resolve(__dirname, "../styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8").toLowerCase();

    // Exact Light Mode tokens required by design spec
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

    // Exact Dark Mode tokens required by design spec
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

  it("verifies verified open-license audio files exist in public/audio directory", () => {
    const audioDir = path.resolve(__dirname, "../../public/audio");
    expect(fs.existsSync(audioDir)).toBe(true);

    // Verify all available tracks have actual files on disk
    const availableTracks = APP_CONFIG.backgroundAudio.playlist.filter((t) => t.isAvailable);
    expect(availableTracks.length).toBeGreaterThanOrEqual(3);

    for (const track of availableTracks) {
      expect(track.src).toBeTruthy();
      const filePath = path.resolve(audioDir, path.basename(track.src));
      expect(fs.existsSync(filePath), `File for ${track.title} should exist`).toBe(true);
      const stats = fs.statSync(filePath);
      expect(stats.size).toBeGreaterThan(1024 * 1024); // > 1MB valid audio file
    }

    // Default background audio file is present
    const defaultFile = path.resolve(audioDir, "background-music.mp3");
    expect(fs.existsSync(defaultFile)).toBe(true);
  });

  it("verifies transparent copyright and license compliance for all tracks", () => {
    const playlist = APP_CONFIG.backgroundAudio.playlist;
    expect(playlist.length).toBeGreaterThanOrEqual(7);

    // Available tracks MUST have valid open licenses and attribution
    const availableTracks = playlist.filter((t) => t.isAvailable);
    for (const track of availableTracks) {
      expect(["cc-by-3.0", "public-domain"]).toContain(track.licenseType);
      expect(track.license).toBeTruthy();
      expect(track.licenseUrl).toBeTruthy();
      expect(track.sourceName).toBeTruthy();
      expect(track.sourceUrl).toBeTruthy();
      expect(track.attribution).toBeTruthy();
      expect(track.src).toBeTruthy();
    }

    // Unverified tracks MUST be marked as unavailable (isAvailable: false) without fake files
    const unverifiedTracks = playlist.filter((t) => !t.isAvailable);
    expect(unverifiedTracks.length).toBeGreaterThanOrEqual(4);
    for (const track of unverifiedTracks) {
      expect(track.licenseType).toBe("unverified");
      expect(track.isAvailable).toBe(false);
      expect(track.note).toBeTruthy();
      expect(track.note).toContain("Chưa có tệp");
    }

    // The Moment is kept in unverified status because of commercial copyright
    const theMomentTrack = playlist.find((t) => t.id === "track-chill-moment");
    expect(theMomentTrack).toBeDefined();
    expect(theMomentTrack?.isAvailable).toBe(false);
  });

  it("verifies multi-track playlist covers diverse scientific focus genres", () => {
    const playlist = APP_CONFIG.backgroundAudio.playlist;
    const genres = playlist.map((t) => t.genre);
    expect(genres).toContain("Chill");
    expect(genres).toContain("Ambient");
    expect(genres).toContain("Lo-fi Study");
    expect(genres).toContain("Soft Piano");
    expect(genres).toContain("Deep Focus");
    expect(genres).toContain("Space Ambient");
    expect(genres).toContain("Calm Electronic");
  });

  describe("BackgroundAudioManager Route, Playlist and License Logic", () => {
    let manager: BackgroundAudioManager;

    beforeEach(() => {
      localStorage.clear();
      manager = new BackgroundAudioManager();
    });

    it("correctly identifies lab routes vs standard pages", () => {
      expect(manager.isLabRoute("/mo-phong")).toBe(true);
      expect(manager.isLabRoute("/mo-phong/")).toBe(true);
      expect(manager.isLabRoute("/mo-phong/lop-10/chuyen-dong")).toBe(true);
      expect(manager.isLabRoute("/bai-hoc/con-lac-don")).toBe(true);

      expect(manager.isLabRoute("/")).toBe(false);
      expect(manager.isLabRoute("/tai-lieu")).toBe(false);
      expect(manager.isLabRoute("/gioi-thieu")).toBe(false);
    });

    it("allows music to keep playing seamlessly when navigating into and out of laboratory", async () => {
      await manager.play();
      const state1 = manager.getState();
      expect(state1.isEnabled).toBe(true);
      expect(state1.isPlaying).toBe(true);

      manager.onRouteChanged("/mo-phong/lop-12/song-anh-sang");
      const stateInLab = manager.getState();
      expect(stateInLab.isInLab).toBe(true);
      expect(stateInLab.isPlaying).toBe(true);

      manager.next();
      expect(manager.getState().currentTrack).toBeDefined();

      manager.onRouteChanged("/");
      expect(manager.getState().isInLab).toBe(false);
      expect(manager.getState().isPlaying).toBe(true);
    });

    it("handles unverified tracks safely without crashing or playing non-existent files", () => {
      // Select an unverified track
      manager.selectTrack("track-chill-moment");
      const state = manager.getState();
      expect(state.currentTrack.id).toBe("track-chill-moment");
      expect(state.currentTrack.isAvailable).toBe(false);
      expect(state.trackNotice).toBeTruthy();
      expect(state.trackNotice).toContain("chưa có tệp");
    });

    it("correctly partitions available vs unverified tracks", () => {
      const available = manager.getAvailableTracks();
      const unverified = manager.getUnverifiedTracks();

      expect(available.length).toBeGreaterThanOrEqual(3);
      expect(unverified.length).toBeGreaterThanOrEqual(4);
      expect(available.every((t) => t.isAvailable)).toBe(true);
      expect(unverified.every((t) => !t.isAvailable)).toBe(true);
    });

    it("filters tracks accurately by status (available vs unavailable)", () => {
      const allTracks = manager.filterTracks({ status: "all" });
      const availableOnly = manager.filterTracks({ status: "available" });
      const unavailableOnly = manager.filterTracks({ status: "unavailable" });

      expect(allTracks.length).toBe(APP_CONFIG.backgroundAudio.playlist.length);
      expect(availableOnly.length).toBeGreaterThanOrEqual(3);
      expect(availableOnly.every((t) => t.isAvailable && Boolean(t.src))).toBe(true);

      expect(unavailableOnly.length).toBeGreaterThanOrEqual(4);
      expect(unavailableOnly.every((t) => !t.isAvailable)).toBe(true);
      expect(availableOnly.length + unavailableOnly.length).toBe(allTracks.length);
    });

    it("filters tracks accurately by license type and license helper methods", () => {
      const ccByTracks = manager.getTracksByLicense("cc-by-3.0");
      const pdTracks = manager.getTracksByLicense("public-domain");
      const unverifiedTracks = manager.getTracksByLicense("unverified");

      expect(ccByTracks.length).toBe(2);
      expect(ccByTracks.map((t) => t.title)).toContain("Gymnopédie No. 1");
      expect(ccByTracks.map((t) => t.title)).toContain(
        "Cello Suite No. 1 in G - Prelude (BWV 1007)",
      );

      expect(pdTracks.length).toBe(1);
      expect(pdTracks[0].title).toContain("Nocturne in E-flat major");

      expect(unverifiedTracks.length).toBeGreaterThanOrEqual(4);
      expect(unverifiedTracks.every((t) => t.licenseType === "unverified")).toBe(true);
    });

    it("supports keyword search across track title, artist, composer, and genre", () => {
      const satieSearch = manager.filterTracks({ search: "Satie" });
      expect(satieSearch.length).toBe(1);
      expect(satieSearch[0].id).toBe("track-satie-gymnopedie-1");

      const chopinSearch = manager.filterTracks({ search: "Frédéric" });
      expect(chopinSearch.length).toBe(1);
      expect(chopinSearch[0].id).toBe("track-chopin-nocturne-op9no2");

      const bachSearch = manager.filterTracks({ search: "Cello" });
      expect(bachSearch.length).toBe(1);
      expect(bachSearch[0].id).toBe("track-bach-cello-suite-1");

      const focusSearch = manager.filterTracks({ search: "Deep Focus" });
      expect(focusSearch.length).toBeGreaterThanOrEqual(1);

      const nonExistentSearch = manager.filterTracks({ search: "NonExistentQueryXYZ123" });
      expect(nonExistentSearch.length).toBe(0);
    });

    it("combines status, license, and search filters correctly", () => {
      // Available + CC BY 3.0 + search 'Bach'
      const combined = manager.filterTracks({
        status: "available",
        license: "cc-by-3.0",
        search: "Bach",
      });
      expect(combined.length).toBe(1);
      expect(combined[0].id).toBe("track-bach-cello-suite-1");

      // Unavailable + CC BY 3.0 should be empty because CC BY tracks are available
      const emptyCombined = manager.filterTracks({
        status: "unavailable",
        license: "cc-by-3.0",
      });
      expect(emptyCombined.length).toBe(0);
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
