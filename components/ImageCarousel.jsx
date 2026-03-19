import React, { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

const defaultImages = [
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

export default function ImageCarousel({ theme = 'light', items, onSelect }) {
  const isDark = theme === 'dark';
  const slides = items?.length ? items : defaultImages;
  const rawId = useId();
  const sliderId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const prevClass = `image-carousel-prev-${sliderId}`;
  const nextClass = `image-carousel-next-${sliderId}`;
  const shellClasses = isDark
    ? 'relative flex h-64 flex-col justify-end overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/60 shadow-[0_45px_95px_rgba(0,0,0,0.55)]'
    : 'relative flex h-64 flex-col justify-end overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-br from-white/95 via-slate-50/70 to-white/80 shadow-[0_45px_95px_rgba(15,23,42,0.18)]';
  const overlayGradient = isDark
    ? 'from-black/65 via-black/35 to-transparent'
    : 'from-white/35 via-white/15 to-transparent';
  const labelClasses = isDark ? 'bg-white/20 text-white' : 'bg-white/85 text-slate-900';
  const navButtonClasses = `pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl transition-colors ${
    isDark
      ? 'border-white/15 bg-white/10 text-white hover:bg-white/20'
      : 'border-white/70 bg-white/80 text-slate-900 hover:bg-white'
  }`;

  return (
    <div className="relative z-0 w-full">
      <div className="pointer-events-none absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center lg:flex">
        <div className={`${prevClass} ${navButtonClasses}`}>
          <ChevronLeft size={20} />
        </div>
      </div>
      <div className="pointer-events-none absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center lg:flex">
        <div className={`${nextClass} ${navButtonClasses}`}>
          <ChevronRight size={20} />
        </div>
      </div>

      <Swiper
        className="liquid-swiper"
        spaceBetween={16}
        slidesPerView={2}
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
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
        {slides.map((image, index) => {
          const canSelect = Boolean(onSelect);
          const Wrapper = canSelect ? 'button' : 'div';
          const imageId = image.id ?? index + 1;
          const title = image.title || `Poster ${imageId}`;
          return (
            <SwiperSlide key={imageId} className="!h-auto">
              <Wrapper
                type={canSelect ? 'button' : undefined}
                onClick={canSelect ? () => onSelect(image) : undefined}
                className={`${shellClasses} w-full text-left transition duration-500 hover:-translate-y-1 ${canSelect ? 'cursor-pointer' : ''}`}
                aria-label={canSelect ? `Open ${title}` : undefined}
              >
              <div className="absolute inset-0 rounded-[32px] backdrop-blur-2xl" />
              <div className="absolute inset-0 overflow-hidden rounded-[32px]">
                <img
                  src={image.src}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${overlayGradient}`} />
                <div className="pointer-events-none absolute inset-0 bg-white/5 blur-3xl opacity-50" />
              </div>
              <div className="relative z-10 flex w-full flex-col gap-3 px-4 pb-4 text-white">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] drop-shadow">
                  <span>Gallery</span>
                  <span>{`#${imageId.toString().padStart(2, '0')}`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${labelClasses}`}>
                    {title}
                  </span>
                  {image.duration && (
                    <span className={`text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {image.duration}
                    </span>
                  )}
                </div>
                {image.subtitle && (
                  <p className={`text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {image.subtitle}
                  </p>
                )}
              </div>
              </Wrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>{`
        .liquid-swiper .swiper-slide {
          background: transparent !important;
          border-radius: 32px;
          overflow: hidden;
          display: flex;
          justify-content: center;
        }
        .liquid-swiper .swiper-button-prev::after,
        .liquid-swiper .swiper-button-next::after {
          display: none;
        }
      `}</style>
    </div>
  );
}
