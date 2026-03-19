'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HomeIcon as Home,
  BriefcaseIcon as Briefcase,
  BookmarkSquareIcon as BookmarkSquare,
  RectangleStackIcon as Stack,
  AcademicCapIcon as AcademicCap,
  CommandLineIcon as CommandLine,
  TrophyIcon as Award,
  ChartBarSquareIcon as ChartBar,
  XMarkIcon as XMark,
} from '@heroicons/react/24/solid';

import MainHeader from '@/components/MainHeader';
import SolutionsBar from '@/components/SolutionsBar';
import MainSidebar from '@/components/MainSidebar';
import SidebarNavContent from '@/components/SidebarNavContent';
import CourseContentsSidebar from '@/components/CourseContentsSidebar';
import HeroCarousel from '@/components/HeroCarousel';
import ImageCarousel from '@/components/ImageCarousel';
import { allCourses } from '../Data/data';

export default function BrowsePage({ courseId = 1 }) {
  const [theme, setTheme] = useState('light');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const router = useRouter();
  const course = allCourses[courseId];
  const isDark = theme === 'dark';

  const navSections = [
    {
      title: null,
      items: [
        { icon: Home, label: 'Home', active: false, href: '/' },
        { icon: Briefcase, label: 'My Career Journey' },
      ],
    },
    {
      title: 'Learn',
      items: [
        { icon: BookmarkSquare, label: 'My Library', href: '/browse', active: true },
        { icon: Stack, label: 'Content', href: '/content' },
        { icon: AcademicCap, label: 'Learning Paths' },
      ],
    },
    {
      title: 'Apply',
      items: [
        { icon: CommandLine, label: 'Coding Practice' },
        { icon: Award, label: 'Certifications' },
        { icon: ChartBar, label: 'Skill Assessments' },
      ],
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const storedTheme = window.localStorage?.getItem('ll-theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme);
        return;
      }
    } catch {
      // ignore storage read issues
    }
    let prefersDark = false;
    if (typeof window.matchMedia === 'function') {
      prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = theme;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem('ll-theme', theme);
      } catch {
        // ignore storage write issues
      }
    }
  }, [theme]);

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

  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  const lessons = useMemo(() => {
    if (!course?.chapters) return [];
    return course.chapters.flatMap((chapter) => chapter.lessons || []);
  }, [course]);

  const carouselItems = useMemo(() => {
    return lessons.map((lesson, idx) => ({
      id: lesson.id ?? idx + 1,
      src: lesson.studyMaterials?.[0] || `/images/Poster${(idx % 15) + 1}.jpg`,
      title: lesson.title,
      subtitle: lesson.instructor || course?.instructor,
      duration: lesson.duration,
      lessonId: lesson.id,
    }));
  }, [lessons, course]);

  const handleSelectLesson = (lessonId) => {
    if (!lessonId) return;
    router.push(`/?lesson=${lessonId}`);
  };

  const handleNavigate = (href) => {
    if (!href) return;
    router.push(href);
  };

  const sectionShell = isDark
    ? 'bg-white/5 backdrop-blur-2xl'
    : 'bg-white/80 backdrop-blur-2xl';

  const layoutClasses = `relative flex flex-1 min-h-0 flex-col ${
    isDark ? 'bg-slate-950/50' : 'bg-white/70'
  } backdrop-blur-2xl transition-all duration-300 lg:grid lg:h-[calc(100vh-5rem)] ${
    isSidebarOpen ? 'lg:grid-cols-[340px_minmax(0,1fr)]' : 'lg:grid-cols-[0_minmax(0,1fr)]'
  }`;

  return (
    <div className={`flex h-screen flex-col overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="sticky top-0 z-50 flex flex-col">
        <MainHeader onOpenMobileNav={() => setIsMobileNavOpen(true)} theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))} />
        <SolutionsBar theme={theme} />
      </div>

      {!isDesktop && isMobileNavOpen && (
        <>
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileNavOpen(false)} />
          <aside
            className={`fixed inset-y-0 left-0 z-70 flex w-72 max-w-[85%] flex-col border-r shadow-[0_40px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl ${
              isDark ? 'border-white/10 bg-slate-950/80 text-gray-100' : 'border-white/50 bg-white/80 text-gray-900'
            }`}
          >
            <div className={`flex items-center justify-end border-b px-3 py-3 ${isDark ? 'border-white/10' : 'border-white/60'}`}>
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                className={`rounded-full p-2 ${isDark ? 'text-gray-200 hover:bg-white/10' : 'text-gray-600 hover:bg-white/50'}`}
                aria-label="Close navigation"
              >
                <XMark className="h-5 w-5" />
              </button>
            </div>
            <SidebarNavContent navSections={navSections} collapsed={false} theme={theme} onNavigate={handleNavigate} />
          </aside>
        </>
      )}

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <MainSidebar
          navSections={navSections}
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed((prev) => !prev)}
          theme={theme}
          onNavigate={handleNavigate}
        />

        <div className={`flex min-h-0 flex-1 flex-col overflow-hidden ${sectionShell}`}>
          <div className="flex-1 overflow-hidden">
            <div className={layoutClasses}>
              {isDesktop && (
                <div
                  className={`hidden lg:sticky lg:top-20 lg:flex lg:h-[calc(100vh-5rem)] lg:flex-col lg:overflow-hidden ${
                    isDark ? 'bg-white/5 backdrop-blur-2xl' : 'bg-white/70 backdrop-blur-2xl'
                  }`}
                >
                  {isSidebarOpen && (
                    <CourseContentsSidebar
                      course={course}
                      currentLessonId={lessons[0]?.id}
                      onSelectLesson={handleSelectLesson}
                      onClose={() => setIsSidebarOpen(false)}
                      theme={theme}
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
                      currentLessonId={lessons[0]?.id}
                      onSelectLesson={(lessonId) => {
                        handleSelectLesson(lessonId);
                        setIsSidebarOpen(false);
                      }}
                      onClose={() => setIsSidebarOpen(false)}
                      theme={theme}
                    />
                  </div>
                </>
              )}

              <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:col-start-2">
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-6 p-6">
                    {!isDesktop && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setIsSidebarOpen(true)}
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            isDark
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-white text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          Contents
                        </button>
                      </div>
                    )}

                    {Array.from({ length: 4 }).map((_, index) => (
                      <React.Fragment key={`block-${index}`}>
                        <section className={`rounded-3xl p-6 ${sectionShell}`}>
                          <HeroCarousel
                            slides={carouselItems.slice(0, 3).map((item) => ({
                              id: item.id,
                              title: item.title,
                              description: item.subtitle || 'Tap to start learning.',
                              image: item.src,
                              duration: item.duration,
                            }))}
                            onSelect={(lessonId) => handleSelectLesson(lessonId)}
                            theme={theme}
                          />
                        </section>
                        <section className={`rounded-3xl p-6 ${sectionShell}`}>
                          <ImageCarousel
                            theme={theme}
                            items={carouselItems}
                            onSelect={(item) => handleSelectLesson(item.lessonId ?? item.id)}
                          />
                        </section>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
