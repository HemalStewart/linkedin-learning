import React from "react";
import { BookOpen, FileText } from "lucide-react";
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import ImageCarousel from '@/components/ImageCarousel';
import PMICertificate from '@/components/PMICertificate';

export default function VideoTabs({
  activeTab,
  setActiveTab,
  currentLesson,
  getVideoDescription,
  getLearningObjectives,
  getTranscriptSegments
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
            <div className="space-y-6 text-[15px] leading-relaxed text-gray-800">
              <div>
                <div className="flex flex-col gap-2 text-gray-800 sm:flex-row sm:items-start sm:gap-3">
                  <h2 className="text-lg font-bold text-gray-900">1.</h2>
                  <p className="flex-1 text-[15px]">
                    ආකිමිඩිස් මූල ධර්මය භාවිත කොට දී ඇති තෙල් වර්ගයක ඝනත්වය පරීක්ෂණාත්මකව නිර්ණය කිරීමට ඔබට නියමව ඇත.
                    පරීක්ෂණය සිදු කිරීම සඳහා රූපයේ පෙන්වා ඇති පරිදි තෙල් අඩංගු තුනී බිත්තියක් සහිත වීදුරු පරීක්ෂා නළයකින්
                    සහ ජලය සහිත පාරදෘශ්‍ය වීදුරු බඳුනකින් සමන්විත ඇටවුමක් සපයා ඇත.
                    රූපයේ පෙන්වා ඇති පරිදි පරීක්ෂා නළය ජලයේ සිරස්ව ඉපිලේ.
                    <b> P</b> හි දී නළයේ බිත්තිය වටා වර්ණවත් වළල්ලක් පැහැදිලි ලෙස සළකුණු කර ඇති අතර උස මැනීම සඳහා එය යොමුවක් ලෙසට භාවිත කළ හැක.
                    පහත සංකේත ඇටවුමට අදාළ විවිධ පරාමිති සඳහා පවරා ඇති අතර එම සංකේත ප්‍රශ්න වලට පිළිතුරු සැපයීම සඳහා භාවිත කරන්න.
                  </p>
                </div>

                <div className="mt-3 flex flex-col gap-6 sm:ml-4 lg:ml-6 lg:flex-row lg:items-start">
                  <ul className="flex-1 list-inside list-disc text-gray-700">
                    <li>A – වළල්ලට ඉහළ නළයේ හරස්කඩ වර්ගඵලය</li>
                    <li>V – වළල්ලට පහළ පරිමාව</li>
                    <li>l₁ – තෙල් කඳේ උස</li>
                    <li>l₂ – ජල කඳේ උස</li>
                    <li>M – හිස් නළයේ ස්කන්ධය</li>
                    <li>d – තෙලෙහි ඝනත්වය</li>
                    <li>d<sub>w</sub> – ජලයේ ඝනත්වය</li>
                  </ul>

                  <div className="w-full flex-shrink-0 lg:w-[300px]">
                    <img
                      src="/images/q1.png"
                      alt="Archimedes Principle Diagram"
                      className="w-full rounded-md object-contain"
                    />
                  </div>
                </div>

                <ol className="mt-6 space-y-4 md:ml-8" style={{ listStyle: 'none' }}>
                  <li className="relative pl-6 md:pl-8">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                      <span className="absolute left-0 font-semibold text-gray-900">(a)</span>
                      <p className="text-gray-800 sm:ml-2">
                        නළය තුළ ඇති තෙල්වල බර සඳහා ප්‍රකාශනයක් V, A, l₁, d සහ g ඇසුරෙන් ලියා දක්වන්න.
                      </p>
                    </div>
                    <div className="ml-6 mt-2 flex flex-col gap-2 sm:ml-8 sm:flex-row sm:items-end sm:justify-between">
                      <BlockMath math="(V + A l_1)\, d\, g" />
                      <span className="text-sm font-sans text-gray-700 not-italic">(ලකුණු 01)</span>
                    </div>
                  </li>

                  <li className="relative pl-6 md:pl-8">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                      <span className="absolute left-0 font-semibold text-gray-900">(b)</span>
                      <p className="text-gray-800 sm:ml-2">
                        තෙල් සමඟ නළයේ මුළු බර <InlineMath math="W" /> සඳහා ප්‍රකාශනයක් ලියා දක්වන්න.
                      </p>
                    </div>
                    <div className="ml-6 mt-2 flex flex-col gap-2 sm:ml-8 sm:flex-row sm:items-end sm:justify-between">
                      <BlockMath math="W = M g + (V + A l_1)\, d\, g" />
                      <span className="text-sm font-sans text-gray-700 not-italic">(ලකුණු 01)</span>
                    </div>
                  </li>

                  <li className="relative pl-6 md:pl-8">
                    <span className="absolute left-0 font-semibold text-gray-900">(d)</span>
                    <div className="ml-6 space-y-3">
                      <div className="relative mt-4 pl-8">
                        <div className="flex items-start">
                          <span className="absolute left-0 font-semibold text-gray-900">(i)</span>
                          <p className="ml-2 text-gray-800">
                            <InlineMath math="W" /> සහ <InlineMath math="U" /> අතර පවතින සම්බන්ධතාව කුමක්ද?
                          </p>
                        </div>
                        <div className="ml-8 mt-1 flex items-end justify-between">
                          <InlineMath math="W = U" />
                          <span className="text-sm font-sans text-gray-700 not-italic">(ලකුණු 01)</span>
                        </div>
                      </div>

                      <div className="relative mt-4 pl-8">
                        <div className="flex items-start">
                          <span className="absolute left-0 font-semibold text-gray-900">(ii)</span>
                          <p className="ml-2 text-gray-800">
                            නළය තුළ ඇති තෙල් මල්ල සම්බන්ධයෙන් <InlineMath math="U" /> යනු කුමක්ද?
                          </p>
                        </div>
                        <div className="ml-8 mt-1 flex items-end justify-between">
                          <InlineMath math="U = m g l_1" />
                          <span className="text-sm font-sans text-gray-700 not-italic">(ලකුණු 01)</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          )}
          <div className="pt-6 relative z-0">
            <ImageCarousel />
          </div>

          <div className="pt-6 px-10 sm:px-10">
            <PMICertificate />
          </div>
          <div className="pt-6">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
