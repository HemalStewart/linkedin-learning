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
import ImageCarousel from '@/components/ImageCarousel';
import { allCourses } from '../Data/data';

export default function BrowsePage({ courseId = 1 }) {
  const [theme, setTheme] = useState('light');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isContentsOpen, setIsContentsOpen] = useState(true);

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
        { icon: Stack, label: 'Content' },
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

  const gridShell = isDark
    ? 'bg-slate-950/50'
    : 'bg-white/70';

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
          <div className={`flex-1 overflow-y-auto ${gridShell}`}>
            <div className={`grid min-h-full gap-6 p-6 lg:grid-cols-[320px_minmax(0,1fr)]`}>
              <div
                className={`hidden lg:flex lg:h-[calc(100vh-7rem)] lg:flex-col lg:overflow-hidden ${
                  isDark ? 'bg-white/5' : 'bg-white/70'
                } rounded-3xl`}
              >
                {isContentsOpen && (
                  <CourseContentsSidebar
                    course={course}
                    currentLessonId={lessons[0]?.id}
                    onSelectLesson={handleSelectLesson}
                    onClose={() => setIsContentsOpen(false)}
                    showCloseButton={false}
                    theme={theme}
                  />
                )}
              </div>

              <div className="flex flex-col gap-6">
                {!isDesktop && (
                  <section className={`rounded-3xl p-4 ${sectionShell}`}>
                    <CourseContentsSidebar
                      course={course}
                      currentLessonId={lessons[0]?.id}
                      onSelectLesson={handleSelectLesson}
                      showCloseButton={false}
                      theme={theme}
                    />
                  </section>
                )}

                {Array.from({ length: 4 }).map((_, index) => (
                  <section key={`carousel-${index}`} className={`rounded-3xl p-6 ${sectionShell}`}>
                    <ImageCarousel
                      theme={theme}
                      items={carouselItems}
                      onSelect={(item) => handleSelectLesson(item.lessonId ?? item.id)}
                    />
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
