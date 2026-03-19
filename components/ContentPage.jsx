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
  PlayIcon as Play,
} from '@heroicons/react/24/solid';

import MainHeader from '@/components/MainHeader';
import SolutionsBar from '@/components/SolutionsBar';
import MainSidebar from '@/components/MainSidebar';
import SidebarNavContent from '@/components/SidebarNavContent';
import CourseContentsSidebar from '@/components/CourseContentsSidebar';
import ImageCarousel from '@/components/ImageCarousel';

const bannerImages = ['/images/Poster14.jpg', '/images/Poster9.jpg', '/images/Poster12.jpg'];

const contentCards = [
  { id: 1, title: 'Portrait Sketchbooking: Explore the Human Face', author: 'Gabriela Niko', image: '/images/Poster6.jpg' },
  { id: 2, title: 'Self-Promotion Techniques for Creatives', author: 'Carla Bonomini', image: '/images/Poster10.jpg' },
  { id: 3, title: 'Lighting Essentials for Video Storytellers', author: 'Marcus Le', image: '/images/Poster8.jpg' },
  { id: 4, title: 'Productivity Playbook: Focused Workflows', author: 'Amara Singh', image: '/images/Poster4.jpg' },
];

export default function ContentPage() {
  const [theme, setTheme] = useState('light');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isContentsOpen, setIsContentsOpen] = useState(true);

  const router = useRouter();
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
        { icon: BookmarkSquare, label: 'My Library', href: '/browse' },
        { icon: Stack, label: 'Content', href: '/content', active: true },
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

  const dummyCourse = useMemo(
    () => ({
      id: 999,
      title: 'Creative Essentials',
      chapters: [
        {
          id: 1,
          title: 'Contents',
          lessons: [
            { id: 1, title: 'Introduction', duration: '3m', completed: true },
            { id: 2, title: 'Write more effective prompts', duration: '8m', completed: false },
            { id: 3, title: 'What makes a good prompt?', duration: '6m', completed: false },
            { id: 4, title: 'Prompting dos and don’ts', duration: '5m', completed: false },
            { id: 5, title: 'Prompt examples', duration: '7m', completed: false },
            { id: 6, title: 'Putting it all together', duration: '4m', completed: false },
          ],
        },
      ],
    }),
    []
  );

  const carouselItems = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) => ({
        id: index + 1,
        src: `/images/Poster${(index % 15) + 1}.jpg`,
        title: `Feature ${index + 1}`,
        subtitle: 'Continue learning',
        duration: `${4 + index}m`,
        lessonId: index + 1,
      })),
    []
  );

  const handleNavigate = (href) => {
    if (!href) return;
    router.push(href);
  };

  const sectionShell = isDark
    ? 'bg-white/5 backdrop-blur-2xl'
    : 'bg-white/80 backdrop-blur-2xl';

  return (
    <div className={`flex h-screen flex-col overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="sticky top-0 z-50 flex flex-col">
        <MainHeader
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        />
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
          <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-slate-950/50' : 'bg-white/70'}`}>
            <div className="flex flex-col gap-6 p-6">
              <section className={`relative overflow-hidden rounded-[32px] ${sectionShell}`}>
                <div className="relative h-[280px] sm:h-[340px] lg:h-[380px]">
                  <img
                    src={bannerImages[0]}
                    alt="Featured header"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? 'bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent'
                        : 'bg-gradient-to-r from-white/90 via-white/30 to-transparent'
                    }`}
                  />
                  <div className="relative z-10 flex h-full items-end px-6 pb-6 sm:px-10 sm:pb-10">
                    <div className="max-w-xl space-y-3">
                      <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
                        Featured collection
                      </p>
                      <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        Creative Momentum: Learn in focused bursts
                      </h2>
                      <p className={`${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                        Dive into curated lessons that help you build faster and finish stronger.
                      </p>
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                          isDark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-white text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <Play className="h-4 w-4" />
                        Play trailer
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className={`rounded-3xl p-6 ${sectionShell}`}>
                <ImageCarousel
                  theme={theme}
                  items={carouselItems}
                  onSelect={(item) => router.push(`/?lesson=${item.lessonId ?? item.id}`)}
                />
              </section>

              <section className={`grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]`}>
                <div className={`rounded-3xl ${sectionShell}`}>
                  {isContentsOpen && (
                    <CourseContentsSidebar
                      course={dummyCourse}
                      currentLessonId={1}
                      onSelectLesson={(lessonId) => router.push(`/?lesson=${lessonId}`)}
                      onClose={() => setIsContentsOpen(false)}
                      theme={theme}
                    />
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {contentCards.map((card) => (
                    <article key={card.id} className={`rounded-3xl p-5 ${sectionShell}`}>
                      <div className="relative h-40 overflow-hidden rounded-2xl">
                        <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <Play className="h-10 w-10" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <h3 className="text-lg font-semibold">{card.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          A course by {card.author}
                        </p>
                        <button
                          type="button"
                          className={`mt-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ${
                            isDark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          Get started
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
