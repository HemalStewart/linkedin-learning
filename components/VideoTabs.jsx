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
  getLessonResources,
  theme = 'light'
}) {
  const isDark = theme === 'dark';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'notebook', label: 'Notebook', icon: BookOpen },
    { id: 'transcript', label: 'Transcript', icon: FileText },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];
  const mcqFontStyle = {
    fontFamily: 'var(--font-fm-malithi), "FM Malithi", "Noto Sans Sinhala", sans-serif'
  };
  const containerClasses = isDark
    ? 'bg-slate-950/50 text-gray-100 backdrop-blur-2xl shadow-[0_35px_70px_rgba(2,6,23,0.65)]'
    : 'bg-white/70 text-gray-900 backdrop-blur-2xl shadow-[0_35px_70px_rgba(15,23,42,0.15)]';
  const tabsHeaderClasses = isDark
    ? 'border-white/10 bg-white/5'
    : 'border-white/60 bg-white/50';
  const activeTabClasses = isDark
    ? 'bg-white/15 text-white ring-1 ring-white/30 shadow-[0_10px_35px_rgba(0,0,0,0.45)]'
    : 'bg-slate-900 text-white ring-1 ring-white/50 shadow-[0_10px_35px_rgba(15,23,42,0.25)]';
  const inactiveTabClasses = isDark
    ? 'text-gray-300 hover:text-white hover:bg-white/10'
    : 'text-gray-800 hover:text-white hover:bg-gray-700/50';
  const sectionTitleClasses = isDark ? 'text-gray-100' : 'text-gray-900';
  const bodyTextClasses = isDark ? 'text-gray-300' : 'text-gray-700';
  const cardBackgroundClasses = isDark
    ? 'rounded-2xl border border-white/10 bg-white/5 backdrop-blur'
    : 'rounded-2xl border border-white/70 bg-white/70 backdrop-blur';
  const placeholderClasses = isDark
    ? 'rounded-2xl border border-dashed border-white/20 bg-white/5 text-gray-400'
    : 'rounded-2xl border border-dashed border-white/70 bg-white/60 text-gray-500';
  const transcriptRowClasses = isDark
    ? 'flex flex-col gap-2 rounded-2xl p-3 hover:bg-white/5 sm:flex-row sm:items-start sm:gap-3'
    : 'flex flex-col gap-2 rounded-2xl p-3 hover:bg-white/70 sm:flex-row sm:items-start sm:gap-3';
  const transcriptTimeClasses = isDark ? 'text-blue-300' : 'text-blue-600';
  const resourceWrapperClasses = isDark ? 'space-y-6 text-gray-100' : 'space-y-6 text-gray-800';
  const resourceCardClasses = isDark
    ? 'rounded-3xl border border-white/15 bg-slate-950/60 p-5 shadow-[0_35px_65px_rgba(0,0,0,0.55)] backdrop-blur'
    : 'rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_35px_65px_rgba(15,23,42,0.18)] backdrop-blur';
  const resourceTypeClasses = isDark ? 'text-gray-400' : 'text-gray-400';
  const resourceTitleClasses = isDark ? 'text-gray-100' : 'text-gray-900';
  const resourceAnswerClasses = isDark ? 'text-green-400' : 'text-green-600';
  const linkClasses = isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700';

  return (
    <div className={`flex-1 ${containerClasses}`}>
      {/* Tabs Header */}
      <div className={`border-b shadow-sm ${tabsHeaderClasses}`}>
        <div className="flex flex-wrap justify-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-6">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`inline-flex shrink-0 flex-col items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium text-center transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:text-sm ${
                  isActive ? activeTabClasses : inactiveTabClasses
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
              <div className={`${cardBackgroundClasses} p-4`}>
                <h3 className={`mb-2 font-semibold ${sectionTitleClasses}`}>Subscribe to LinkedIn Learning</h3>
                <p className={bodyTextClasses}>Get full access to all videos, exercise files, and certificates.</p>
              </div>
              <div>
                <h4 className={`mb-3 font-semibold ${sectionTitleClasses}`}>About this lesson</h4>
                <p className={bodyTextClasses}>
                  {currentLesson?.title}: {getVideoDescription()}
                </p>
              </div>
              <div>
                <h4 className={`mb-3 font-semibold ${sectionTitleClasses}`}>Learning objectives</h4>
                <ul className={`list-inside list-disc space-y-2 ${bodyTextClasses}`}>
                  {getLearningObjectives().map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'notebook' && (
            <div className={`${placeholderClasses} p-8 text-center text-sm`}>
              Notebook features are coming soon.
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h4 className={`font-semibold ${sectionTitleClasses}`}>Video Transcript</h4>
                <button className={`text-sm ${linkClasses}`}>
                  Download PDF
                </button>
              </div>
              <div className="space-y-3">
                {getTranscriptSegments().map((segment, index) => (
                  <div
                    key={index}
                    className={transcriptRowClasses}
                  >
                    <span className={`text-sm font-mono sm:min-w-[70px] ${transcriptTimeClasses}`}>
                      {segment.timestamp}
                    </span>
                    <p className={`text-sm leading-relaxed ${bodyTextClasses}`}>
                      {segment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className={resourceWrapperClasses}>
              {(() => {
                const resources = getLessonResources();
                if (!resources?.length) {
                  return (
                    <div className={`${placeholderClasses} p-6 text-center text-sm`}>
                      MCQ coming soon for this lesson.
                    </div>
                  );
                }
                return resources.map((resource) => {
                  const isMcq = (resource.type || '').toLowerCase() === 'mcq';
                  return (
                    <div key={resource.id || resource.title} className={resourceCardClasses}>
                      <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${resourceTypeClasses}`}>
                        {resource.type || 'MCQ'}
                      </p>
                      <p
                        className={`mt-3 text-base font-semibold whitespace-pre-line ${resourceTitleClasses}`}
                        style={isMcq ? mcqFontStyle : undefined}
                      >
                        {resource.question || resource.title}
                      </p>
                      {resource.answer && (
                        <p
                          className={`mt-4 text-sm font-medium ${resourceAnswerClasses}`}
                          style={isMcq ? mcqFontStyle : undefined}
                        >
                          ✔ {resource.answer}
                        </p>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          )}
          <div className="pt-6 relative z-0">
            <ImageCarousel theme={theme} />
          </div>

          <div className="pt-6 px-10 sm:px-10">
            <PMICertificate theme={theme} />
          </div>
          <div className="pt-6">
            <PosterShowcase theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
