import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const fallbackSlides = [
  {
    id: 1,
    title: 'Build your next skill sprint.',
    description: 'Tap any banner to jump straight into the next lesson.',
    image: '/images/Poster12.jpg',
    duration: '5m 23s',
  },
  {
    id: 2,
    title: 'Level up with guided practice.',
    description: 'Follow curated paths that keep you focused and moving.',
    image: '/images/Poster8.jpg',
    duration: '8m 45s',
  },
  {
    id: 3,
    title: 'Binge-worthy knowledge drops.',
    description: 'New releases and top picks, all in one place.',
    image: '/images/Poster5.jpg',
    duration: '7m 12s',
  },
];

export default function HeroCarousel({ slides, onSelect, theme = 'light' }) {
  const isDark = theme === 'dark';
  const data = slides?.length ? slides : fallbackSlides;
  const panelClasses = isDark
    ? 'border-white/10 bg-slate-900/60 text-white shadow-[0_40px_120px_rgba(2,6,23,0.7)]'
    : 'border-white/70 bg-white/70 text-slate-900 shadow-[0_40px_90px_rgba(15,23,42,0.16)]';

  return (
    <section className={`relative overflow-hidden rounded-[32px] border ${panelClasses}`}>
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_60%)]'
            : 'bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_60%)]'
        }`}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 left-4 z-20 hidden items-center lg:flex">
        <button
          type="button"
          className={`hero-swiper-prev flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl ${
            isDark
              ? 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              : 'border-white/70 bg-white/80 text-slate-900 hover:bg-white'
          }`}
          aria-label="Previous banner"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 z-20 hidden items-center lg:flex">
        <button
          type="button"
          className={`hero-swiper-next flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl ${
            isDark
              ? 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              : 'border-white/70 bg-white/80 text-slate-900 hover:bg-white'
          }`}
          aria-label="Next banner"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <Swiper
        className="hero-swiper"
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.hero-swiper-next',
          prevEl: '.hero-swiper-prev',
        }}
        pagination={{ clickable: true }}
        loop
      >
        {data.map((slide) => (
          <SwiperSlide key={slide.id}>
            <button
              type="button"
              onClick={() => onSelect?.(slide.id)}
              className="relative flex h-[320px] w-full items-end overflow-hidden text-left sm:h-[360px] lg:h-[420px]"
              aria-label={`Open ${slide.title}`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className={`absolute inset-0 ${
                  isDark
                    ? 'bg-gradient-to-r from-slate-950/85 via-slate-900/55 to-transparent'
                    : 'bg-gradient-to-r from-white/90 via-white/40 to-transparent'
                }`}
              />
              <div className="relative z-10 w-full max-w-xl space-y-3 px-6 pb-8 sm:px-10 sm:pb-10">
                <p
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                    isDark ? 'bg-white/15 text-white' : 'bg-white/80 text-slate-800'
                  }`}
                >
                  Featured
                </p>
                <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{slide.title}</h2>
                <p className={`text-sm sm:text-base ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {slide.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isDark ? 'bg-white/15 text-slate-100' : 'bg-white/80 text-slate-800'
                    }`}
                  >
                    {slide.duration || 'New lesson'}
                  </span>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold ${
                      isDark ? 'bg-blue-500/80 text-white' : 'bg-blue-600 text-white'
                    }`}
                  >
                    <Play className="h-4 w-4" />
                    Play now
                  </span>
                </div>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
