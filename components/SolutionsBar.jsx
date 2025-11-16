import React from 'react';

const solutionLinks = [
  { label: 'Business', href: '#business' },
  { label: 'Higher Education', href: '#higher-education' },
  { label: 'Government', href: '#government' },
];

export default function SolutionsBar({ theme = 'light' }) {
  const isDark = theme === 'dark';
  const wrapperClasses = isDark
    ? 'border-white/10 bg-slate-900/60 text-gray-200 backdrop-blur-2xl shadow-[0_12px_30px_rgba(2,6,23,0.6)]'
    : 'border-white/70 bg-gradient-to-r from-white/95 via-slate-50/75 to-white/60 text-gray-700 backdrop-blur-2xl shadow-[0_20px_35px_rgba(15,23,42,0.18)]';
  const labelClasses = isDark ? 'text-gray-100' : 'text-gray-900';
  const linkClasses = isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900';
  const actionClasses = isDark
    ? 'text-gray-100 hover:text-white'
    : 'text-gray-900 hover:text-gray-900';

  return (
    <div
      className={`flex h-9 w-full flex-shrink-0 items-center gap-2 border-b px-4 text-xs font-medium sm:gap-3 sm:px-6 lg:px-8 ${wrapperClasses}`}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className={`font-semibold ${labelClasses}`}>Solutions for:</span>
        {solutionLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`transition-colors duration-150 ${linkClasses}`}
          >
            {label}
          </a>
        ))}
      </div>
      <div className="ml-auto">
        <a
          href="#team"
          className={`inline-flex items-center justify-center px-3 py-1 text-xs font-semibold transition-colors duration-150 ${actionClasses}`}
        >
          Buy for my team
        </a>
      </div>
    </div>
  );
}
