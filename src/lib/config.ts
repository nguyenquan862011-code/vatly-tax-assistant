export type AudioLicenseType = "cc-by-3.0" | "public-domain" | "unverified";

export interface AudioTrackConfig {
  id: string;
  title: string;
  artist: string;
  composer?: string;
  genre:
    | "Chill"
    | "Ambient"
    | "Lo-fi Study"
    | "Soft Piano"
    | "Deep Focus"
    | "Space Ambient"
    | "Calm Electronic"
    | "Classical Focus";
  src: string;
  isAvailable: boolean;
  license: string;
  licenseUrl?: string;
  licenseType: AudioLicenseType;
  sourceName: string;
  sourceUrl?: string;
  attribution?: string;
  note?: string;
}

export const APP_CONFIG = {
  siteName: "TamGiangPhysics",
  siteTitle: "TamGiangPhysics — Nền tảng học tập & Khảo sát Vật lý tương tác",
  slogan: "Biến kiến thức Vật lý thành trải nghiệm khám phá và thực nghiệm.",
  developerName: "Trần Đình Nguyên Quân",
  developerTitle: "Người phát triển TamGiangPhysics",
  contactEmail: "nguyenquan862011@gmail.com",
  copyrightYear: 2026,
  googleDriveFolderUrl:
    "https://drive.google.com/drive/folders/1-80QRozdGMChyMQTfzu7IJoj5jSosztG?usp=sharing",
  googleDriveEmbedUrl:
    "https://drive.google.com/embeddedfolderview?id=1-80QRozdGMChyMQTfzu7IJoj5jSosztG#grid",
  totalLessons: 777,
  backgroundAudio: {
    src: "/audio/gymnopedie-no-1.mp3",
    trackName: "Gymnopédie No. 1",
    defaultVolume: 0.25,
    storageKeyEnabled: "tamgiang_audio_enabled",
    storageKeyVolume: "tamgiang_audio_volume",
    storageKeyTheme: "tamgiang_theme",
    storageKeyTrack: "tamgiang_audio_track_id",
    storageKeyRepeat: "tamgiang_audio_repeat",
    storageKeyShuffle: "tamgiang_audio_shuffle",
    playlist: [
      {
        id: "track-satie-gymnopedie-1",
        title: "Gymnopédie No. 1",
        composer: "Erik Satie (1866–1925)",
        artist: "Kevin MacLeod (Biên soạn & Trình diễn)",
        genre: "Classical Focus",
        src: "/audio/gymnopedie-no-1.mp3",
        isAvailable: true,
        license: "Creative Commons Attribution 3.0 (CC BY 3.0)",
        licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
        licenseType: "cc-by-3.0",
        sourceName: "Incompetech / Wikimedia Commons",
        sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100787",
        attribution:
          "Gymnopedie No. 1 by Kevin MacLeod (incompetech.com). Licensed under Creative Commons: By Attribution 3.0",
        note: "Tác phẩm thanh bình, tối giản, lý tưởng để duy trì trạng thái tập trung sâu khi đọc tài liệu và làm thí nghiệm.",
      },
      {
        id: "track-chopin-nocturne-op9no2",
        title: "Nocturne in E-flat major, Op. 9 No. 2",
        composer: "Frédéric Chopin (1810–1849)",
        artist: "Musopen Open Orchestra / Pianist",
        genre: "Soft Piano",
        src: "/audio/chopin-nocturne-op9-no2.mp3",
        isAvailable: true,
        license: "Public Domain / CC0 (Phạm vi công cộng)",
        licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
        licenseType: "public-domain",
        sourceName: "Musopen / Wikimedia Commons",
        sourceUrl:
          "https://commons.wikimedia.org/wiki/File:Nocturne_in_E_flat_major,_Op._9_no._2.mp3",
        attribution:
          "Nocturne Op. 9 No. 2, Composed by Frédéric Chopin, Recorded for Musopen (Public Domain Mark 1.0)",
        note: "Dạ khúc dương cầm cổ điển êm dịu, giúp cân bằng cảm xúc và giảm căng thẳng khi giải toán Vật lý.",
      },
      {
        id: "track-bach-cello-suite-1",
        title: "Cello Suite No. 1 in G - Prelude (BWV 1007)",
        composer: "Johann Sebastian Bach (1685–1750)",
        artist: "Kevin MacLeod (Biên soạn âm hưởng Cello)",
        genre: "Deep Focus",
        src: "/audio/bach-cello-suite-1-prelude.mp3",
        isAvailable: true,
        license: "Creative Commons Attribution 3.0 (CC BY 3.0)",
        licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
        licenseType: "cc-by-3.0",
        sourceName: "Incompetech / Wikimedia Commons",
        sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100298",
        attribution:
          "Cello Suite -1 in G - Prelude by Kevin MacLeod (incompetech.com). Licensed under Creative Commons: By Attribution 3.0",
        note: "Âm sắc Cello trầm ấm, nhịp điệu đều đặn kích thích tư duy logic và lập luận khoa học.",
      },
      {
        id: "track-chill-moment",
        title: "The Moment",
        artist: "Kenny G",
        genre: "Chill",
        src: "",
        isAvailable: false,
        license: "Chưa xác minh bản quyền (Bản quyền thương mại)",
        licenseType: "unverified",
        sourceName: "Chưa có giấy phép mở",
        note: "Chưa có tệp âm thanh: Tác phẩm thuộc bản quyền thương mại của nghệ sĩ/nhãn đĩa, không có giấy phép tự do phù hợp để tích hợp.",
      },
      {
        id: "track-ambient-cosmic",
        title: "Space Ambient - Cosmic Focus",
        artist: "TamGiang Acoustic Lab",
        genre: "Space Ambient",
        src: "",
        isAvailable: false,
        license: "Chưa xác minh bản quyền",
        licenseType: "unverified",
        sourceName: "Đang thẩm định bản quyền",
        note: "Chưa có tệp âm thanh: Đang hoàn thiện thẩm định nguồn âm thanh không gian chuẩn bản quyền mở.",
      },
      {
        id: "track-lofi-study",
        title: "Lo-fi Study Beats - Deep Work",
        artist: "TamGiang Lofi",
        genre: "Lo-fi Study",
        src: "",
        isAvailable: false,
        license: "Chưa xác minh bản quyền",
        licenseType: "unverified",
        sourceName: "Đang thẩm định bản quyền",
        note: "Chưa có tệp âm thanh: Đang chờ hoàn thiện tệp âm thanh Lo-fi chuẩn Creative Commons.",
      },
      {
        id: "track-deep-focus",
        title: "Deep Focus - Alpha Waves",
        artist: "NeuroSound Lab",
        genre: "Deep Focus",
        src: "",
        isAvailable: false,
        license: "Chưa xác minh bản quyền",
        licenseType: "unverified",
        sourceName: "Đang thẩm định bản quyền",
        note: "Chưa có tệp âm thanh: Sóng não Alpha 10Hz đang trong quá trình tạo mẫu âm thanh mở.",
      },
      {
        id: "track-ambient-zen",
        title: "Ambient Nature - Zen Flow",
        artist: "Zenith Sound",
        genre: "Ambient",
        src: "",
        isAvailable: false,
        license: "Chưa xác minh bản quyền",
        licenseType: "unverified",
        sourceName: "Đang thẩm định bản quyền",
        note: "Chưa có tệp âm thanh: Đang thẩm định các bản thu thiên nhiên chuẩn giấy phép tự do CC0.",
      },
      {
        id: "track-calm-electronic",
        title: "Calm Electronic - Science Lab",
        artist: "Quantum Pulse",
        genre: "Calm Electronic",
        src: "",
        isAvailable: false,
        license: "Chưa xác minh bản quyền",
        licenseType: "unverified",
        sourceName: "Đang thẩm định bản quyền",
        note: "Chưa có tệp âm thanh: Đang kiểm duyệt giấy phép nguồn âm thanh điện tử nhẹ.",
      },
    ] as AudioTrackConfig[],
  },
};
