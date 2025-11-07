import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import YouTube from 'react-youtube';
import { allCourses } from '../Data/data';
import VideoTabs from '@/components/VideoTabs';
import CourseContentsSidebar from '@/components/CourseContentsSidebar';
import VideoPlayerOverlay from '@/components/VideoPlayerOverlay';
import MainHeader from '@/components/MainHeader';
import MainSidebar from '@/components/MainSidebar';
import SidebarNavContent from '@/components/SidebarNavContent';
import SolutionsBar from '@/components/SolutionsBar';
import {
  HomeIcon as Home,
  BriefcaseIcon as Briefcase,
  BookmarkSquareIcon as BookmarkSquare,
  RectangleStackIcon as Stack,
  AcademicCapIcon as AcademicCap,
  CommandLineIcon as CommandLine,
  TrophyIcon as Award,
  ChartBarSquareIcon as ChartBar,
  CodeBracketIcon as Code,
  XMarkIcon as XMark
} from '@heroicons/react/24/solid';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function VideoPlayerPage({ courseId }) { 
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
  const [isDesktop, setIsDesktop] = useState(false);

  const videoContainerRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const qualitySyncTimeoutRef = useRef(null);
  const qualityLockIntervalRef = useRef(null);
  const qualityLockTimeoutRef = useRef(null);
  const userSelectedQualityRef = useRef('auto'); 

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const navSections = [
    {
      title: null,
      items: [
        { icon: Home, label: 'Home', active: true },
        { icon: Briefcase, label: 'My Career Journey' }
      ]
    },
    {
      title: 'Learn',
      items: [
        { icon: BookmarkSquare, label: 'My Library' },
        { icon: Stack, label: 'Content' },
        { icon: AcademicCap, label: 'Learning Paths' }
      ]
    },
    {
      title: 'Apply',
      items: [
        { icon: CommandLine, label: 'Coding Practice' },
        { icon: Award, label: 'Certifications' },
        { icon: ChartBar, label: 'Skill Assessments' }
      ]
    }
  ];

  const selectedLessonIdFromParams = useMemo(() => {
    const lessonParam = searchParams?.get('lesson');
    if (!lessonParam) return null;
    const parsed = parseInt(lessonParam, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }, [searchParams]);

  useEffect(() => {
    const foundCourse = allCourses[courseId]; 
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      setCourse(null);
      setCurrentLesson(null);
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

  useEffect(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    if (!playing) {
      setShowControls(true);
      return;
    }

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
    const qualityOptions = sortQualities(rawQualities);
    const uniqueOptions = Array.from(new Set(qualityOptions));
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
    playerRef.current = event.target;
    setIsPlayerReady(true);
    
    const videoDuration = playerRef.current.getDuration();
    setDuration(videoDuration);

    const qualityOptions = updateAvailableQualities();

    const actualQuality = normalizeQuality(playerRef.current.getPlaybackQuality());

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

  const handleOnPlaybackQualityChange = (event) => {
    const normalizedQuality = normalizeQuality(event.data);
    setPlaybackQuality(normalizedQuality);
    const options = updateAvailableQualities();

    const desiredQuality = userSelectedQualityRef.current;
    if (
      desiredQuality !== 'auto' &&
      normalizedQuality !== desiredQuality &&
      options.map(normalizeQuality).includes(desiredQuality)
    ) {
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
    if (isDesktop) {
      setIsMobileNavOpen(false);
    }
  }, [isDesktop]);

  const updateLessonQuery = useCallback((lessonId) => {
    if (!pathname) return;
    const nextParams = new URLSearchParams(searchParams?.toString());
    nextParams.set('lesson', String(lessonId));
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const allLessons = useMemo(() => {
    if (!course) {
      return [];
    }
    return course.chapters.flatMap((chapter) => chapter.lessons);
  }, [course]);

  useEffect(() => {
    if (!course) return;
    const lessonsList = course.chapters.flatMap((chapter) => chapter.lessons);
    if (!lessonsList.length) return;

    const targetLesson =
      (selectedLessonIdFromParams && lessonsList.find((lesson) => lesson.id === selectedLessonIdFromParams)) ||
      lessonsList[0];

    if (!currentLesson || currentLesson.id !== targetLesson.id) {
      setCurrentLesson(targetLesson);
      setPlaying(false);
      setCurrentTime(0);
      userSelectedQualityRef.current = 'auto';
      setAvailableQualities([]);
      setPlaybackQuality('auto');
    }

    if (!selectedLessonIdFromParams) {
      updateLessonQuery(targetLesson.id);
    }
  }, [
    course,
    currentLesson,
    selectedLessonIdFromParams,
    updateLessonQuery
  ]);

  const currentLessonIndex = useMemo(() => {
    if (!currentLesson) {
      return -1;
    }
    return allLessons.findIndex((lesson) => lesson.id === currentLesson.id);
  }, [allLessons, currentLesson]);

  const canGoPrevious = currentLessonIndex > 0;
  const canGoNext = currentLessonIndex > -1 && currentLessonIndex < allLessons.length - 1;

  const selectLesson = (lessonId) => {
    const foundLesson = allLessons.find((lesson) => lesson.id === lessonId);
    if (foundLesson) {
      setCurrentLesson(foundLesson);
      setPlaying(false);
      setCurrentTime(0);
      userSelectedQualityRef.current = 'auto';
      setAvailableQualities([]);
      setPlaybackQuality('auto');
      updateLessonQuery(lessonId);
    }
  };

  const handlePreviousLesson = () => {
    if (canGoPrevious) {
      const previousLesson = allLessons[currentLessonIndex - 1];
      selectLesson(previousLesson.id);
    }
  };

  const handleNextLesson = () => {
    if (canGoNext) {
      const nextLesson = allLessons[currentLessonIndex + 1];
      selectLesson(nextLesson.id);
    }
  };

  const handlePlaybackRateChange = (newRate) => {
    setPlaybackRate(newRate);
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(newRate);
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

  const getVideoDescription = () => currentLesson?.description || "Explore advanced AI concepts and practical applications.";
  const getLearningObjectives = () => currentLesson?.objectives || [];
  const getTranscriptSegments = () => currentLesson?.transcript || [];
  const getLessonResources = () => currentLesson?.resources || [];

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

  const layoutClasses = `relative flex flex-1 min-h-0 flex-col bg-gray-900 transition-all duration-300 lg:grid lg:h-[calc(100vh-5rem)] ${
    isSidebarOpen ? 'lg:grid-cols-[340px_minmax(0,1fr)]' : 'lg:grid-cols-[0_minmax(0,1fr)]'
  }`;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100 text-gray-900">
      <div className="sticky top-0 z-50 flex flex-col">
        <MainHeader onOpenMobileNav={() => setIsMobileNavOpen(true)} />
        <SolutionsBar />
      </div>

      {!isDesktop && isMobileNavOpen && (
        <>
          <div
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-70 flex w-72 max-w-[85%] flex-col border-r border-gray-200 bg-white shadow-xl">
            <div className="flex items-center justify-end border-b border-gray-200 px-3 py-3">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Close navigation"
              >
                <XMark className="h-5 w-5" />
              </button>
            </div>
            <SidebarNavContent navSections={navSections} collapsed={false} />
          </aside>
        </>
      )}

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <MainSidebar
          navSections={navSections}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed((prev) => !prev)}
        />

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-gray-50">
          <div className="flex-1 overflow-hidden bg-gray-900">
            <div className={layoutClasses}>
              {isDesktop && (
                <div className="hidden bg-gray-900 lg:sticky lg:top-20 lg:flex lg:h-[calc(100vh-5rem)] lg:flex-col lg:overflow-hidden">
                  {isSidebarOpen && (
                    <CourseContentsSidebar
                      course={course}
                      currentLessonId={currentLesson?.id}
                      onSelectLesson={selectLesson}
                      onClose={() => setIsSidebarOpen(false)}
                    />
                  )}
                </div>
              )}
              {!isDesktop && (
            <>
              <div
                className={`fixed inset-0 z-60 bg-black/60 transition-opacity duration-300 lg:hidden ${
                  isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              />
              <div
                className={`fixed top-0 bottom-0 left-0 z-70 w-72 max-w-[85%] transform transition-all duration-300 lg:hidden ${
                  isSidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
                }`}
              >
                    <CourseContentsSidebar
                      course={course}
                      currentLessonId={currentLesson?.id}
                      onSelectLesson={(lessonId) => {
                        selectLesson(lessonId);
                        setIsSidebarOpen(false);
                      }}
                      onClose={() => setIsSidebarOpen(false)}
                    />
                  </div>
                </>
              )}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:col-start-2">
                <div className="flex-1 overflow-y-auto">
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[3px] bg-black/80" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[3px] bg-black/80" />
                    <div
                      ref={videoContainerRef}
                      className={`relative w-full overflow-hidden bg-black transition-all duration-300 ${
                        isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'h-[380px] md:h-[440px] lg:h-[480px]'
                      }`}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => {
                        if (playing) setShowControls(false);
                      }}
                    >
                      {currentLesson && videoId && (
                        <YouTube
                          key={videoId}
                          videoId={videoId}
                          opts={opts}
                          onReady={handleOnReady}
                          onStateChange={handleOnStateChange}
                          onPlaybackQualityChange={handleOnPlaybackQualityChange}
                          className="h-full w-full"
                          containerClassName="relative h-full w-full"
                        />
                      )}

                      <VideoPlayerOverlay
                        showControls={showControls}
                        playing={playing}
                        onPlayPause={handlePlayPause}
                        progress={progress}
                        duration={duration}
                        currentTime={currentTime}
                        onSeekChange={handleSeekChange}
                        onPreviousLesson={handlePreviousLesson}
                        onNextLesson={handleNextLesson}
                        canGoPrevious={canGoPrevious}
                        canGoNext={canGoNext}
                        muted={muted}
                        volume={volume}
                        onToggleMute={handleToggleMute}
                        onVolumeChange={handleVolumeChange}
                        formatTime={formatTime}
                        playbackRate={playbackRate}
                        onChangePlaybackRate={handlePlaybackRateChange}
                        playbackQuality={playbackQuality}
                        onChangeQuality={handleQualityChange}
                        qualityOptions={qualityOptionsForSelect}
                        formatQualityLabel={formatQualityLabel}
                        onToggleFullscreen={toggleFullscreen}
                        isSidebarOpen={isSidebarOpen}
                        onOpenSidebar={() => setIsSidebarOpen(true)}
                        courseTitle={course.title}
                        lessonTitle={currentLesson?.title || ''}
                      />
                    </div>
                  </div>

                  <VideoTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    currentLesson={currentLesson}
                    getVideoDescription={getVideoDescription}
                    getLearningObjectives={getLearningObjectives}
                    getTranscriptSegments={getTranscriptSegments}
                    getLessonResources={getLessonResources}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
