import React from 'react';

const solutionLinks = [
  { label: 'Business', href: '#business' },
  { label: 'Higher Education', href: '#higher-education' },
  { label: 'Government', href: '#government' },
];

export default function SolutionsBar() {
  return (
    <div className="flex h-9 w-full flex-shrink-0 items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 text-xs font-medium text-gray-700 sm:gap-3 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="font-semibold text-gray-900">Solutions for:</span>
        {solutionLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-gray-700 transition-colors duration-150 hover:text-gray-900"
          >
            {label}
          </a>
        ))}
      </div>
      <div className="ml-auto">
        <a
          href="#team"
          className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-gray-900 transition-colors duration-150 hover:border-gray-400 hover:text-gray-900"
        >
          Buy for my team
        </a>
      </div>
    </div>
  );
}
