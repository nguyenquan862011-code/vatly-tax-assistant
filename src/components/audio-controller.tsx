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
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  X,
  Sliders,
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
  const [activeTab, setActiveTab] = useState<"controls" | "playlist" | "licenses">("controls");
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

  const availableTracks = audioState.playlist.filter((t) => t.isAvailable && t.src);
  const unverifiedTracks = audioState.playlist.filter((t) => !t.isAvailable);

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

          <span className="hidden sm:inline-block max-w-[130px] truncate font-mono text-[11px] tracking-tight">
            {isPlaying ? (
              <span className="text-[#C8ED78] font-medium">{audioState.currentTrack.title}</span>
            ) : (
              <span className="text-[#EDF5ED]/70">Nhạc nền Lab</span>
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
        <div className="absolute right-0 top-full mt-2 z-50 w-84 sm:w-96 rounded-2xl border border-[#2B4033] bg-[#0B1511]/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150 text-[#EDF5ED]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1B3025]">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#16845A]/20 text-[#72CF91] border border-[#38A875]/30">
                <Music className="size-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Âm thanh phòng Lab</p>
                <p className="text-[10px] text-[#A5B7A8]">Chỉ sử dụng tệp có giấy phép mở hợp lệ</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
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

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 mt-2.5 bg-[#08110D] p-1 rounded-lg border border-[#1B3025] text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab("controls")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-md font-medium transition-colors ${
                activeTab === "controls"
                  ? "bg-[#16845A] text-white shadow-sm"
                  : "text-[#A5B7A8] hover:text-white"
              }`}
            >
              <Sliders className="size-3" />
              <span>Phát nhạc</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("playlist")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-md font-medium transition-colors ${
                activeTab === "playlist"
                  ? "bg-[#16845A] text-white shadow-sm"
                  : "text-[#A5B7A8] hover:text-white"
              }`}
            >
              <ListMusic className="size-3" />
              <span>
                Playlist ({availableTracks.length}/{audioState.playlist.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("licenses")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-md font-medium transition-colors ${
                activeTab === "licenses"
                  ? "bg-[#16845A] text-white shadow-sm"
                  : "text-[#A5B7A8] hover:text-white"
              }`}
            >
              <ShieldCheck className="size-3" />
              <span>Bản quyền</span>
            </button>
          </div>

          {/* TAB 1: CONTROLS */}
          {activeTab === "controls" && (
            <div className="mt-3">
              {/* Current Track Banner */}
              <div className="rounded-xl bg-[#15271E]/80 border border-[#1B3025] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded bg-[#16845A]/30 px-1.5 py-0.5 text-[9px] font-mono text-[#C8ED78] border border-[#38A875]/40">
                        {audioState.currentTrack.genre}
                      </span>
                      <span className="rounded bg-[#0B1511] px-1.5 py-0.5 text-[9px] font-mono text-[#72CF91] border border-[#2B4033]">
                        {audioState.currentTrack.license}
                      </span>
                    </div>

                    <h4 className="mt-1.5 text-sm font-semibold text-white truncate">
                      {audioState.currentTrack.title}
                    </h4>

                    <p className="text-[11px] text-[#A5B7A8] truncate mt-0.5">
                      {audioState.currentTrack.composer
                        ? `${audioState.currentTrack.composer} • `
                        : ""}
                      {audioState.currentTrack.artist}
                    </p>
                  </div>

                  {audioState.currentTrack.isAvailable && audioState.currentTrack.src ? (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-[#72CF91] shrink-0 bg-[#075C40]/30 px-1.5 py-0.5 rounded border border-[#38A875]/30">
                      <CheckCircle2 className="size-3" />
                      Có tệp hợp lệ
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-amber-300 shrink-0 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                      <AlertCircle className="size-3" />
                      Chưa có tệp
                    </span>
                  )}
                </div>

                {/* Source & Attribution Link */}
                <div className="mt-2 pt-2 border-t border-[#1B3025]/60 flex items-center justify-between text-[10px] text-[#A5B7A8]">
                  <span>Nguồn: {audioState.currentTrack.sourceName}</span>
                  {audioState.currentTrack.sourceUrl && (
                    <a
                      href={audioState.currentTrack.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#72CF91] hover:text-[#C8ED78] hover:underline"
                    >
                      <span>Xem nguồn</span>
                      <ExternalLink className="size-2.5" />
                    </a>
                  )}
                </div>

                {/* Attribution Text if required */}
                {audioState.currentTrack.attribution && (
                  <p className="mt-1.5 text-[9px] font-mono text-[#A5B7A8]/90 bg-[#0B1511]/80 rounded p-1.5 border border-[#1B3025] leading-relaxed">
                    {audioState.currentTrack.attribution}
                  </p>
                )}

                {/* Track Notice (if unverified or fallback) */}
                {audioState.trackNotice && (
                  <p className="mt-2 text-[10px] text-amber-300/90 bg-amber-500/10 rounded px-2 py-1.5 border border-amber-500/20 leading-snug">
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
                <div className="mt-2 flex items-center justify-between pt-1">
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
                      className="flex size-9 items-center justify-center rounded-full bg-[#16845A] text-white shadow-md hover:bg-[#38A875] transition-all cursor-pointer"
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
            </div>
          )}

          {/* TAB 2: PLAYLIST VIEW */}
          {activeTab === "playlist" && (
            <div className="mt-3 max-h-72 overflow-y-auto space-y-3 pr-1">
              {/* Group 1: Verified Available Tracks */}
              <div>
                <div className="flex items-center justify-between px-1 mb-1.5">
                  <span className="text-[10px] font-mono text-[#72CF91] uppercase tracking-wider font-semibold flex items-center gap-1">
                    <CheckCircle2 className="size-3 text-[#72CF91]" />
                    Đã tích hợp tệp mở ({availableTracks.length})
                  </span>
                  <span className="text-[9px] text-[#A5B7A8]">Có tệp MP3 & Giấy phép</span>
                </div>

                <div className="space-y-1.5">
                  {availableTracks.map((track) => {
                    const isSelected = track.id === audioState.currentTrack.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => audioManager.selectTrack(track.id)}
                        className={`w-full flex items-center justify-between rounded-lg p-2 text-left transition-all ${
                          isSelected
                            ? "bg-[#16845A]/25 border border-[#38A875]/50 text-white"
                            : "bg-[#15271E]/60 hover:bg-[#15271E] border border-transparent text-[#EDF5ED]/90"
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="rounded bg-[#0B1511] px-1.5 py-0.2 text-[9px] font-mono text-[#C8ED78]">
                              {track.genre}
                            </span>
                            <span className="rounded bg-[#075C40]/40 px-1 py-0.2 text-[8px] font-mono text-[#72CF91] border border-[#38A875]/30">
                              {track.licenseType === "public-domain"
                                ? "Public Domain"
                                : "CC BY 3.0"}
                            </span>
                            <p className="text-xs font-medium truncate">{track.title}</p>
                          </div>
                          <p className="text-[10px] text-[#A5B7A8] truncate mt-0.5">
                            {track.artist}
                          </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-1 text-[10px]">
                          {isSelected && isPlaying ? (
                            <span className="flex items-center gap-1 text-[#C8ED78] font-semibold font-mono">
                              <span className="size-1.5 rounded-full bg-[#C8ED78] animate-ping" />
                              Đang phát
                            </span>
                          ) : (
                            <span className="text-[#72CF91] font-medium">Phát bài</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: Unverified / Pending License Tracks */}
              <div>
                <div className="flex items-center justify-between px-1 mb-1.5 pt-1 border-t border-[#1B3025]">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <AlertCircle className="size-3 text-amber-400" />
                    Chưa có tệp ({unverifiedTracks.length})
                  </span>
                  <span className="text-[9px] text-[#A5B7A8]">Chờ thẩm định giấy phép mở</span>
                </div>

                <div className="space-y-1.5">
                  {unverifiedTracks.map((track) => {
                    const isSelected = track.id === audioState.currentTrack.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => audioManager.selectTrack(track.id)}
                        className={`w-full flex items-center justify-between rounded-lg p-2 text-left transition-all ${
                          isSelected
                            ? "bg-amber-950/20 border border-amber-600/40 text-amber-100"
                            : "bg-[#15271E]/30 hover:bg-[#15271E]/50 border border-transparent text-[#A5B7A8]"
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="rounded bg-[#0B1511] px-1.5 py-0.2 text-[9px] font-mono text-[#A5B7A8]">
                              {track.genre}
                            </span>
                            <p className="text-xs font-medium truncate text-[#EDF5ED]/80">
                              {track.title}
                            </p>
                          </div>
                          <p className="text-[10px] text-[#A5B7A8]/70 truncate mt-0.5">
                            {track.artist} • {track.note || "Chưa có tệp bản quyền"}
                          </p>
                        </div>

                        <div className="shrink-0 flex items-center text-[10px]">
                          <span className="text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            Chưa có tệp
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LICENSES & ATTRIBUTION */}
          {activeTab === "licenses" && (
            <div className="mt-3 max-h-72 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {/* Compliance Policy Banner */}
              <div className="rounded-xl bg-[#075C40]/20 border border-[#38A875]/30 p-2.5">
                <div className="flex items-center gap-1.5 text-[#72CF91] font-semibold text-[11px]">
                  <ShieldCheck className="size-3.5" />
                  <span>Chính sách Bản quyền Âm thanh TamGiangPhysics</span>
                </div>
                <p className="mt-1 text-[10px] text-[#EDF5ED]/80 leading-relaxed">
                  TamGiangPhysics tuân thủ nghiêm ngặt luật sở hữu trí tuệ: chỉ tích hợp các tệp âm
                  thanh có giấy phép tự do phù hợp (Creative Commons CC BY, CC0, Public Domain) hoặc
                  do nền tảng tự khởi tạo. Các tác phẩm chưa xác minh hoặc thuộc bản quyền thương
                  mại độc quyền được bảo toàn trạng thái{" "}
                  <strong className="text-amber-300">Chưa có tệp</strong> và không tải tệp trái
                  phép.
                </p>
              </div>

              {/* Verified Tracks Attribution Details */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#A5B7A8] px-1 font-semibold">
                  Danh mục tệp âm thanh đã xác minh ({availableTracks.length} bài)
                </p>

                {availableTracks.map((track) => (
                  <div
                    key={track.id}
                    className="rounded-lg bg-[#15271E]/60 border border-[#1B3025] p-2.5 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div>
                        <h5 className="font-semibold text-white text-[11px]">{track.title}</h5>
                        <p className="text-[10px] text-[#A5B7A8]">
                          {track.composer ? `Sáng tác: ${track.composer} | ` : ""}
                          {track.artist}
                        </p>
                      </div>
                      <span className="rounded bg-[#16845A]/30 text-[#C8ED78] px-1.5 py-0.5 text-[9px] font-mono border border-[#38A875]/30 shrink-0">
                        {track.licenseType === "public-domain" ? "Public Domain" : "CC BY 3.0"}
                      </span>
                    </div>

                    <div className="text-[10px] text-[#EDF5ED]/90 space-y-0.5">
                      <p>
                        <strong className="text-[#A5B7A8]">Giấy phép:</strong>{" "}
                        {track.licenseUrl ? (
                          <a
                            href={track.licenseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#72CF91] underline hover:text-[#C8ED78]"
                          >
                            {track.license}
                          </a>
                        ) : (
                          track.license
                        )}
                      </p>
                      <p>
                        <strong className="text-[#A5B7A8]">Nguồn dữ liệu:</strong>{" "}
                        {track.sourceUrl ? (
                          <a
                            href={track.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#72CF91] underline hover:text-[#C8ED78] inline-flex items-center gap-0.5"
                          >
                            <span>{track.sourceName}</span>
                            <ExternalLink className="size-2.5" />
                          </a>
                        ) : (
                          track.sourceName
                        )}
                      </p>
                      {track.attribution && (
                        <p className="text-[9px] font-mono text-[#A5B7A8] bg-[#0B1511] p-1.5 rounded border border-[#1B3025]">
                          {track.attribution}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Unverified explanation note */}
              <div className="rounded-lg bg-[#15271E]/30 border border-[#1B3025] p-2 text-[10px] text-[#A5B7A8] leading-relaxed">
                <span className="font-semibold text-amber-300">Lưu ý về các bài chưa có tệp:</span>{" "}
                Các thể loại còn lại (Space Ambient, Lo-fi, Zen Nature, Calm Electronic, Kenny G)
                đang trong giai đoạn tuyển chọn bản ghi âm CC0/CC-BY và hoàn tất thỏa thuận bản
                quyền. Nền tảng sẽ cập nhật tệp ngay khi thẩm định tính pháp lý thành công.
              </div>
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
