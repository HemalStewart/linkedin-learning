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

export default function ImageCarousel() {
  return (
    <div className="relative z-0 w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden items-center lg:flex lg:-translate-x-6">
        <div className="swiper-button-prev pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300 shadow-lg transition-colors hover:bg-gray-800">
          <ChevronLeft size={20} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden items-center lg:flex lg:translate-x-6">
        <div className="swiper-button-next pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-300 shadow-lg transition-colors hover:bg-gray-800">
          <ChevronRight size={20} />
        </div>
      </div>

      <Swiper
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
          <SwiperSlide key={image.id}>
            <img
              src={image.src}
              alt={`Poster ${image.id}`}
              className="h-auto w-full rounded-lg object-cover shadow"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
