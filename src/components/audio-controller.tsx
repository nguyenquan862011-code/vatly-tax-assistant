import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from "lucide-react";
import { audioManager, type AudioState } from "@/lib/audio-manager";
import { APP_CONFIG } from "@/lib/config";

interface AudioControllerProps {
  className?: string;
  variant?: "header" | "floating";
}

export function AudioController({ className = "", variant = "header" }: AudioControllerProps) {
  const [audioState, setAudioState] = useState<AudioState>(audioManager.getState());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState(state);
    });

    // Close volume dropdown when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowVolumeSlider(false);
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

  const isPlaying = audioState.isPlaying;
  const isInLab = audioState.isInLab;
  const volumePercent = Math.round(audioState.volume * 100);

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      {/* Main compact audio toggle pill */}
      <div
        className={`flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-[#EDF5ED]/90 transition-all duration-200 hover:border-[#38A875]/40 hover:bg-white/10 ${
          isPlaying ? "ring-1 ring-[#38A875]/40 bg-[#16845A]/15" : ""
        } ${isInLab ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <button
          type="button"
          onClick={handleToggle}
          disabled={isInLab}
          className="flex items-center gap-1.5 focus-visible:outline-none"
          title={
            isInLab
              ? "Tự động tắt nhạc nền khi vào phòng thí nghiệm"
              : isPlaying
              ? "Tạm dừng nhạc nền (The Moment)"
              : "Bật nhạc nền (The Moment)"
          }
          aria-label={isPlaying ? "Tạm dừng nhạc nền" : "Bật nhạc nền"}
        >
          {isInLab ? (
            <VolumeX className="size-3.5 text-amber-400" />
          ) : isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 pb-0.5 justify-center" aria-hidden="true">
              <span className="w-0.5 bg-[#C8ED78] animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 bg-[#38A875] animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-2" />
              <span className="w-0.5 bg-[#72CF91] animate-[pulse_1s_ease-in-out_infinite_0.4s] h-3.5" />
            </div>
          ) : (
            <Play className="size-3 text-[#EDF5ED]/70 fill-current" />
          )}

          <span className="hidden sm:inline-block font-mono text-[11px] tracking-tight">
            {isInLab ? (
              <span className="text-amber-300">Lab Mute</span>
            ) : isPlaying ? (
              <span className="text-[#C8ED78]">The Moment</span>
            ) : (
              <span className="text-[#EDF5ED]/70">Nhạc nền</span>
            )}
          </span>
        </button>

        {/* Volume popover toggle button */}
        {!isInLab && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowVolumeSlider(!showVolumeSlider);
            }}
            className="flex size-5 items-center justify-center rounded text-[#EDF5ED]/60 hover:text-white transition-colors"
            title={`Âm lượng: ${volumePercent}%`}
            aria-label="Điều chỉnh âm lượng"
          >
            {audioState.volume === 0 ? (
              <VolumeX className="size-3 text-red-400" />
            ) : (
              <Volume2 className="size-3" />
            )}
          </button>
        )}
      </div>

      {/* Floating/Dropdown Volume Slider */}
      {showVolumeSlider && !isInLab && (
        <div className="absolute right-0 top-full mt-2 z-50 w-44 rounded-xl border border-[#2B4033] bg-[#0B1511] p-3 shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#EDF5ED]/80 mb-2">
            <span className="flex items-center gap-1 text-[#38A875]">
              <Music className="size-3" />
              The Moment
            </span>
            <span className="text-[#C8ED78] font-semibold">{volumePercent}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={audioState.volume}
            onChange={handleVolumeChange}
            className="w-full accent-[#38A875] cursor-pointer h-1.5 bg-[#15271E] rounded-lg"
            aria-label="Thanh trượt âm lượng"
          />

          <div className="mt-2 flex items-center justify-between text-[10px] text-[#A5B7A8]">
            <button
              type="button"
              onClick={() => audioManager.setVolume(0)}
              className="hover:text-white transition-colors"
            >
              Tắt tiếng
            </button>
            <button
              type="button"
              onClick={() => audioManager.setVolume(0.25)}
              className="hover:text-white transition-colors"
            >
              Chuẩn (25%)
            </button>
            <button
              type="button"
              onClick={() => audioManager.setVolume(0.7)}
              className="hover:text-white transition-colors"
            >
              Cao (70%)
            </button>
          </div>
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

  if (!audioState.autoplayBlocked || dismissed || audioState.isPlaying || audioState.isInLab) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border border-[#38A875]/40 bg-[#0B1511]/95 p-3.5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#16845A]/20 text-[#C8ED78] border border-[#38A875]/30">
          <Music className="size-4 animate-bounce" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[#EDF5ED]">Bật nhạc nền thư giãn</p>
          <p className="text-[11px] text-[#A5B7A8] truncate">Giai điệu khoa học nhẹ nhàng (The Moment)</p>
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
