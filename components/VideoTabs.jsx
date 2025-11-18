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
    ? 'relative isolate flex-1 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-900/80 text-gray-100 shadow-[0_60px_120px_rgba(0,0,0,0.6)] backdrop-blur-3xl'
    : 'relative isolate flex-1 overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-white/95 via-slate-50/75 to-white/60 text-gray-900 shadow-[0_60px_120px_rgba(15,23,42,0.18)] backdrop-blur-3xl';

  const controlShellClasses = isDark
    ? 'border border-white/15 bg-white/5'
    : 'border border-white/70 bg-white/85';

  const activeTabClasses = isDark
    ? 'bg-white/20 text-slate-900 shadow-[0_20px_35px_rgba(0,0,0,0.45)]'
    : 'bg-white text-slate-900 shadow-[0_20px_35px_rgba(15,23,42,0.18)]';

  const inactiveTabClasses = isDark
    ? 'text-gray-300 hover:text-white hover:bg-white/10'
    : 'text-slate-700 hover:text-slate-900 hover:bg-white/70';

  const sectionTitleClasses = isDark ? 'text-white' : 'text-slate-900';
  const bodyTextClasses = isDark ? 'text-gray-200' : 'text-slate-600';

  const panelClasses = isDark
    ? 'rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_35px_70px_rgba(0,0,0,0.4)]'
    : 'rounded-[28px] border border-white/70 bg-white/85 backdrop-blur-xl shadow-[0_35px_70px_rgba(15,23,42,0.12)]';

  const placeholderClasses = isDark
    ? 'rounded-2xl border border-dashed border-white/20 bg-white/5 text-gray-400'
    : 'rounded-2xl border border-dashed border-white/70 bg-white/70 text-gray-500';

  const transcriptRowClasses = isDark
    ? 'flex flex-col gap-2 rounded-2xl p-3 hover:bg-white/10 sm:flex-row sm:items-start sm:gap-3'
    : 'flex flex-col gap-2 rounded-2xl p-3 hover:bg-white/80 sm:flex-row sm:items-start sm:gap-3';

  const transcriptTimeClasses = isDark ? 'text-blue-200' : 'text-blue-600';

  const resourceWrapperClasses = isDark ? 'space-y-6 text-gray-100' : 'space-y-6 text-slate-900';

  const resourceCardClasses = isDark
    ? 'rounded-[32px] border border-white/15 bg-gradient-to-br from-slate-950/70 via-slate-900/50 to-slate-950/70 p-6 shadow-[0_45px_90px_rgba(0,0,0,0.55)] backdrop-blur'
    : 'rounded-[32px] border border-white/80 bg-gradient-to-br from-white/95 via-slate-50/70 to-white/55 p-6 shadow-[0_45px_90px_rgba(15,23,42,0.18)] backdrop-blur';

  const resourceTypeClasses = isDark ? 'text-gray-400' : 'text-gray-400';
  const resourceTitleClasses = isDark ? 'text-gray-100' : 'text-gray-900';
  const resourceAnswerClasses = isDark ? 'text-green-400' : 'text-green-600';

  const linkClasses = isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700';
  const resourceMetaBadgeClasses = isDark
    ? 'bg-white/10 text-cyan-200'
    : 'bg-slate-900/5 text-slate-700';
  const resourceMetaTextClasses = isDark ? 'text-cyan-200' : 'text-slate-600';
  const resourceTipClasses = isDark ? 'text-gray-300' : 'text-gray-700';

  const renderMcqContent = (text) => {
    const renderTaggedSegments = (content, fallbackStyle, keyPrefix) => {
      const segmentRegex = /\[(en|fm)\](.*?)\[\/\1\]/gi;
      const segments = [];
      let lastIndex = 0;
      let match;

      while ((match = segmentRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          segments.push({
            text: content.slice(lastIndex, match.index),
            style: fallbackStyle,
          });
        }
        const [, tag, inner] = match;
        segments.push({
          text: inner,
          style: tag.toLowerCase() === 'fm' ? mcqFontStyle : undefined,
        });
        lastIndex = segmentRegex.lastIndex;
      }

      if (lastIndex < content.length) {
        segments.push({
          text: content.slice(lastIndex),
          style: fallbackStyle,
        });
      }

      return segments
        .filter((segment) => segment.text.length > 0)
        .map((segment, idx) => (
          <span key={`${keyPrefix}-${idx}`} style={segment.style}>
            {segment.text}
          </span>
        ));
    };

    return (text || '')
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line, index) => {
        const defaultTagRegex = /\[(default|latin)\]/i;
        const hasDefaultTag = defaultTagRegex.test(line);
        const cleanedLine = line.replace(defaultTagRegex, "").trim();

        const numbered = cleanedLine.match(/^(\(\d+\)\s*)(.*)$/);
        if (numbered) {
          const [, prefix, rest] = numbered;
          const useDefaultFont = hasDefaultTag || /^[\x00-\x7F]+$/.test(rest);
          const fallbackStyle = useDefaultFont ? undefined : mcqFontStyle;

          return (
            <div key={`${prefix}-${index}`} className={`whitespace-pre-wrap ${resourceTitleClasses}`}>
              <span className="font-sans">{prefix}</span>
              <span>{renderTaggedSegments(rest, fallbackStyle, `mcq-${index}-seg`)}</span>
            </div>
          );
        }

        const useDefaultFont = hasDefaultTag || /^[\x00-\x7F]+$/.test(cleanedLine);
        const fallbackStyle = useDefaultFont ? undefined : mcqFontStyle;

        return (
          <div
            key={`mcq-${index}`}
            className={`whitespace-pre-wrap ${resourceTitleClasses}`}
          >
            {renderTaggedSegments(cleanedLine, fallbackStyle, `mcq-${index}-seg`)}
          </div>
        );
      });
  };

  return (
    <section className={containerClasses}>
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 right-4 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-300/30 via-blue-500/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-gradient-to-br from-rose-300/25 via-violet-400/30 to-transparent blur-3xl" />
      </div>

      <div className="relative px-5 py-6 sm:px-8 sm:py-8 space-y-8">
        <div
          className={`flex flex-col gap-5 rounded-[26px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${controlShellClasses} backdrop-blur`}
        >
          <div>
            <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? 'text-gray-300' : 'text-slate-500'}`}>
              Learning Space
            </p>
            <h2 className="text-xl font-semibold tracking-tight">Navigate this lesson like a native</h2>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              Switch modes to explore details, transcripts, or resources.
            </p>
          </div>
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 p-1 text-xs font-semibold backdrop-blur-xl sm:text-sm">
            {tabs.map(({ id, label }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`relative mx-0.5 flex items-center gap-1 rounded-full px-4 py-1 transition-all ${
                    isActive ? activeTabClasses : inactiveTabClasses
                  }`}
                >
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-8 pt-4">
          {activeTab === 'overview' && (
            <div className={`${panelClasses} p-6 space-y-5`}>
              <div>
                <h3 className={`mb-2 text-lg font-semibold ${sectionTitleClasses}`}>Subscribe to LinkedIn Learning</h3>
                <p className={bodyTextClasses}>Get full access to all videos, exercise files, and certificates.</p>
              </div>
              <div className="space-y-3">
                <h4 className={`font-semibold ${sectionTitleClasses}`}>About this lesson</h4>
                <p className={bodyTextClasses}>
                  {currentLesson?.title}: {getVideoDescription()}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className={`font-semibold ${sectionTitleClasses}`}>Learning objectives</h4>
                <ul className={`list-inside list-disc space-y-2 ${bodyTextClasses}`}>
                  {getLearningObjectives().map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'notebook' && (
            <div className={`${panelClasses} p-6`}>
              <div className={`${placeholderClasses} p-6 text-center text-sm`}>
                Notebook features are coming soon.
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className={`${panelClasses} p-6 space-y-4`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h4 className={`font-semibold ${sectionTitleClasses}`}>Video Transcript</h4>
                <button className={`text-sm font-medium ${linkClasses}`}>Download PDF</button>
              </div>
              <div className="space-y-3">
                {getTranscriptSegments().map((segment, index) => (
                  <div key={index} className={transcriptRowClasses}>
                    <span className={`text-sm font-mono sm:min-w-[80px] ${transcriptTimeClasses}`}>
                      {segment.timestamp}
                    </span>
                    <p className={`text-sm leading-relaxed ${bodyTextClasses}`}>{segment.text}</p>
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
                    <div className={`${panelClasses} p-6`}>
                      <div className={`${placeholderClasses} p-6 text-center text-sm`}>
                        MCQ coming soon for this lesson.
                      </div>
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
                      <div className="mt-3 space-y-1 text-base font-semibold whitespace-pre-line">
                        {isMcq
                          ? renderMcqContent(resource.question || resource.title)
                          : (
                            <p className={resourceTitleClasses}>
                              {resource.question || resource.title}
                            </p>
                            )}
                      </div>
                      {resource.answer && (
                        <p
                          className={`mt-4 text-sm font-medium ${resourceAnswerClasses}`}
                          style={isMcq ? mcqFontStyle : undefined}
                        >
                          ✔ {resource.answer}
                        </p>
                      )}
                      {(resource.videoTimestamp || resource.videoUrl || resource.videoDuration) && (
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                          {resource.videoTimestamp && (
                            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${resourceMetaBadgeClasses} backdrop-blur`}>
                              ⏱ {resource.videoTimestamp}
                            </span>
                          )}
                          {resource.videoDuration && (
                            <span className={`text-xs font-medium ${resourceMetaTextClasses}`}>
                              Clip length: {resource.videoDuration}
                            </span>
                          )}
                          {resource.videoUrl && (
                            <a
                              href={resource.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs font-semibold uppercase tracking-wide ${linkClasses}`}
                            >
                              Watch clip ↗
                            </a>
                          )}
                        </div>
                      )}
                      {resource.tip && (
                        <p className={`mt-3 text-sm italic ${resourceTipClasses}`}>{resource.tip}</p>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          )}

          <div className={`${panelClasses} p-0`}>
            <ImageCarousel theme={theme} />
          </div>
          <div className={`${panelClasses} p-0`}>
            <PMICertificate theme={theme} />
          </div>
          <div className={`${panelClasses} p-0`}>
            <PosterShowcase theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
}
