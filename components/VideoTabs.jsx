import React from "react";
import { BookOpen, FileText } from "lucide-react";
import ImageCarousel from '@/components/ImageCarousel';
import PMICertificate from '@/components/PMICertificate';
import PosterShowcase from '@/components/PosterShowcase';

export default function VideoTabs({
  activeTab,
  setActiveTab,
  currentLesson,
  getVideoDescription,
  getLearningObjectives,
  getTranscriptSegments,
  getLessonResources
}) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'notebook', label: 'Notebook', icon: BookOpen },
    { id: 'transcript', label: 'Transcript', icon: FileText },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  return (
    <div className="flex-1 bg-white border-t">
      {/* Tabs Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap justify-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-6">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`inline-flex shrink-0 flex-col items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium text-center transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:text-sm ${
                  isActive
                    ? 'bg-gray-800 text-white ring-1 ring-gray-600'
                    : 'text-gray-800 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-center sm:text-left">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900">Subscribe to LinkedIn Learning</h3>
                <p className="text-gray-600">Get full access to all videos, exercise files, and certificates.</p>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">About this lesson</h4>
                <p className="text-gray-700">
                  {currentLesson?.title}: {getVideoDescription()}
                </p>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">Learning objectives</h4>
                <ul className="list-inside list-disc space-y-2 text-gray-700">
                  {getLearningObjectives().map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'notebook' && (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
              Notebook features are coming soon.
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h4 className="font-semibold text-gray-900">Video Transcript</h4>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Download PDF
                </button>
              </div>
              <div className="space-y-3">
                {getTranscriptSegments().map((segment, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 rounded p-3 hover:bg-gray-50 sm:flex-row sm:items-start sm:gap-3"
                  >
                    <span className="text-sm font-mono text-blue-600 sm:min-w-[70px]">
                      {segment.timestamp}
                    </span>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {segment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6 text-gray-800">
              {(() => {
                const resources = getLessonResources();
                if (!resources?.length) {
                  return (
                    <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                      MCQ coming soon for this lesson.
                    </div>
                  );
                }
                return resources.map((resource) => (
                  <div
                    key={resource.id || resource.title}
                    className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                      {resource.type || 'MCQ'}
                    </p>
                    <p className="mt-3 text-base font-semibold text-gray-900 whitespace-pre-line">
                      {resource.question || resource.title}
                    </p>
                    {resource.answer && (
                      <p className="mt-4 text-sm font-medium text-green-600">
                        ✔ {resource.answer}
                      </p>
                    )}
                  </div>
                ));
              })()}
            </div>
          )}
          <div className="pt-6 relative z-0">
            <ImageCarousel />
          </div>

          <div className="pt-6 px-10 sm:px-10">
            <PMICertificate />
          </div>
          <div className="pt-6">
            <PosterShowcase />
          </div>
        </div>
      </div>
    </div>
  );
}
