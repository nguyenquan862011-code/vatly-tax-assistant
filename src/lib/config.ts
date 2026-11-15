export interface AudioTrackConfig {
  id: string;
  title: string;
  artist: string;
  genre:
    | "Chill"
    | "Ambient"
    | "Lo-fi Study"
    | "Soft Piano"
    | "Deep Focus"
    | "Space Ambient"
    | "Calm Electronic";
  src: string;
  isAvailable: boolean;
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
    src: "/audio/background-music.mp3",
    trackName: "The Moment",
    defaultVolume: 0.25,
    storageKeyEnabled: "tamgiang_audio_enabled",
    storageKeyVolume: "tamgiang_audio_volume",
    storageKeyTheme: "tamgiang_theme",
    storageKeyTrack: "tamgiang_audio_track_id",
    storageKeyRepeat: "tamgiang_audio_repeat",
    storageKeyShuffle: "tamgiang_audio_shuffle",
    playlist: [
      {
        id: "track-chill-moment",
        title: "The Moment",
        artist: "Kenny G",
        genre: "Chill",
        src: "/audio/background-music.mp3",
        isAvailable: true,
        note: "Giai điệu saxophone truyền cảm hứng học tập và tập trung cao",
      },
      {
        id: "track-ambient-cosmic",
        title: "Space Ambient - Cosmic Focus",
        artist: "TamGiang Acoustic Lab",
        genre: "Space Ambient",
        src: "/audio/space-ambient.mp3",
        isAvailable: false,
        note: "Đang cập nhật nguồn âm thanh chuẩn lossless có bản quyền",
      },
      {
        id: "track-lofi-study",
        title: "Lo-fi Study Beats - Deep Work",
        artist: "TamGiang Lofi",
        genre: "Lo-fi Study",
        src: "/audio/lofi-study.mp3",
        isAvailable: false,
        note: "Đang biên tập tệp âm thanh Lo-fi chuẩn chất lượng",
      },
      {
        id: "track-soft-piano",
        title: "Soft Piano - Peaceful Mind",
        artist: "Acoustic Harmony",
        genre: "Soft Piano",
        src: "/audio/soft-piano.mp3",
        isAvailable: false,
        note: "Giai điệu piano nhẹ nhàng thư giãn trí não",
      },
      {
        id: "track-deep-focus",
        title: "Deep Focus - Alpha Waves",
        artist: "NeuroSound Lab",
        genre: "Deep Focus",
        src: "/audio/deep-focus.mp3",
        isAvailable: false,
        note: "Sóng não Alpha 10Hz hỗ trợ tư duy giải toán Vật lý",
      },
      {
        id: "track-ambient-zen",
        title: "Ambient Nature - Zen Flow",
        artist: "Zenith Sound",
        genre: "Ambient",
        src: "/audio/ambient-nature.mp3",
        isAvailable: false,
        note: "Không gian âm hưởng thiên nhiên êm dịu",
      },
      {
        id: "track-calm-electronic",
        title: "Calm Electronic - Science Lab",
        artist: "Quantum Pulse",
        genre: "Calm Electronic",
        src: "/audio/calm-electronic.mp3",
        isAvailable: false,
        note: "Nhịp điện tử êm ái kích thích sáng tạo khoa học",
      },
    ] as AudioTrackConfig[],
  },
};
