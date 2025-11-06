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

export default function PosterShowcase() {
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

  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#191c28] via-[#121420] to-[#191c28] px-6 py-12 sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(80,104,255,0.25),_transparent_55%)]" aria-hidden="true" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-center">
        <div className="space-y-4 text-white">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            {currentSet.badge}
          </p>
          <h2 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl transition-opacity duration-500">
            {currentSet.title}
          </h2>
          <p className="max-w-md text-sm text-blue-100 sm:text-base transition-opacity duration-500">
            {currentSet.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2 text-sm font-medium text-blue-100">
            {currentSet.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 px-3 py-1 transition-opacity duration-500">
                {tag}
              </span>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="rounded-lg bg-white/10 p-2 text-white transition-all hover:bg-white/20 disabled:opacity-50"
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
                    index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 disabled:opacity-50"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative flex h-[260px] items-center justify-center sm:h-[320px]">
          <div className="absolute -inset-x-6 top-1/2 -z-10 h-40 -translate-y-1/2 bg-gradient-to-r from-blue-500/20 via-white/20 to-purple-500/20 blur-3xl" aria-hidden="true" />
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
