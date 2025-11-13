import React from 'react';
import { ChevronLeftIcon as ChevronLeft } from '@heroicons/react/24/solid';
import SidebarNavContent from '@/components/SidebarNavContent';

export default function MainSidebar({ navSections, isCollapsed, onToggleCollapse, theme = 'light' }) {
  const isDark = theme === 'dark';
  const sidebarClasses = isDark
    ? 'border-gray-800 bg-gray-900 text-gray-100'
    : 'border-gray-200 bg-white text-gray-900';
  const buttonClasses = isDark
    ? 'rounded-full p-2 text-gray-300 transition-colors duration-200 hover:bg-gray-800'
    : 'rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-200';
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
