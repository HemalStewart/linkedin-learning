import React from 'react';
import { Menu, X, Bookmark } from 'lucide-react';

export default function CourseContentsSidebar({
  course,
  currentLessonId,
  onSelectLesson,
  onClose,
  showCloseButton = true,
}) {
  if (!course) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#293038] text-white">
      <div className="flex items-center justify-between border-b border-[#3a424d] bg-[#313842] px-4 py-4 flex-shrink-0">
        <div className="flex items-center gap-3 text font-semibold">
          <Menu className="h-6 w-6 text-gray-100" />
          <span>Contents</span>
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-gray-100 transition-colors duration-200 hover:border-white/40 hover:text-white"
            aria-label="Close contents"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <aside className="flex-1 overflow-y-auto px-4 py-5">
        {course.chapters.map((chapter) => (
          <div key={chapter.id} className="mb-6">
            <div className="flex items-center justify-between text-sm font-semibold text-gray-200">
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
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-3 py-3 transition-colors ${
                      isActive
                        ? 'bg-black text-white shadow-lg'
                        : 'hover:bg-[#343841]'
                    }`}
                  >
                    <div
                      className={`h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${
                        lesson.completed
                          ? 'border-green-400 bg-green-400'
                          : isActive
                          ? 'border-white'
                          : 'border-gray-500'
                      }`}
                    />

                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm ${isActive ? 'font-medium text-white' : 'text-gray-200'}`}>
                        {lesson.title}
                      </p>
                      {durationLabel && (
                        <p className="text-xs text-gray-400">{durationLabel}</p>
                      )}
                    </div>

                    <button
                      className={`flex-shrink-0 text-gray-400 transition-colors duration-200 hover:text-white ${
                        isActive ? 'text-white' : ''
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
