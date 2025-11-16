import React from 'react';

export default function PMICertificate({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const cardClasses = isDark
    ? 'rounded-2xl border border-white/10 bg-gray-900/90 shadow-[0_25px_60px_rgba(0,0,0,0.55)]'
    : 'rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-slate-50/70 to-white/60 shadow-[0_45px_90px_rgba(15,23,42,0.2)]';
  const baseText = isDark ? 'text-gray-300' : 'text-gray-700';
  const headingText = isDark ? 'text-gray-100' : 'text-gray-900';
  const subHeadingText = isDark ? 'text-gray-400' : 'text-gray-600';
  const linkClasses = isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700';
  const certificateBorder = isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white';
  const certificateShadow = isDark ? 'shadow-[0_20px_45px_rgba(0,0,0,0.55)]' : 'shadow-lg';
  const statLogoText = isDark ? 'text-gray-400' : 'text-gray-600';
  const checkColor = isDark ? 'text-green-400' : 'text-green-600';

  return (
    <div className={`mx-auto max-w-5xl p-8 ${cardClasses}`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-shrink-0">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-900/50">
            <div className="text-center leading-tight">
              <div className="text-3xl font-bold">PM</div>
              <div className="text-[10px] uppercase">Authorized</div>
              <div className="text-[10px] uppercase">Training Partner</div>
            </div>
          </div>
        </div>

        <div className={`flex-1 space-y-4 ${baseText}`}>
          <div>
            <h2 className={`text-2xl font-semibold ${headingText}`}>Project Management Institute (PMI)®</h2>
            <p className="mt-1 text-lg">
              <span className="font-semibold">PDUs/Contact Hours:</span> 1
            </p>
          </div>
          <p>
            LinkedIn Learning has been reviewed and approved by the PMI® Authorized Training Partner Program. This course
            qualifies for professional development units (PDUs).
          </p>
          <p className={`text-sm ${subHeadingText}`}>
            The PMI Authorized Training Partner logo is a registered mark of the Project Management Institute, Inc.
          </p>
          <p>
            To view the activity and PDU details for this course, click
            <a href="#" className={`ml-1 font-medium ${linkClasses}`}>here</a>.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className={`text-2xl font-semibold ${headingText}`}>Shareable certificate</h3>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="flex-shrink-0">
            <div className={`relative h-56 w-80 rounded border-4 ${certificateBorder} p-6 ${certificateShadow}`}>
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-yellow-400 to-yellow-600" />
              <div className="absolute left-2 top-0 bottom-0 w-1 bg-gray-300/70" />
              <div className="absolute left-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-900/40">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="mt-20 text-center">
                <div className={`text-xs uppercase ${subHeadingText}`}>LinkedIn Learning</div>
                <div className={`mt-2 text-sm font-semibold ${headingText}`}>Certificate of Completion</div>
                <div className={`mt-4 text-xs ${subHeadingText}`}>Sample Course Name</div>
              </div>
            </div>
            <div className={`mt-3 text-sm ${subHeadingText}`}>
              Sample certificate · <a href="#" className={linkClasses}>Show all</a>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-3xl font-bold text-blue-600">
              <span>Linked</span>
              <span className="text-blue-700">in</span>
              <span className={`text-2xl ${statLogoText}`}>Learning</span>
            </div>
            <h4 className={`text-xl font-semibold ${headingText}`}>Certificate of Completion</h4>
            <div className={`space-y-3 text-sm ${baseText}`}>
              {[
                'Showcase on your LinkedIn profile under the "Licenses and Certificates" section.',
                'Download or print the certificate as a PDF to share with others.',
                'Share the certificate as an image online to demonstrate your skills.'
              ].map((text, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className={`mt-1 h-5 w-5 ${checkColor}`} viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
