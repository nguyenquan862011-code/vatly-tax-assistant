import React, { useEffect, useState, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
} from "lucide-react";
import { audioManager, type AudioState } from "@/lib/audio-manager";

interface AudioControllerProps {
  className?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function AudioController({ className = "" }: AudioControllerProps) {
  const [audioState, setAudioState] = useState<AudioState>(audioManager.getState());
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"controls" | "playlist">("controls");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState(state);
    });

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPlayerModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    audioManager.setVolume(newVol);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    audioManager.seek(targetTime);
  };

  const isPlaying = audioState.isPlaying;
  const volumePercent = Math.round(audioState.volume * 100);
  const progressPercent = audioState.duration
    ? (audioState.currentTime / audioState.duration) * 100
    : 0;

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      {/* Compact Main Audio Pill */}
      <div
        className={`flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-[#EDF5ED]/90 transition-all duration-200 hover:border-[#38A875]/40 hover:bg-white/10 ${
          isPlaying ? "ring-1 ring-[#38A875]/50 bg-[#16845A]/20" : ""
        }`}
      >
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-1.5 focus-visible:outline-none cursor-pointer"
          title={
            isPlaying
              ? `Tạm dừng: ${audioState.currentTrack.title}`
              : `Phát nhạc: ${audioState.currentTrack.title}`
          }
          aria-label={isPlaying ? "Tạm dừng nhạc nền" : "Bật nhạc nền"}
        >
          {isPlaying ? (
            <div
              className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5 justify-center"
              aria-hidden="true"
            >
              <span className="w-0.5 bg-[#C8ED78] animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 bg-[#38A875] animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-2" />
              <span className="w-0.5 bg-[#72CF91] animate-[pulse_1s_ease-in-out_infinite_0.4s] h-3.5" />
            </div>
          ) : (
            <Play className="size-3 text-[#EDF5ED]/70 fill-current" />
          )}

          <span className="hidden sm:inline-block max-w-[120px] truncate font-mono text-[11px] tracking-tight">
            {isPlaying ? (
              <span className="text-[#C8ED78] font-medium">{audioState.currentTrack.title}</span>
            ) : (
              <span className="text-[#EDF5ED]/70">Nhạc nền</span>
            )}
          </span>
        </button>

        {/* Studio Modal Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowPlayerModal(!showPlayerModal);
          }}
          className="flex size-5 items-center justify-center rounded text-[#EDF5ED]/60 hover:text-white transition-colors"
          title="Mở bảng điều khiển nhạc & danh sách phát"
          aria-label="Mở trình phát nhạc"
        >
          {audioState.isMuted || audioState.volume === 0 ? (
            <VolumeX className="size-3 text-red-400" />
          ) : (
            <Volume2 className="size-3" />
          )}
        </button>
      </div>

      {/* Floating Audio Studio Drawer / Popover */}
      {showPlayerModal && (
        <div className="absolute right-0 top-full mt-2 z-50 w-80 sm:w-88 rounded-2xl border border-[#2B4033] bg-[#0B1511]/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150 text-[#EDF5ED]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1B3025]">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#16845A]/20 text-[#72CF91] border border-[#38A875]/30">
                <Music className="size-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Âm thanh phòng Lab</p>
                <p className="text-[10px] text-[#A5B7A8]">Học tập & tập trung khoa học</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "controls" ? "playlist" : "controls")}
                className={`flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium transition-colors ${
                  activeTab === "playlist"
                    ? "bg-[#38A875] text-white"
                    : "bg-[#15271E] text-[#A5B7A8] hover:text-white"
                }`}
                title="Danh sách bài hát"
              >
                <ListMusic className="size-3.5" />
                <span>Playlist ({audioState.playlist.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPlayerModal(false)}
                className="flex size-7 items-center justify-center rounded-lg text-[#A5B7A8] hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Đóng"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Current Track Banner */}
          <div className="mt-3 rounded-xl bg-[#15271E]/80 border border-[#1B3025] p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-[#16845A]/30 px-1.5 py-0.5 text-[9px] font-mono text-[#C8ED78] border border-[#38A875]/40">
                    {audioState.currentTrack.genre}
                  </span>
                  <span className="text-[10px] text-[#A5B7A8] truncate">
                    {audioState.currentTrack.artist}
                  </span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-white truncate">
                  {audioState.currentTrack.title}
                </h4>
              </div>

              {audioState.currentTrack.isAvailable ? (
                <span className="flex items-center gap-1 text-[10px] font-medium text-[#72CF91] shrink-0">
                  <CheckCircle2 className="size-3" />
                  Sẵn sàng
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-medium text-amber-300 shrink-0">
                  <Clock className="size-3" />
                  Đang cập nhật
                </span>
              )}
            </div>

            {audioState.trackNotice && (
              <p className="mt-2 text-[10px] text-amber-300/90 bg-amber-500/10 rounded px-2 py-1 border border-amber-500/20">
                {audioState.trackNotice}
              </p>
            )}

            {/* Progress Bar & Timestamps */}
            <div className="mt-3">
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max={audioState.duration || 100}
                  step="1"
                  value={audioState.currentTime}
                  onChange={handleProgressChange}
                  className="w-full accent-[#38A875] cursor-pointer h-1.5 bg-[#0B1511] rounded-lg"
                  aria-label="Thanh thời gian"
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-[#A5B7A8]">
                <span>{formatTime(audioState.currentTime)}</span>
                <span>{formatTime(audioState.duration)}</span>
              </div>
            </div>

            {/* Player Controls (Shuffle, Prev, Play/Pause, Next, Repeat) */}
            <div className="mt-2.5 flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => audioManager.toggleShuffle()}
                className={`p-1.5 rounded-lg transition-colors ${
                  audioState.isShuffle
                    ? "text-[#C8ED78] bg-[#38A875]/20"
                    : "text-[#A5B7A8] hover:text-white"
                }`}
                title={audioState.isShuffle ? "Xáo trộn: Bật" : "Xáo trộn: Tắt"}
                aria-label="Chế độ xáo trộn bài"
              >
                <Shuffle className="size-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => audioManager.previous()}
                  className="flex size-7 items-center justify-center rounded-full bg-white/5 text-[#EDF5ED] hover:bg-white/15 transition-colors"
                  title="Bài trước"
                  aria-label="Bài trước"
                >
                  <SkipBack className="size-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleToggle}
                  className="flex size-9 items-center justify-center rounded-full bg-[#16845A] text-white shadow-md hover:bg-[#38A875] transition-all"
                  title={isPlaying ? "Tạm dừng" : "Phát nhạc"}
                  aria-label={isPlaying ? "Tạm dừng" : "Phát nhạc"}
                >
                  {isPlaying ? (
                    <Pause className="size-4 fill-current" />
                  ) : (
                    <Play className="size-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => audioManager.next()}
                  className="flex size-7 items-center justify-center rounded-full bg-white/5 text-[#EDF5ED] hover:bg-white/15 transition-colors"
                  title="Bài tiếp theo"
                  aria-label="Bài tiếp theo"
                >
                  <SkipForward className="size-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => audioManager.cycleRepeatMode()}
                className={`p-1.5 rounded-lg transition-colors ${
                  audioState.repeatMode !== "off"
                    ? "text-[#C8ED78] bg-[#38A875]/20"
                    : "text-[#A5B7A8] hover:text-white"
                }`}
                title={`Chế độ lặp: ${
                  audioState.repeatMode === "all"
                    ? "Lặp danh sách"
                    : audioState.repeatMode === "one"
                      ? "Lặp bài hiện tại"
                      : "Không lặp"
                }`}
                aria-label="Chế độ lặp"
              >
                {audioState.repeatMode === "one" ? (
                  <Repeat1 className="size-3.5" />
                ) : (
                  <Repeat className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Volume Control Row */}
          <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#15271E]/40 border border-[#1B3025] px-3 py-2">
            <button
              type="button"
              onClick={() => audioManager.toggleMute()}
              className="text-[#A5B7A8] hover:text-white transition-colors"
              title={audioState.isMuted ? "Bật tiếng" : "Tắt tiếng"}
              aria-label="Bật hoặc tắt tiếng"
            >
              {audioState.isMuted || audioState.volume === 0 ? (
                <VolumeX className="size-4 text-red-400" />
              ) : (
                <Volume2 className="size-4 text-[#72CF91]" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={audioState.isMuted ? 0 : audioState.volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#38A875] cursor-pointer h-1.5 bg-[#0B1511] rounded-lg"
              aria-label="Âm lượng"
            />

            <span className="font-mono text-[11px] text-[#C8ED78] w-8 text-right font-medium">
              {audioState.isMuted ? "0%" : `${volumePercent}%`}
            </span>
          </div>

          {/* Playlist View Tab */}
          {activeTab === "playlist" && (
            <div className="mt-3 max-h-56 overflow-y-auto space-y-1.5 pr-1 border-t border-[#1B3025] pt-2">
              <p className="text-[10px] font-mono text-[#A5B7A8] uppercase tracking-wider px-1 mb-1">
                Danh sách thể loại ({audioState.playlist.length} bài)
              </p>
              {audioState.playlist.map((track) => {
                const isSelected = track.id === audioState.currentTrack.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => audioManager.selectTrack(track.id)}
                    className={`w-full flex items-center justify-between rounded-lg p-2 text-left transition-all ${
                      isSelected
                        ? "bg-[#16845A]/25 border border-[#38A875]/50 text-white"
                        : "bg-[#15271E]/50 hover:bg-[#15271E] border border-transparent text-[#EDF5ED]/80"
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded bg-[#0B1511] px-1.5 py-0.2 text-[9px] font-mono text-[#C8ED78]">
                          {track.genre}
                        </span>
                        <p className="text-xs font-medium truncate">{track.title}</p>
                      </div>
                      <p className="text-[10px] text-[#A5B7A8] truncate mt-0.5">{track.artist}</p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-[10px]">
                      {isSelected && isPlaying ? (
                        <span className="flex items-center gap-1 text-[#C8ED78] font-semibold font-mono">
                          <span className="size-1.5 rounded-full bg-[#C8ED78] animate-ping" />
                          Đang phát
                        </span>
                      ) : track.isAvailable ? (
                        <span className="text-[#72CF91]">Khả dụng</span>
                      ) : (
                        <span className="text-amber-400/80">Sắp có</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Friendly unblock pill when autoplay is prevented by browser
 */
export function AutoplayPromptBanner() {
  const [audioState, setAudioState] = useState<AudioState>(audioManager.getState());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    return audioManager.subscribe((state) => {
      setAudioState(state);
    });
  }, []);

  if (!audioState.autoplayBlocked || dismissed || audioState.isPlaying) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border border-[#38A875]/40 bg-[#0B1511]/95 p-3.5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#16845A]/20 text-[#C8ED78] border border-[#38A875]/30">
          <Music className="size-4 animate-bounce" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[#EDF5ED]">Bật nhạc nền học tập</p>
          <p className="text-[11px] text-[#A5B7A8] truncate">
            {audioState.currentTrack.title} ({audioState.currentTrack.genre})
          </p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded px-2.5 py-1 text-[11px] text-[#A5B7A8] hover:text-white transition-colors"
        >
          Để sau
        </button>
        <button
          type="button"
          onClick={() => {
            audioManager.play();
            setDismissed(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#16845A] px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-[#38A875] transition-colors"
        >
          <Play className="size-3 fill-current" />
          Bật nhạc ngay
        </button>
      </div>
    </div>
  );
}
