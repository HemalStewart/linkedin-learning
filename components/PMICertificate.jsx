import React from 'react';

export default function PMICertificate() {
  return (
    <div className="mx-auto max-w-5xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-shrink-0">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg">
            <div className="text-center leading-tight">
              <div className="text-3xl font-bold">PM</div>
              <div className="text-[10px] uppercase">Authorized</div>
              <div className="text-[10px] uppercase">Training Partner</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Project Management Institute (PMI)®</h2>
            <p className="mt-1 text-lg"><span className="font-semibold">PDUs/Contact Hours:</span> 1</p>
          </div>
          <p>
            LinkedIn Learning has been reviewed and approved by the PMI® Authorized Training Partner Program. This course qualifies for professional development units (PDUs).
          </p>
          <p className="text-sm text-gray-600">
            The PMI Authorized Training Partner logo is a registered mark of the Project Management Institute, Inc.
          </p>
          <p>
            To view the activity and PDU details for this course, click
            <a href="#" className="ml-1 text-blue-600 hover:text-blue-700">here</a>.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-900">Shareable certificate</h3>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="flex-shrink-0">
            <div className="relative h-56 w-80 rounded border-4 border-gray-200 bg-white p-6 shadow-lg">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-yellow-400 to-yellow-600" />
              <div className="absolute left-2 top-0 bottom-0 w-1 bg-gray-300" />
              <div className="absolute left-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="mt-20 text-center">
                <div className="text-xs uppercase text-gray-500">LinkedIn Learning</div>
                <div className="mt-2 text-sm font-semibold text-gray-700">Certificate of Completion</div>
                <div className="mt-4 text-xs text-gray-500">Sample Course Name</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              Sample certificate · <a href="#" className="text-blue-600 hover:text-blue-700">Show all</a>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 text-3xl font-bold text-blue-600">
              <span>Linked</span>
              <span className="text-blue-700">in</span>
              <span className="text-2xl text-gray-600">Learning</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900">Certificate of Completion</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p>Showcase on your LinkedIn profile under the "Licenses and Certificates" section.</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p>Download or print the certificate as a PDF to share with others.</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p>Share the certificate as an image online to demonstrate your skills.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
