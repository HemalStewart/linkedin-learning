import React from "react";
import { BookOpen, FileText } from "lucide-react";
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

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
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="flex flex-wrap justify-center gap-3 px-4 py-2 sm:gap-4 sm:px-6">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`inline-flex shrink-0 flex-col items-center justify-center gap-1 rounded-md px-3 py-2 text-xs font-medium text-center transition-colors sm:flex-row sm:gap-2 sm:px-4 sm:text-sm ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
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
      <div className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Subscribe to LinkedIn Learning</h3>
                    <p className="text-gray-600">Get full access to all videos, exercise files, and certificates.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">About this lesson</h4>
                    <p className="text-gray-700">
                      {currentLesson?.title}: {getVideoDescription()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Learning objectives</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {getLearningObjectives().map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'notebook' && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-semibold text-gray-900">My Notes</h4>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                      Add Note
                    </button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your notes will appear here as you take them during the course.</p>
                    <p className="text-gray-400 text-sm mt-2">Click timestamps to add time-based notes</p>
                  </div>
                </div>
              )}

              {activeTab === 'transcript' && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="font-semibold text-gray-900">Video Transcript</h4>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Download PDF
                    </button>
                  </div>
                  <div className="space-y-3">
                    {getTranscriptSegments().map((segment, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 rounded p-3 hover:bg-gray-50 sm:flex-row sm:items-start sm:gap-3"
                      >
                        <span className="text-blue-600 text-sm font-mono sm:min-w-[70px]">
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

              {/* Resources */}
{activeTab === 'resources' && (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 leading-relaxed text-gray-800">
    <div className="space-y-6 text-[15px]">
      {/* Question 1 */}
      <div>
        {/* Main question with number inline */}
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

        {/* Bullets + Image */}
        <div className="mt-3 flex flex-col gap-6 sm:ml-4 lg:ml-6 lg:flex-row lg:items-start">
          <ul className="list-disc list-inside flex-1 text-gray-700">
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
              className="rounded-md w-full object-contain"
            />
          </div>
        </div>

        {/* Sub-questions */}
        <ol className="mt-6 space-y-4 md:ml-8" style={{ listStyle: 'none' }}>
          {/* (a) */}
          <li className="relative pl-6 md:pl-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
              <span className="absolute left-0 font-semibold text-gray-900">(a)</span>
              <p className="text-gray-800 sm:ml-2">
                නළය තුළ ඇති තෙල්වල බර සඳහා ප්‍රකාශනයක් V, A, l₁, d සහ g ඇසුරෙන් ලියා දක්වන්න.
              </p>
            </div>
            <div className="ml-6 mt-2 flex flex-col gap-2 sm:ml-8 sm:flex-row sm:items-end sm:justify-between">
              <BlockMath math="(V + A l_1)\, d\, g" />
              <span className="text-gray-700 text-sm font-sans not-italic">(ලකුණු 01)</span>
            </div>
          </li>

          {/* (b) */}
          <li className="relative pl-6 md:pl-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
              <span className="absolute left-0 font-semibold text-gray-900">(b)</span>
              <p className="text-gray-800 sm:ml-2">
                තෙල් සමඟ නළයේ මුළු බර <InlineMath math="W" /> සඳහා ප්‍රකාශනයක් ලියා දක්වන්න.
              </p>
            </div>
            <div className="ml-6 mt-2 flex flex-col gap-2 sm:ml-8 sm:flex-row sm:items-end sm:justify-between">
              <BlockMath math="W = M g + (V + A l_1)\, d\, g" />
              <span className="text-gray-700 text-sm font-sans not-italic">(ලකුණු 01)</span>
            </div>
          </li>

          {/* (d) */}
          <li className="relative pl-6 md:pl-8">
            <span className="absolute left-0 font-semibold text-gray-900">(d)</span>
            <div className="space-y-3 ml-6">
              
              {/* (i) */}
              <div className="relative pl-8 mt-4">
                <div className="flex items-start">
                  <span className="absolute left-0 font-semibold text-gray-900">(i)</span>
                  <p className="text-gray-800 ml-2">
                    <InlineMath math="W" /> සහ <InlineMath math="U" /> අතර පවතින සම්බන්ධතාව කුමක්ද?
                  </p>
                </div>
                <div className="flex justify-between items-end ml-8 mt-1">
                  <BlockMath math="W = U" />
                  <span className="text-gray-700 text-sm font-sans not-italic">(ලකුණු 01)</span>
                </div>
              </div>

              {/* (ii) */}
              <div className="relative pl-8 mt-4">
  <div className="flex items-start">
    <span className="absolute left-0 font-semibold text-gray-900">(ii)</span>
    <p className="text-gray-800 ml-2">
      <InlineMath math="l_2 = m l_1 + c" /> ආකාරයේ සම්බන්ධතාවක් ලබා ගැනීම සඳහා ඉහත 
      <b> (d)(i)</b> හි ඔබ දුන් සම්බන්ධතාවයේ <InlineMath math="W" /> සහ <InlineMath math="U" /> හි ඇති පරාමිති සකසන්න.
    </p>
  </div>

  {/* All equations vertically aligned */}
  <div className="ml-6 mt-2">
    <div className="flex flex-col items-start space-y-1">
      <BlockMath math="M g + (V + A l_1)\, d\, g = (V + A l_2)\, d_w\, g" />
      <BlockMath math="M + Vd + A l_1 d = V d_w + A l_2 d_w" />
      <div className="flex justify-between w-full items-end">
        <BlockMath math="l_2 = \frac{d}{d_w} l_1 + \frac{M + Vd - Vd_w}{A d_w}" />
        <span className="text-gray-700 text-sm font-sans not-italic ml-4">(ලකුණු 01)</span>
      </div>
    </div>
  </div>
</div>

              {/* (iii) */}
              <div className="relative pl-8 mt-4">
                <div className="flex items-start">
                  <span className="absolute left-0 font-semibold text-gray-900">(iii)</span>
                  <p className="text-gray-800 ml-2">
                    ඉහත <b>(d)(ii)</b> හි ලබා ගත් සම්බන්ධතාව භාවිත කර සුදුසු ප්‍රස්ථාරයක් ඇඳි විට 
                    එම ප්‍රස්ථාරය මගින් තෙලෙහි ඝනත්වය <InlineMath math="d" /> ඔබ නිර්ණය කරන්නේ කෙසේද?
                  </p>
                </div>

                <div className="ml-6 mt-2 space-y-2 italic text-gray-700">
                  <p>(ප්‍රස්ථාරයේ) අනුක්‍රමණය <InlineMath math="d_w" /> මගින්/ ජලයේ ඝනත්වයෙන් ගුණ කිරීම</p>
                  <div className="flex justify-between items-end">
                    <BlockMath math="d = (\text{අනුක්‍රමණය}) \times d_w" />
                    <span className="text-gray-700 text-sm font-sans not-italic">(ලකුණු 01)</span>
                  </div>
                  <p>(අනුක්‍රමණය පමණක් ලිවීමට ලකුණු නැත.)</p>
                </div>
              </div>
            </div>
          </li>

          {/* (e) */}
          <li className="relative pl-6 md:pl-8">
            <span className="absolute left-0 font-semibold text-gray-900">(e)</span>
            <p className="ml-2 text-gray-800">
              ඔබගේ පරිසරයට සමාන පරීක්ෂණ මිනුම් උපකරණ දී ඇත. මීටර භාගයේ කෝදුවක්, වර්නියර් කැලිපරයක් සහ චල අන්වීක්ෂයක්.
            </p>

            <div className="space-y-4 ml-6 mt-3">
              {/* (i) */}
              <div className="relative pl-6 md:pl-8">
                <span className="absolute left-0 font-semibold text-gray-900">(i)</span>
                <p className="ml-2 text-gray-800">
                  දී ඇති උපකරණ අතුරෙන් <InlineMath math="l_1" /> සහ <InlineMath math="l_2" /> මැනීමට වඩාත් සුදුසු උපකරණය කුමක්ද?
                </p>
                <div className="flex justify-between items-end ml-6 mt-2">
                  <p><b>චල අන්වීක්ෂය</b></p>
                  <span className="text-gray-700 text-sm font-sans not-italic">(ලකුණු 01)</span>
                </div>
              </div>

              {/* (ii) */}
              <div className="relative pl-8 mt-4">
                <span className="absolute left-0 font-semibold text-gray-900">(ii)</span>
                <p className="ml-2 text-gray-800">
                  ඔබ <b>(e)(i)</b> යටතේ සඳහන් කළ උපකරණය භාවිත කර 
                  <InlineMath math="l_1" /> සහ <InlineMath math="l_2" /> මැනීමට අදාළ පාඨාංක ලබා ගන්නේ කෙසේද?
                </p>
                <div className="ml-6 mt-2 space-y-2 text-gray-700">
                  <p>චල අන්වීක්ෂයේ තිරස් හරස් කම්බිය වළල්ලට / P ලක්ෂ්‍යයට නාභිගත කර පාඨාංක ලබා ගන්න.</p>
                  <p>ඉන්පසු ජලය සහ තෙල් මාවක මට්ටම් වලට නාභිගත කර අනුරූප පාඨාංක ලබා ගන්න.</p>
                  <p className="italic text-gray-600">{'{දෙකම සඳහා}'}</p>
                  <div className="flex justify-end">
                    <span className="text-gray-700 text-sm font-sans not-italic">(ලකුණු 01)</span>
                  </div>
                </div>
              </div>
            </div>
          </li>

          {/* (f) */}
          <li className="relative pl-6 md:pl-8">
            <span className="absolute left-0 font-semibold text-gray-900">(f)</span>
            <p className="ml-2 text-gray-800">
              පරීක්ෂා නළයේ බිත්තිය සිහින් වෙනුවට ඝනකම් වූයේ නම් ඔබ <b>(d)(ii)</b> හි ලබා ගත් ප්‍රකාශනයෙහි
              <InlineMath math="m" />ට අනුරූප ප්‍රකාශනය <InlineMath math="m = \frac{A_i d}{A_e d_w}" /> ලෙස ලැබේ.
            </p>

            <div className="space-y-4 ml-6 mt-3">
              {/* (i) */}
              <div className="relative pl-6 md:pl-8">
                <span className="absolute left-0 font-semibold text-gray-900">(i)</span>
                <p className="ml-2 text-gray-800">
                  <InlineMath math="A_i" /> සහ <InlineMath math="A_e" /> නිර්ණය කිරීම සඳහා ඔබ ලබා ගත යුතු මිනුම් කවරේද?
                </p>
                <div className="ml-6 mt-2 text-gray-700 space-y-2">
                  <p><InlineMath math="A_i" /> සඳහා : (නළයේ) අභ්‍යන්තර විෂ්කම්භය (<InlineMath math="x_i" /> යැයි සිතමු)</p>
                  <p><InlineMath math="A_e" /> සඳහා : (නළයේ) බාහිර විෂ්කම්භය (<InlineMath math="x_e" /> යැයි සිතමු)</p>
                  <p className="italic text-gray-600">{'{පිළිතුරු දෙකම සඳහා}'}</p>
                  <div className="flex justify-end">
                    <span className="text-gray-700 text-sm font-sans not-italic">(ලකුණු 01)</span>
                  </div>
                </div>
              </div>

              {/* (ii) */}
              <div className="relative pl-8 mt-4">
                <span className="absolute left-0 font-semibold text-gray-900">(ii)</span>
                <p className="ml-2 text-gray-800">
                  <InlineMath math="x_i" /> සහ <InlineMath math="x_e" /> මිනුම් ලබා ගැනීම සඳහා ඉහත 
                  <b>(e)</b> හි දී සඳහන් උපකරණ භාවිත කරන්නේ කෙසේද?
                </p>
                <div className="ml-6 mt-2 text-gray-700 space-y-2">
                  <p><InlineMath math="x_i" /> මැනීමට : (වර්නියර් කැලිපරයේ) අභ්‍යන්තර හනු භාවිතයෙන්</p>
                  <p><InlineMath math="x_e" /> මැනීමට : (වර්නියර් කැලිපරයේ) බාහිර හනු භාවිතයෙන්</p>
                  <p className="italic text-gray-600">{'{පිළිතුරු දෙකම සඳහා}'}</p>
                  <div className="flex justify-end">
                    <span className="text-gray-700 text-sm font-sans not-italic">(ලකුණු 01)</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
)}

            </div>

            {/* Sidebar section */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg text-white">
                <h3 className="font-bold text-lg mb-2">Live office hours with experts</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Event</span>
                  <button className="text-blue-200 hover:text-white text-sm font-medium">
                    Show all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
