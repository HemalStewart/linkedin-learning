import React from 'react';
import { ChevronLeftIcon as ChevronLeft } from '@heroicons/react/24/solid';
import SidebarNavContent from '@/components/SidebarNavContent';

export default function MainSidebar({ navSections, isCollapsed, onToggleCollapse, theme = 'light' }) {
  const isDark = theme === 'dark';
  const sidebarClasses = isDark
    ? 'border-white/10 bg-slate-900/70 text-gray-100 backdrop-blur-2xl shadow-[0_20px_50px_rgba(2,6,23,0.65)]'
    : 'border-white/70 bg-gradient-to-br from-white/95 via-slate-50/80 to-white/65 text-gray-900 backdrop-blur-2xl shadow-[0_30px_60px_rgba(15,23,42,0.18)]';
  const buttonClasses = isDark
    ? 'rounded-full p-2 text-gray-200 transition-colors duration-200 hover:bg-white/10'
    : 'rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-900/5';
  return (
    <aside
      className={`hidden flex-shrink-0 flex-col border-r transition-all duration-300 lg:flex lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto ${sidebarClasses} ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`flex px-3 py-4 ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
        <button
          type="button"
          onClick={onToggleCollapse}
          className={buttonClasses}
          aria-label="Toggle navigation width"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      <SidebarNavContent navSections={navSections} collapsed={isCollapsed} theme={theme} />
    </aside>
  );
}
