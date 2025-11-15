import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Share2,
  Bookmark,
  Plus,
  Menu
} from 'lucide-react';

export default function VideoPlayerOverlay({
  showControls,
  playing,
  onPlayPause,
  progress,
  duration,
  currentTime,
  onSeekChange,
  onPreviousLesson,
  onNextLesson,
  canGoPrevious,
  canGoNext,
  muted,
  volume,
  onToggleMute,
  onVolumeChange,
  formatTime,
  playbackRate,
  onChangePlaybackRate,
  playbackQuality,
  onChangeQuality,
  qualityOptions,
  formatQualityLabel,
  onToggleFullscreen,
  isSidebarOpen,
  onOpenSidebar,
  courseTitle,
  lessonTitle,
  isFullscreen,
}) {
  const showFullControls = showControls && playing;
  const showOverlay = showControls || !playing;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
        showOverlay ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      {/* Center Play/Pause Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <button
          onClick={onPlayPause}
          className="rounded-full border border-white/20 bg-white/15 p-4 text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/25"
        >
          {playing ? <Pause className="w-12 h-12 text-white" /> : <Play className="w-12 h-12 text-white ml-1" />}
        </button>
      </div>

      {showFullControls && (
        <>
          {/* Bottom Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
                <div
                  className="absolute top-0 left-0 h-full bg-white rounded-lg transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={onSeekChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onPlayPause}
                    className="flex-shrink-0 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
                  >
                    {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </button>

                  <button
                    onClick={onPreviousLesson}
                    className="flex-shrink-0 rounded-full bg-white/5 p-2 text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!canGoPrevious}
                    title="Previous Lesson"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>

                  <button
                    onClick={onNextLesson}
                    className="flex-shrink-0 rounded-full bg-white/5 p-2 text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!canGoNext}
                    title="Next Lesson"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>

                  <div className="ml-1 flex items-center gap-2">
                    <button
                      onClick={onToggleMute}
                      className="flex-shrink-0 rounded-full bg-white/5 p-2 text-white transition hover:bg-white/15"
                      title="Volume"
                    >
                      {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <div className="relative h-1 w-20 overflow-hidden rounded-full bg-white/20 backdrop-blur">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full bg-white transition-all duration-200"
                        style={{ width: `${muted ? 0 : volume * 100}%` }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={muted ? 0 : volume}
                        onChange={onVolumeChange}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        title="Volume"
                      />
                    </div>
                  </div>

                  <span className="ml-2 flex-shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-white backdrop-blur">
                    {formatTime(currentTime)} / {formatTime(duration || 0)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={playbackRate}
                    onChange={(event) => onChangePlaybackRate(parseFloat(event.target.value))}
                    className="flex-shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur transition hover:bg-white/20"
                    title="Playback speed"
                  >
                    <option value={0.5}>0.5×</option>
                    <option value={0.75}>0.75×</option>
                    <option value={1}>1×</option>
                    <option value={1.25}>1.25×</option>
                    <option value={1.5}>1.5×</option>
                    <option value={2}>2×</option>
                  </select>

                  <select
                    value={playbackQuality}
                    onChange={(event) => onChangeQuality(event.target.value)}
                    className="flex-shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur transition hover:bg-white/20"
                    title="Video Quality"
                  >
                    <option value="auto">Auto</option>
                    {qualityOptions.map((quality) => (
                      <option key={quality} value={quality}>
                        {formatQualityLabel(quality)}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={onToggleFullscreen}
                    className="flex-shrink-0 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
                    title="Toggle Fullscreen"
                  >
                    <Maximize className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 right-0 top-0 px-4 py-3 pointer-events-auto">
            <div className="rounded-2xl border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-2xl shadow-[0_15px_45px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  {!isSidebarOpen && (
                    <button
                      onClick={onOpenSidebar}
                      className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white transition hover:bg-white/20"
                      aria-label="Show contents"
                    >
                      <Menu className="h-4 w-4" />
                      <span className="hidden sm:inline">Contents</span>
                    </button>
                  )}
                  <div className="flex min-w-0 flex-col text-white">
                    <h1 className="truncate text-[15px] font-semibold leading-tight">{courseTitle}</h1>
                    <p className="truncate text-xs text-white/70">{lessonTitle}</p>
                  </div>
                </div>

                <div className="hidden flex-shrink-0 items-center gap-3 text-sm text-white/80 md:flex">
                  <div className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>166</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bookmark className="h-4 w-4" />
                    <span>731</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
