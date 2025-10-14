import React, { useEffect, useState, useRef, useMemo } from 'react';
import YouTube from 'react-youtube';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Star,
  Share2,
  Bookmark,
  Plus,
  RotateCcw,
  MessageSquare,
  FileText,
  BookOpen,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

import { allCourses } from '../Data/data';
import VideoTabs from '@/components/VideoTabs';

export default function VideoPlayerPage({ courseId, onBack }) { 
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const [availableQualities, setAvailableQualities] = useState([]);
  const [playbackQuality, setPlaybackQuality] = useState('auto');
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [lockedPlayerHeight, setLockedPlayerHeight] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const videoContainerRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const qualitySyncTimeoutRef = useRef(null);
  const qualityLockIntervalRef = useRef(null);
  const qualityLockTimeoutRef = useRef(null);
  const userSelectedQualityRef = useRef('auto'); 

  useEffect(() => {
    const foundCourse = allCourses[courseId]; 
    if (foundCourse) {
      setCourse(foundCourse);
      const allLessons = foundCourse.chapters.flatMap(c => c.lessons);
      const firstLesson = allLessons[0];
      setCurrentLesson(firstLesson);
    }
  }, [courseId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }
    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);
  
  const handleMouseMove = () => {
    setShowControls(true);
  };

  // useEffect(() => {
  //   const resetControlsTimeout = () => {
  //     if (controlsTimeoutRef.current) {
  //       clearTimeout(controlsTimeoutRef.current);
  //     }
  //     if (playing) {
  //       controlsTimeoutRef.current = setTimeout(() => {
  //         setShowControls(false);
  //       }, 3000);
  //     }
  //   };
  //   resetControlsTimeout();
  //   return () => {
  //     if (controlsTimeoutRef.current) {
  //       clearTimeout(controlsTimeoutRef.current);
  //     }
  //   };
  // }, [playing, showControls]);

  useEffect(() => {
  if (controlsTimeoutRef.current) {
    clearTimeout(controlsTimeoutRef.current);
  }

  // ✅ Always show controls when paused
  if (!playing) {
    setShowControls(true);
    return;
  }

  // ⏳ Hide controls after 3s when playing
  controlsTimeoutRef.current = setTimeout(() => {
    setShowControls(false);
  }, 3000);

  return () => clearTimeout(controlsTimeoutRef.current);
}, [playing, showControls]);

  const QUALITY_ORDER = ['highres', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny'];

  const normalizeQuality = (quality) => {
    if (!quality || quality === 'default') return 'auto';
    return quality;
  };

  const denormalizeQuality = (quality) => {
    if (!quality || quality === 'auto') return 'default';
    return quality;
  };

  const sortQualities = (qualities) => {
    const normalized = (qualities || []).map(normalizeQuality);
    const unique = Array.from(new Set(normalized));
    if (!unique.includes('auto')) {
      unique.push('auto');
    }
    const ordered = [];

    if (unique.includes('auto')) {
      ordered.push('auto');
    }

    for (const quality of QUALITY_ORDER) {
      if (unique.includes(quality)) {
        ordered.push(quality);
      }
    }

    for (const quality of unique) {
      if (!ordered.includes(quality)) {
        ordered.push(quality);
      }
    }

    return ordered;
  };

  const getHighestQuality = (qualities) => {
    for (const quality of QUALITY_ORDER) {
      if (qualities.includes(quality)) {
        return quality;
      }
    }
    return qualities.includes('auto') ? 'auto' : qualities[0] || 'auto';
  };

  const clearQualityLock = () => {
    if (qualityLockIntervalRef.current) {
      clearInterval(qualityLockIntervalRef.current);
      qualityLockIntervalRef.current = null;
    }
    if (qualityLockTimeoutRef.current) {
      clearTimeout(qualityLockTimeoutRef.current);
      qualityLockTimeoutRef.current = null;
    }
  };

  const scheduleQualityLock = (quality) => {
    clearQualityLock();
    if (quality === 'auto') return;

    const targetQuality = denormalizeQuality(quality);
    const reinforceQuality = () => {
      if (!playerRef.current) return;
      try {
        playerRef.current.setPlaybackQuality(targetQuality);
        if (typeof playerRef.current.setPlaybackQualityRange === 'function') {
          playerRef.current.setPlaybackQualityRange(targetQuality, targetQuality);
        }
      } catch (lockError) {
        console.warn('Quality lock reinforcement failed:', lockError);
      }
    };

    reinforceQuality();
    qualityLockIntervalRef.current = setInterval(reinforceQuality, 1000);
    qualityLockTimeoutRef.current = setTimeout(() => {
      clearQualityLock();
    }, 15000);
  };
 
  const updateAvailableQualities = () => {
    if (!playerRef.current) {
      return [];
    }
    const rawQualities = playerRef.current.getAvailableQualityLevels() || [];
    console.log('Raw YouTube qualities:', rawQualities);
    const qualityOptions = sortQualities(rawQualities);
    const uniqueOptions = Array.from(new Set(qualityOptions));
    console.log('Normalized quality options:', uniqueOptions);
    setAvailableQualities(uniqueOptions);
    return uniqueOptions;
  };

  const qualityOptionsForSelect = useMemo(() => {
    const options = new Set(
      availableQualities
        .filter((quality) => quality !== 'auto')
        .map(normalizeQuality)
    );

    const normalizedCurrent = normalizeQuality(playbackQuality);
    if (normalizedCurrent !== 'auto') {
      options.add(normalizedCurrent);
    }

    const normalizedUser = normalizeQuality(userSelectedQualityRef.current);
    if (normalizedUser !== 'auto') {
      options.add(normalizedUser);
    }

    return Array.from(options);
  }, [availableQualities, playbackQuality]);
  
  // Apply quality change and sync state
  const applyQuality = (quality, attempts = 5) => {
    if (!playerRef.current) return;

    const targetQuality = denormalizeQuality(quality);

    try {
      playerRef.current.setPlaybackQuality(targetQuality);
      if (quality !== 'auto') {
        if (typeof playerRef.current.setPlaybackQualityRange === 'function') {
          try {
            playerRef.current.setPlaybackQualityRange(targetQuality, targetQuality);
          } catch (rangeError) {
            console.warn('Unable to lock playback quality range:', rangeError);
          }
        }
        scheduleQualityLock(quality);
      } else {
        clearQualityLock();
      }
      if (qualitySyncTimeoutRef.current) {
        clearTimeout(qualitySyncTimeoutRef.current);
      }
      qualitySyncTimeoutRef.current = setTimeout(() => {
        if (!playerRef.current) return;
        const actual = normalizeQuality(playerRef.current.getPlaybackQuality());
        if (
          quality !== 'auto' &&
          actual !== quality &&
          attempts > 0 &&
          userSelectedQualityRef.current === quality &&
          playerRef.current.getAvailableQualityLevels().map(normalizeQuality).includes(quality)
        ) {
          console.log(`Retrying quality change to ${quality}. Current: ${actual}. Attempts left: ${attempts - 1}`);
          qualitySyncTimeoutRef.current = null;
          applyQuality(quality, attempts - 1);
          return;
        }
        setPlaybackQuality(quality === 'auto' ? 'auto' : actual);
        qualitySyncTimeoutRef.current = null;
      }, 300);
    } catch (error) {
      console.error('Failed to apply quality:', error);
    }
  };

  const handleOnStateChange = (event) => {
    if (event.data === 1) {
      setPlaying(true);
      const qualityOptions = updateAvailableQualities();

      if (playerRef.current && userSelectedQualityRef.current !== 'auto') {
        if (
          qualityOptions.includes(userSelectedQualityRef.current) ||
          qualityOptions.map(normalizeQuality).includes(userSelectedQualityRef.current)
        ) {
          applyQuality(userSelectedQualityRef.current);
        }
      }
    } else if (event.data === 2) {
      setPlaying(false);
    }
  };

  const handleOnReady = (event) => {
    console.log('Player ready');
    playerRef.current = event.target;
    setIsPlayerReady(true);
    
    const videoDuration = playerRef.current.getDuration();
    setDuration(videoDuration);

    const qualityOptions = updateAvailableQualities();

    const actualQuality = normalizeQuality(playerRef.current.getPlaybackQuality());

    // If user hasn't chosen a quality yet, prefer the highest available option.
    if (userSelectedQualityRef.current === 'auto' && qualityOptions.length > 0) {
      const preferredQuality = getHighestQuality(qualityOptions);
      userSelectedQualityRef.current = preferredQuality;
      setPlaybackQuality(preferredQuality);
      if (preferredQuality !== actualQuality) {
        applyQuality(preferredQuality);
      }
    } else {
      setPlaybackQuality(actualQuality);
      if (
        userSelectedQualityRef.current !== 'auto' &&
        userSelectedQualityRef.current !== actualQuality
      ) {
        applyQuality(userSelectedQualityRef.current);
      }
    }
  };

  // onPlaybackQualityChange is no longer needed because our applyQuality function handles monitoring
  const handleOnPlaybackQualityChange = (event) => {
    const normalizedQuality = normalizeQuality(event.data);
    console.log('Quality changed by player:', event.data, `(normalized: ${normalizedQuality})`);
    setPlaybackQuality(normalizedQuality);
    const options = updateAvailableQualities();

    const desiredQuality = userSelectedQualityRef.current;
    if (
      desiredQuality !== 'auto' &&
      normalizedQuality !== desiredQuality &&
      options.map(normalizeQuality).includes(desiredQuality)
    ) {
      console.log(`Player dropped quality to ${normalizedQuality}, reapplying desired ${desiredQuality}`);
      applyQuality(desiredQuality);
    }
  };

  useEffect(() => {
    let interval = null;
    if (playing && playerRef.current) {
      interval = setInterval(() => {
        try {
          const time = playerRef.current.getCurrentTime();
          setCurrentTime(time);
        } catch (error) {
          console.log('Error getting current time:', error);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing]);

  useEffect(() => {
    return () => {
      if (qualitySyncTimeoutRef.current) {
        clearTimeout(qualitySyncTimeoutRef.current);
      }
      clearQualityLock();
    };
  }, []);

  useEffect(() => {
    userSelectedQualityRef.current = 'auto';
    setAvailableQualities([]);
    setPlaybackQuality('auto');
    if (qualitySyncTimeoutRef.current) {
      clearTimeout(qualitySyncTimeoutRef.current);
      qualitySyncTimeoutRef.current = null;
    }
    clearQualityLock();
  }, [currentLesson]);

  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isSidebarOpen || isFullscreen) {
      return undefined;
    }

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const container = videoContainerRef.current;
    if (!container) {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setLockedPlayerHeight(entry.contentRect.height);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [isSidebarOpen, isFullscreen]);

  const selectLesson = (lessonId) => {
    const allLessons = course.chapters.flatMap(c => c.lessons);
    const foundLesson = allLessons.find(l => l.id === lessonId);
    if (foundLesson) {
      setCurrentLesson(foundLesson);
      setPlaying(false);
      setCurrentTime(0);
      userSelectedQualityRef.current = 'auto';
      setAvailableQualities([]);
      setPlaybackQuality('auto');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (playing) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const handleSkipBackward = () => {
    if (playerRef.current) {
      const newTime = Math.max(0, playerRef.current.getCurrentTime() - 10);
      playerRef.current.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleSkipForward = () => {
    if (playerRef.current) {
      const newTime = Math.min(playerRef.current.getDuration(), playerRef.current.getCurrentTime() + 10);
      playerRef.current.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume * 100);
    }
  };

  const handleToggleMute = () => {
    if (playerRef.current) {
      if (muted) {
        playerRef.current.unMute();
        setMuted(false);
        const currentVolume = playerRef.current.getVolume();
        setVolume(currentVolume / 100);
      } else {
        playerRef.current.mute();
        setMuted(true);
      }
    }
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
  };

  const handleQualityChange = (newQuality) => {
    userSelectedQualityRef.current = newQuality;
    setPlaybackQuality(newQuality);
    applyQuality(newQuality);
  };

  const hideSidebar = () => {
    if (videoContainerRef.current) {
      const { height } = videoContainerRef.current.getBoundingClientRect();
      if (height > 0) {
        setLockedPlayerHeight(height);
      }
    }
    setIsSidebarOpen(false);
  };

  const renderSidebarContent = (showCloseButton = true) => (
    <div className="flex h-full flex-col bg-gray-800 text-white">
      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <Menu className="h-4 w-4 text-gray-300" />
          <h2 className="text-sm font-semibold text-gray-100">Contents</h2>
        </div>
        {showCloseButton && (
          <button
            onClick={hideSidebar}
            className="p-1 text-gray-300 transition-colors duration-200 hover:text-white"
            aria-label="Close contents"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <aside className="flex-1 overflow-y-auto px-4 py-4">
        {course?.chapters.map((chapter) => (
          <div key={chapter.id} className="border-b border-gray-700 pb-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-white">{chapter.title}</h3>
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="space-y-2">
              {chapter.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => selectLesson(lesson.id)}
                  className={`flex cursor-pointer items-center space-x-3 rounded px-2 py-2 transition-colors ${
                    currentLesson && lesson.id === currentLesson.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <div
                    className={`h-3 w-3 rounded-full border-2 ${
                      lesson.completed
                        ? 'border-green-500 bg-green-500'
                        : currentLesson && lesson.id === currentLesson.id
                        ? 'border-white'
                        : 'border-gray-500'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm ${
                        currentLesson && lesson.id === currentLesson.id ? 'font-medium text-white' : 'text-gray-300'
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-400">{lesson.duration}</p>
                  </div>
                  <button className="text-gray-400 transition-colors duration-200 hover:text-white">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </aside>
    </div>
  );

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatQualityLabel = (quality) => {
    const qualityLabels = {
      'hd2160': '4K',
      'hd1440': '1440p',
      'hd1080': '1080p',
      'hd720': '720p',
      'large': '480p',
      'medium': '360p',
      'small': '240p',
      'auto': 'Auto'
    };
    return qualityLabels[quality] || quality.toUpperCase();
  };

  const getVideoDescription = () => course?.videoDescriptions?.[currentLesson?.title] || "Explore advanced AI concepts and practical applications.";
  const getLearningObjectives = () => course?.learningObjectives?.[currentLesson?.title] || [];
  const getTranscriptSegments = () => course?.transcripts?.[currentLesson?.title] || [];

  const videoId = currentLesson?.videoUrl?.split('v=')[1]?.split('&')[0]?.replace('embed/', '');

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl text-gray-400">Loading course details...</p>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,     
      fs: 0,
      hd: 1,
      vq: 'hd1080',
    },
  };

  return (
    <div className="relative flex h-[calc(100vh-64px)] flex-col bg-gray-900 lg:flex-row">
      {/* Sidebar */}
      {isDesktop ? (
        <div
          className={`hidden h-full min-h-[calc(100vh-64px)] flex-shrink-0 border-r border-gray-800 transition-[margin,width] duration-300 lg:flex ${
            isSidebarOpen ? 'lg:w-[350px]' : 'lg:w-0 lg:-ml-[350px]'
          }`}
        >
          {isSidebarOpen && renderSidebarContent(false)}
        </div>
      ) : (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
              isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={`fixed top-16 bottom-0 left-0 z-50 flex h-full w-72 max-w-[85%] transform transition-all duration-300 lg:hidden ${
              isSidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
            }`}
          >
            {renderSidebarContent(true)}
          </div>
        </>
      )}
      {/* Vertical Divider */}
      {isDesktop && isSidebarOpen && <div className="hidden w-px bg-black lg:block" />}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-300">
        {/* Video Header */}
        

        {/* Video Player */}
        <div
          ref={videoContainerRef}
          className={`relative bg-black w-full overflow-hidden flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'aspect-video' : ''} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
          style={
            !isFullscreen && !isSidebarOpen && lockedPlayerHeight
              ? { height: `${lockedPlayerHeight}px` }
              : undefined
          }
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
  if (playing) setShowControls(false);
}}

        >
          {/* Use react-youtube component */}
          {currentLesson && videoId && (
            <YouTube
              key={videoId} // Force remount when video changes
              videoId={videoId}
              opts={opts}
              onReady={handleOnReady}
              onStateChange={handleOnStateChange}
              onPlaybackQualityChange={handleOnPlaybackQualityChange}
              className="w-full h-full"
              containerClassName="relative w-full h-full"
            />
          )}
          
          {/* Custom Controls Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Center Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <button
                onClick={handlePlayPause}
                className="bg-black/50 hover:bg-black/70 rounded-full p-4 transition-all duration-200 backdrop-blur-sm"
              >
                {playing ? (
                  <Pause className="w-12 h-12 text-white" />
                ) : (
                  <Play className="w-12 h-12 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="relative w-full h-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-600 rounded-lg transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeekChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    style={{
                      background: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause */}
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </button>

                  {/* Skip Backward (Previous Lesson) */}
                  <button
                    onClick={() => {
                      const allLessons = course.chapters.flatMap(c => c.lessons);
                      const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
                      if (currentIndex > 0) {
                        selectLesson(allLessons[currentIndex - 1].id);
                      }
                    }}
                    className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={(() => {
                      const allLessons = course.chapters.flatMap(c => c.lessons);
                      const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
                      return currentIndex <= 0;
                    })()}
                    title="Previous Lesson"
                  >
                    <SkipBack className="w-6 h-6" />
                  </button>

                  {/* Skip Forward (Next Lesson) */}
                  <button
                    onClick={() => {
                      const allLessons = course.chapters.flatMap(c => c.lessons);
                      const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
                      if (currentIndex < allLessons.length - 1) {
                        selectLesson(allLessons[currentIndex + 1].id);
                      }
                    }}
                    className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={(() => {
                      const allLessons = course.chapters.flatMap(c => c.lessons);
                      const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
                      return currentIndex >= allLessons.length - 1;
                    })()}
                    title="Next Lesson"
                  >
                    <SkipForward className="w-6 h-6" />
                  </button>

                  {/* Volume Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleToggleMute}
                      className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"
                      title="Volume"
                    >
                      {muted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    <div className="relative w-20 h-1 bg-white/20 rounded-lg backdrop-blur-sm">
                      <div 
                        className="absolute top-0 left-0 h-full bg-white rounded-lg transition-all duration-200"
                        style={{ width: `${muted ? 0 : volume * 100}%` }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={muted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title="Volume"
                      />
                    </div>
                  </div>

                  {/* Time Display */}
                  <span className="text-white text-sm font-mono bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                    {formatTime(currentTime)} / {formatTime(duration || 0)}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Playback Speed */}
                  <select
                    value={playbackRate}
                    onChange={(e) => {
                      const newRate = parseFloat(e.target.value);
                      setPlaybackRate(newRate);
                      if (playerRef.current) {
                          playerRef.current.setPlaybackRate(newRate);
                      }
                    }}
                    className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20 backdrop-blur-sm hover:bg-black/70 transition-colors"
                    title="Playback speed"
                  >
                    <option value={0.5}>0.5×</option>
                    <option value={0.75}>0.75×</option>
                    <option value={1}>1×</option>
                    <option value={1.25}>1.25×</option>
                    <option value={1.5}>1.5×</option>
                    <option value={2}>2×</option>
                  </select>

                  {/* Playback Quality - Fixed implementation */}
                  <select
                    value={playbackQuality}
                    onChange={(e) => handleQualityChange(e.target.value)}
                    className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20 backdrop-blur-sm hover:bg-black/70 transition-colors"
                    title="Video Quality"
                  >
                    <option value="auto">Auto</option>
                    {qualityOptionsForSelect.map((quality) => (
                      <option key={quality} value={quality}>
                        {formatQualityLabel(quality)}
                      </option>
                    ))}
                  </select>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"
                    title="Toggle Fullscreen"
                  >
                    <Maximize className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Top Info Bar */}
<div className="absolute top-0 left-0 right-0 px-4 pt-3 pb-2 bg-gradient-to-b from-black/70 to-transparent border-b border-white/20 pointer-events-auto transition-opacity duration-300">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full transition-colors"
          aria-label="Show contents"
        >
          <Menu className="w-4 h-4" />
          <span className="hidden sm:inline">Contents</span>
        </button>
      )}
      <div className="flex flex-col">
        <h1 className="text-sm font-semibold text-white">{course.title}</h1>
        <p className="text-xs text-gray-300 mt-1">{currentLesson?.title}</p>
      </div>
    </div>
    <div className="hidden md:flex items-center space-x-4">
      <div className="flex items-center space-x-1 text-sm text-gray-200">
        <Share2 className="w-4 h-4" />
        <span>166</span>
      </div>
      <div className="flex items-center space-x-1 text-sm text-gray-200">
        <Bookmark className="w-4 h-4" />
        <span>731</span>
      </div>
      <button className="text-gray-200 hover:text-white">
        <Plus className="w-5 h-5" />
      </button>
      <button className="text-gray-200 hover:text-white">
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  </div>
</div>

          </div>

          {/* Debug info (remove in production) */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="absolute top-20 left-4 bg-black/80 text-white p-2 rounded text-xs">
              <div>Player Ready: {isPlayerReady ? 'Yes' : 'No'}</div>
              <div>Current Quality: {playbackQuality}</div>
              <div>Available: {availableQualities.join(', ') || 'None'}</div>
              <div>User Selected Quality: {userSelectedQualityRef.current}</div>
              <div>Actual Quality: {playerRef.current ? playerRef.current.getPlaybackQuality() : 'N/A'}</div>
            </div>
          )} */}
        </div>

        <VideoTabs
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  currentLesson={currentLesson}
  getVideoDescription={getVideoDescription}
  getLearningObjectives={getLearningObjectives}
  getTranscriptSegments={getTranscriptSegments}
/>

      </div>
    </div>
  );
}
