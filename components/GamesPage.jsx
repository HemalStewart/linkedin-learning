'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import the filled icons from Heroicons
import {
  HomeIcon as Home,
  BookOpenIcon as BookOpen,
  TrophyIcon as Award,
  CodeBracketIcon as Code,
  QuestionMarkCircleIcon as HelpCircle,
  ChevronLeftIcon as ChevronLeft,
  ChevronRightIcon as ChevronRight,
  PlayIcon as Play,
  MagnifyingGlassIcon as Search,
  BellIcon as Bell,
  UserIcon as User,
  Bars3Icon as MenuIcon,
  XMarkIcon as XMark
} from '@heroicons/react/24/solid';

// Import the Course Data file
import { courseList } from '../Data/data';

// Import the CourseDetailsPage component to handle the detailed view
import CourseDetailsPage from './VideoPlayerPage';

// --- Helper Components ---
// This component displays a single course card.
const CourseCard = ({ course, hoveredCard, setHoveredCard, playingVideo }) => {
  return (
    <div
      className={`cursor-pointer transition-all duration-500 ease-out transform h-full flex flex-col ${
        hoveredCard === course.id
          ? 'scale-110 shadow-md z-50'
          : 'hover:scale-110'
      }`}
      onMouseEnter={() => setHoveredCard(course.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        position: 'relative',
        zIndex: hoveredCard === course.id ? 50 : 1
      }}
    >
      <div className={`flex-shrink-0 h-32 ${course.image} rounded-lg relative overflow-hidden`}>
        {playingVideo === course.id && (
          <div className="absolute inset-0 animate-fade-in">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              {/* This is a sample video for the hover preview */}
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              <div className="w-full h-full bg-black/80 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <Play className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm opacity-90">{course.preview}</p>
                </div>
              </div>
            </video>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-white text-xs opacity-90 line-clamp-2">{course.preview}</p>
            </div>
          </div>
        )}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${course.badgeColor} transition-transform duration-200 ${
          hoveredCard === course.id ? 'scale-110' : ''
        }`}>
          {course.badge}
        </div>
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs transition-all duration-200 hover:bg-opacity-90">
          {course.duration}
        </div>
        {hoveredCard === course.id && playingVideo !== course.id && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center animate-fade-in">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center animate-scale-in">
              <Play className="w-6 h-6 text-gray-800 ml-1" />
            </div>
          </div>
        )}
      </div>
      <div className="p-3 flex-grow">
        <div className="text-xs text-gray-500 mb-1">Course</div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm transition-colors duration-200 hover:text-blue-600">
          {course.title}
        </h3>
        <p className="text-xs text-gray-600">By: {course.instructor}</p>
      </div>
    </div>
  );
};

export default function GamesPage() {
  // Use state to manage UI interactions and data flow
  const [hoveredCard, setHoveredCard] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isDetailsView, setIsDetailsView] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Synchronize sidebar state with the details view
  useEffect(() => {
    if (isDetailsView) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isDetailsView]);

  useEffect(() => {
    if (isDetailsView) {
      setIsMobileNavOpen(false);
    }
  }, [isDetailsView]);

  // Handle the video preview on hover
  useEffect(() => {
    let timer;
    if (hoveredCard) {
      timer = setTimeout(() => {
        setPlayingVideo(hoveredCard);
      }, 800);
    } else {
      setPlayingVideo(null);
    }
    return () => clearTimeout(timer);
  }, [hoveredCard]);

  // Use the imported courseList to populate the carousel
  const courses = courseList;

  // Static sidebar data for the UI
  const sidebarSections = [
    {
      title: null,
      items: [
        { icon: Home, label: "Home", active: true, onClick: () => {
          setSelectedCourseId(null);
          setIsDetailsView(false);
        }},
        { icon: BookOpen, label: "My Career Journey" }
      ]
    },
    { title: "Learn", items: [{ icon: BookOpen, label: "My Library" }, { icon: BookOpen, label: "Content" }] },
    { title: "Apply", items: [{ icon: Code, label: "Coding Practice" }, { icon: Award, label: "Certifications" }] },
  ];

  const trendingTopics = [
    "Leadership and Management",
    "Artificial Intelligence",
    "Cybersecurity"
  ];

  const renderSidebarContent = (collapsed = false) => (
    <div className="flex h-full flex-col">
      <nav className="flex-1 overflow-y-auto">
        {sidebarSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={`mt-8 ${section.title ? '' : ''}`}>
            {!collapsed && section.title && (
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href="#"
                    onClick={(event) => {
                      if (item.onClick) {
                        item.onClick(event);
                      }
                      if (!collapsed) {
                        setIsMobileNavOpen(false);
                      }
                    }}
                    className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      item.active
                        ? 'border-r-2 border-blue-500 bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`h-6 w-6 transition-all duration-200 ${item.active ? 'text-blue-600' : ''}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {!collapsed && (
          <div className="mt-8">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Trending topics
            </h3>
            <ul className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <li key={index}>
                  <a
                    href="#"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="block rounded-md px-3 py-1 text-sm text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      <div className="mt-8 border-t border-gray-200 pt-4">
        <a
          href="#"
          onClick={() => setIsMobileNavOpen(false)}
          className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} rounded-md px-3 py-2 text-sm text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-blue-600`}
        >
          <HelpCircle className="h-6 w-6" />
          {!collapsed && <span>Help</span>}
        </a>
      </div>
    </div>
  );

  // Function to handle the click on a course card and trigger the detailed view
  const handleSelectCourse = (id) => {
    setSelectedCourseId(id);
    setIsDetailsView(true);
  };

  // Function to return to the main course list
  const handleBackToCourses = () => {
    setSelectedCourseId(null);
    setIsDetailsView(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 antialiased overflow-hidden">
      {/* Updated Sidebar */}
      <aside
        className={`hidden lg:flex fixed top-0 left-0 bottom-0 z-50 flex-col border-r border-gray-200 bg-white px-4 pb-6 pt-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div
          className={`flex h-10 items-center transition-all duration-300 ${
            isCollapsed ? 'justify-center' : 'justify-end'
          }`}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`rounded-full p-2 text-gray-500 transition-transform duration-300 hover:bg-gray-100 ${
              isCollapsed ? 'rotate-180' : 'rotate-0'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        {renderSidebarContent(isCollapsed)}
      </aside>

      {/* Mobile Sidebar */}
      {isMobileNavOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85%] flex-col bg-white shadow-xl lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  LL
                </div>
                <span className="text-base font-semibold text-gray-900">LinkedIn Learning</span>
              </div>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Close navigation"
              >
                <XMark className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {renderSidebarContent(false)}
            </div>
          </aside>
        </>
      )}
      
      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Main Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur-sm transition-all.duration-300 md:px-6 ${
            isCollapsed ? 'lg:pl-24' : 'lg:pl-72'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 lg:hidden"
              aria-label="Open navigation"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-sm font-semibold text-white">
                LL
              </div>
              <h1 className="hidden text-lg font-semibold text-gray-900 sm:block">LinkedIn Learning</h1>
            </div>
          </div>
          <div className="relative hidden w-full max-w-lg flex-1 items-center md:flex">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search for courses, skills, or topics..."
              className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-700 transition-all duration-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 md:hidden">
              <Search className="h-5 w-5" />
            </button>
            <button className="relative rounded-full p-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                2
              </span>
            </button>
            <button className="rounded-full p-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
              <User className="h-6 w-6" />
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className={`mx-auto w-full ${selectedCourseId ? 'p-0' : 'max-w-7xl p-4 md:p-8'} mt-16`}>
          {selectedCourseId ? (
            <CourseDetailsPage courseId={selectedCourseId} onBack={handleBackToCourses} />
          ) : (
            <>
              <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg p-6 md:p-8 mb-8 flex flex-col lg:flex-row items-center justify-between shadow-sm border border-gray-200 animate-fade-in-up relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <div className="max-w-2xl text-center lg:text-left relative z-10">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-in-left">
                    Nuwan, grow your skills and advance your career with LinkedIn Learning
                  </h1>
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6 animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold transition-transform duration-200 hover:scale-110 hover:z-10 ${
                          i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-teal-500' : 'bg-orange-500'
                        }`}>
                          U{i}
                        </div>
                      ))}
                    </div>
                    <span className="text-gray-600">Millions of members are on LinkedIn Learning</span>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      Start my free month
                    </button>
                    <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      Buy for my team
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block mt-8 lg:mt-0 animate-slide-in-right">
                  <div className="w-72 h-56 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-md flex items-center justify-center text-gray-500 transition-transform duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Play className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="font-medium">Learning Illustration</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Added a container around the whole section */}
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-gray-200 animate-fade-in-up">
                <section className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Top picks for Nuwan</h2>
                    <div className="flex space-x-2">
                      <button className="swiper-button-prev-custom p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="swiper-button-next-custom p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="carousel-container px-4 py-8 -mx-4 overflow-visible">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      slidesPerView={1}
                      spaceBetween={20}
                      navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                      }}
                      breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                        1280: { slidesPerView: 4, spaceBetween: 24 },
                      }}
                      speed={600}
                      className="carousel-swiper"
                    >
                      {courses.map((course) => (
                        <SwiperSlide key={course.id} className="pb-4">
                          <div onClick={() => handleSelectCourse(course.id)}>
                            <CourseCard
                              course={course}
                              hoveredCard={hoveredCard}
                              setHoveredCard={setHoveredCard}
                              playingVideo={playingVideo}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </section>
              </div>
            </>
          )}
        </main>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-in-left { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { transform: scale(0); } to { transform: scale(1); } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .carousel-container { overflow-x: hidden; overflow-y: visible; }
        .carousel-swiper { overflow: visible !important;  }
        .carousel-swiper .swiper-wrapper { overflow: visible !important; }
        .carousel-swiper .swiper-slide { overflow: visible !important; }
        body { overflow-x: hidden; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}
