import React from 'react';
import { Menu, X, Bookmark } from 'lucide-react';

export default function CourseContentsSidebar({
  course,
  currentLessonId,
  onSelectLesson,
  onClose,
  showCloseButton = true,
  theme = 'light',
}) {
  if (!course) {
    return null;
  }

  const isDark = theme === 'dark';
  const wrapperClasses = isDark
    ? 'bg-slate-950/60 text-gray-100 border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(2,6,23,0.65)]'
    : 'bg-white/70 text-black border-white/50 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.15)]';
  const headerClasses = isDark
    ? 'border-white/10 bg-white/5 text-gray-100'
    : 'border-white/60 bg-white/60 text-gray-900';
  const iconColor = isDark ? 'text-gray-200' : 'text-gray-700';
  const closeButtonClasses = isDark
    ? 'border-white/20 bg-white/0 text-gray-300 hover:border-white/40 hover:text-white hover:bg-white/10'
    : 'border-white/60 bg-white/10 text-gray-600 hover:border-gray-400 hover:text-black hover:bg-white/60';
  const chapterTitleClasses = isDark ? 'text-gray-100' : 'text-gray-800';
  const lessonContainerBase =
    'flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-200 backdrop-blur';
  const activeLessonClasses = isDark
    ? 'border-white/20 bg-white/10 text-white shadow-[0_20px_45px_rgba(0,0,0,0.45)]'
    : 'border-white/80 bg-white/70 text-black shadow-[0_20px_45px_rgba(15,23,42,0.15)]';
  const idleLessonClasses = isDark
    ? 'border-transparent text-gray-300 hover:bg-white/5 hover:text-white'
    : 'border-transparent text-gray-700 hover:bg-white/70';
  const durationClasses = isDark ? 'text-gray-400' : 'text-gray-500';
  const bookmarkButtonClasses = isDark
    ? 'text-gray-400 hover:text-white'
    : 'text-gray-500 hover:text-black';

  const getIndicatorClasses = (lesson, isActive) => {
    if (lesson.completed) return 'border-green-500 bg-green-500';
    if (isActive) return isDark ? 'border-white' : 'border-black';
    return isDark ? 'border-gray-600' : 'border-gray-400';
  };

  return (
    <div className={`flex h-full w-full flex-col border-r ${wrapperClasses}`}>
      <div className={`flex flex-shrink-0 items-center justify-between px-4 py-4 border-b ${headerClasses}`}>
        <div className="flex items-center gap-3 font-semibold">
          <Menu className={`h-6 w-6 ${iconColor}`} />
          <span>Contents</span>
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-200 ${closeButtonClasses}`}
            aria-label="Close contents"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <aside className="flex-1 overflow-y-auto px-4 py-5">
        {course.chapters.map((chapter) => (
          <div key={chapter.id} className="mb-6">
            <div className={`flex items-center justify-between text-sm font-semibold ${chapterTitleClasses}`}>
              <span>{chapter.title}</span>
            </div>

            <div className="mt-3 space-y-1">
              {chapter.lessons.map((lesson) => {
                const isActive = lesson.id === currentLessonId;
                const durationLabel = lesson.duration ? `${lesson.duration} video` : '';
                return (
                  <div
                    key={lesson.id}
                    onClick={() => onSelectLesson?.(lesson.id)}
                    className={`${lessonContainerBase} ${isActive ? activeLessonClasses : idleLessonClasses}`}
                  >
                    <div
                      className={`h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${getIndicatorClasses(
                        lesson,
                        isActive
                      )}`}
                    />

                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm ${isActive ? 'font-medium' : ''}`}>
                        {lesson.title}
                      </p>
                      {durationLabel && <p className={`text-xs ${durationClasses}`}>{durationLabel}</p>}
                    </div>

                    <button
                      className={`flex-shrink-0 transition-colors duration-200 ${bookmarkButtonClasses} ${
                        isActive ? (isDark ? 'text-white' : 'text-black') : ''
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
}
