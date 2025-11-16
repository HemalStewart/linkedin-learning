import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

const images = [
  { id: 1, src: '/images/Poster1.jpg' },
  { id: 2, src: '/images/Poster2.jpg' },
  { id: 3, src: '/images/Poster3.jpg' },
  { id: 4, src: '/images/Poster4.jpg' },
  { id: 5, src: '/images/Poster5.jpg' },
  { id: 6, src: '/images/Poster6.jpg' },
  { id: 7, src: '/images/Poster7.jpg' },
  { id: 8, src: '/images/Poster8.jpg' },
  { id: 9, src: '/images/Poster9.jpg' },
  { id: 10, src: '/images/Poster10.jpg' },
  { id: 11, src: '/images/Poster11.jpg' },
  { id: 12, src: '/images/Poster12.jpg' },
  { id: 13, src: '/images/Poster13.jpg' },
  { id: 14, src: '/images/Poster14.jpg' },
  { id: 15, src: '/images/Poster15.jpg' },
];

export default function ImageCarousel({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const shellClasses = isDark
    ? 'relative flex h-64 flex-col justify-end overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/60 shadow-[0_45px_95px_rgba(0,0,0,0.55)]'
    : 'relative flex h-64 flex-col justify-end overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-br from-white/95 via-slate-50/70 to-white/80 shadow-[0_45px_95px_rgba(15,23,42,0.18)]';
  const overlayGradient = isDark
    ? 'from-black/65 via-black/35 to-transparent'
    : 'from-white/35 via-white/15 to-transparent';
  const labelClasses = isDark ? 'bg-white/20 text-white' : 'bg-white/85 text-slate-900';

  return (
    <div className="relative z-0 w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden items-center lg:flex lg:-translate-x-6">
        <div
          className={`swiper-button-prev pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border ${
            isDark
              ? 'border-white/10 bg-white/10 text-white shadow-[0_20px_45px_rgba(0,0,0,0.45)] hover:bg-white/20'
              : 'border-white/50 bg-white/70 text-slate-900 shadow-[0_20px_45px_rgba(15,23,42,0.15)] hover:bg-white'
          } transition-colors backdrop-blur-xl`}
        >
          <ChevronLeft size={20} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden items-center lg:flex lg:translate-x-6">
        <div
          className={`swiper-button-next pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border ${
            isDark
              ? 'border-white/10 bg-white/10 text-white shadow-[0_20px_45px_rgba(0,0,0,0.45)] hover:bg-white/20'
              : 'border-white/50 bg-white/70 text-slate-900 shadow-[0_20px_45px_rgba(15,23,42,0.15)] hover:bg-white'
          } transition-colors backdrop-blur-xl`}
        >
          <ChevronRight size={20} />
        </div>
      </div>

      <Swiper
        className="liquid-swiper"
        spaceBetween={16}
        slidesPerView={2}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
        loop
        breakpoints={{
          480: { slidesPerView: 3, spaceBetween: 16 },
          640: { slidesPerView: 4, spaceBetween: 18 },
          768: { slidesPerView: 5, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 22 },
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="!h-auto">
            <div className={`${shellClasses} transition duration-500 hover:-translate-y-1`}>
              <div className="absolute inset-0 rounded-[32px] backdrop-blur-2xl" />
              <div className="absolute inset-0 overflow-hidden rounded-[32px]">
                <img
                  src={image.src}
                  alt={`Poster ${image.id}`}
                  className="h-full w-full object-cover"
                />
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${overlayGradient}`} />
                <div className="pointer-events-none absolute inset-0 bg-white/5 blur-3xl opacity-50" />
              </div>
              <div className="relative z-10 flex w-full flex-col gap-3 px-4 pb-4 text-white">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] drop-shadow">
                  <span>Gallery</span>
                  <span>{`#${image.id.toString().padStart(2, '0')}`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${labelClasses}`}>
                    Poster {image.id}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .liquid-swiper .swiper-slide {
          background: transparent !important;
          border-radius: 32px;
          overflow: hidden;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
