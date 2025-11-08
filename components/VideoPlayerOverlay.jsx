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
      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 transition-opacity duration-300 pointer-events-none ${
        showOverlay ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Center Play/Pause Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <button
          onClick={onPlayPause}
          className="bg-black/50 hover:bg-black/70 rounded-full p-4 transition-all duration-200 backdrop-blur-sm"
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
              <div className="relative w-full h-1 bg-white/20 rounded-lg backdrop-blur-sm">
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

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={onPlayPause}
                  className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10 flex-shrink-0"
                >
                  {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <button
                  onClick={onPreviousLesson}
                  className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  disabled={!canGoPrevious}
                  title="Previous Lesson"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={onNextLesson}
                  className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  disabled={!canGoNext}
                  title="Next Lesson"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <div className="ml-1 flex items-center gap-2">
                  <button
                    onClick={onToggleMute}
                    className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10 flex-shrink-0"
                    title="Volume"
                  >
                    {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <div className="relative h-1 w-16 rounded-lg bg-white/20 backdrop-blur-sm">
                    <div
                      className="absolute top-0 left-0 h-full rounded-lg bg-white transition-all duration-200"
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

                <span className="ml-2 flex-shrink-0 rounded bg-black/30 px-2 py-1 font-mono text-xs text-white backdrop-blur-sm">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={playbackRate}
                  onChange={(event) => onChangePlaybackRate(parseFloat(event.target.value))}
                  className="bg-black/50 text-white text-xs rounded px-2 py-1 border border-white/20 backdrop-blur-sm hover:bg-black/70 transition-colors flex-shrink-0"
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
                  className="bg-black/50 text-white text-xs rounded px-2 py-1 border border-white/20 backdrop-blur-sm hover:bg-black/70 transition-colors flex-shrink-0"
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
                  className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10 flex-shrink-0"
                  title="Toggle Fullscreen"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute left-0 right-0 top-0 px-4 py-3 pointer-events-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-3">
                {!isSidebarOpen && (
                  <button
                    onClick={onOpenSidebar}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full transition-colors flex-shrink-0"
                    aria-label="Show contents"
                  >
                    <Menu className="h-4 w-4" />
                    <span className="hidden sm:inline">Contents</span>
                  </button>
                )}
                <div className="flex min-w-0 flex-col">
                  <h1 className="truncate text-[15px] font-semibold leading-tight text-white">{courseTitle}</h1>
                  <p className="truncate text-xs text-gray-300">{lessonTitle}</p>
                </div>
              </div>

              <div className="hidden flex-shrink-0 items-center gap-3 md:flex">
                <div className="flex items-center gap-1 text-sm text-gray-200">
                  <Share2 className="h-4 w-4" />
                  <span>166</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-200">
                  <Bookmark className="h-4 w-4" />
                  <span>731</span>
                </div>
              </div>
            </div>
            <div className="mt-[17px] h-px bg-white/30 -mx-4" />
          </div>
        </>
      )}
    </div>
  );
}
