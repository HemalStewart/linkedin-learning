import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const posterSets = [
  {
    posters: [
      { src: '/images/Poster4.jpg', tilt: '-rotate-6', translate: '-translate-x-8 sm:-translate-x-16', zIndex: 'z-10' },
      { src: '/images/Poster2.jpg', tilt: 'rotate-0', translate: 'translate-y-0', zIndex: 'z-20', scale: 'scale-105 sm:scale-110' },
      { src: '/images/Poster7.jpg', tilt: 'rotate-6', translate: 'translate-x-8 sm:translate-x-16', zIndex: 'z-10' },
    ],
    badge: 'Trending now',
    title: 'Keep the inspiration.',
    description: 'Explore a rotating collection of trailers and teasers handpicked to spark creative ideas.',
    tags: ['Drama', 'Adventure', 'Family']
  },
  {
    posters: [
      { src: '/images/Poster1.jpg', tilt: '-rotate-6', translate: '-translate-x-8 sm:-translate-x-16', zIndex: 'z-10' },
      { src: '/images/Poster3.jpg', tilt: 'rotate-0', translate: 'translate-y-0', zIndex: 'z-20', scale: 'scale-105 sm:scale-110' },
      { src: '/images/Poster5.jpg', tilt: 'rotate-6', translate: 'translate-x-8 sm:translate-x-16', zIndex: 'z-10' },
    ],
    badge: 'Staff picks',
    title: 'Discover hidden gems.',
    description: 'Our team curates exceptional films that deserve your attention. From indie darlings to festival favorites.',
    tags: ['Indie', 'International', 'Award']
  },
  {
    posters: [
      { src: '/images/Poster6.jpg', tilt: '-rotate-6', translate: '-translate-x-8 sm:-translate-x-16', zIndex: 'z-10' },
      { src: '/images/Poster8.jpg', tilt: 'rotate-0', translate: 'translate-y-0', zIndex: 'z-20', scale: 'scale-105 sm:scale-110' },
      { src: '/images/Poster9.jpg', tilt: 'rotate-6', translate: 'translate-x-8 sm:translate-x-16', zIndex: 'z-10' },
    ],
    badge: 'Coming soon',
    title: 'Get ready releases.',
    description: 'Stay ahead of the curve with exclusive previews of upcoming films that will dominate the conversation.',
    tags: ['Action', 'Sci-Fi', 'Thriller']
  }
];

export default function PosterShowcase({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % posterSets.length);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + posterSets.length) % posterSets.length);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const currentSet = posterSets[currentIndex];

  const sectionClasses = isDark
    ? 'bg-gradient-to-r from-[#0e111d]/90 via-[#14182b]/85 to-[#0e111d]/90 shadow-[0_45px_120px_rgba(0,0,0,0.65)]'
    : 'bg-gradient-to-r from-white/80 via-slate-100/80 to-white/80 shadow-[0_45px_120px_rgba(15,23,42,0.18)]';

  return (
    <section className={`relative overflow-hidden rounded-3xl px-6 py-12 sm:px-10 backdrop-blur-2xl ${sectionClasses}`}>
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(circle_at_top,_rgba(80,104,255,0.25),_transparent_55%)]'
            : 'bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_60%)]'
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-center">
        <div className={`space-y-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <p
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
              isDark ? 'bg-white/10 text-blue-200' : 'bg-white/70 text-blue-600'
            }`}
          >
            {currentSet.badge}
          </p>
          <h2 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl transition-opacity duration-500">
            {currentSet.title}
          </h2>
          <p
            className={`max-w-md text-sm sm:text-base transition-opacity duration-500 ${
              isDark ? 'text-blue-100' : 'text-slate-600'
            }`}
          >
            {currentSet.description}
          </p>
          <div
            className={`flex flex-wrap gap-3 pt-2 text-sm font-medium ${
              isDark ? 'text-blue-100' : 'text-slate-600'
            }`}
          >
            {currentSet.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 transition-opacity duration-500 ${
                  isDark ? 'border border-white/20' : 'border border-slate-200 bg-white/40 text-slate-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className={`rounded-lg p-2 transition-all disabled:opacity-50 ${
                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/70 text-slate-900 hover:bg-white'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {posterSets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
              className={`h-2 rounded-lg transition-all ${
                index === currentIndex
                  ? isDark
                    ? 'w-8 bg-white'
                    : 'w-8 bg-slate-900'
                  : isDark
                    ? 'w-2 bg-white/30 hover:bg-white/50'
                    : 'w-2 bg-slate-900/30 hover:bg-slate-900/60'
              }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className={`rounded-full p-2 transition-all disabled:opacity-50 ${
                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/70 text-slate-900 hover:bg-white'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative flex h-[260px] items-center justify-center sm:h-[320px]">
          <div
            className={`absolute -inset-x-6 top-1/2 -z-10 h-40 -translate-y-1/2 blur-3xl ${
              isDark
                ? 'bg-gradient-to-r from-blue-500/20 via-white/20 to-purple-500/20'
                : 'bg-gradient-to-r from-blue-400/30 via-white/60 to-purple-400/30'
            }`}
            aria-hidden="true"
          />
          {currentSet.posters.map((poster, idx) => (
            <img
              key={`${currentIndex}-${idx}`}
              src={poster.src}
              alt="Featured poster"
              className={`absolute h-52 w-36 rounded-lg object-cover shadow-2xl transition-all duration-500 sm:h-64 sm:w-44 lg:h-72 lg:w-48 ${poster.tilt} ${poster.translate} ${poster.zIndex} ${poster.scale || ''} ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100'}`}
              style={{ boxShadow: '0 25px 45px rgba(10, 14, 35, 0.45)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
