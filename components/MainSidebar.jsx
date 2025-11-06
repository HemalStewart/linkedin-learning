import React from 'react';
import { ChevronLeftIcon as ChevronLeft } from '@heroicons/react/24/solid';
import SidebarNavContent from '@/components/SidebarNavContent';

export default function MainSidebar({ navSections, isCollapsed, onToggleCollapse }) {
  return (
    <aside
      className={`hidden flex-shrink-0 flex-col border-r border-gray-200 bg-white transition-all duration-300 lg:flex lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`flex px-3 py-4 ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="rounded-full p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100"
          aria-label="Toggle navigation width"
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      <SidebarNavContent navSections={navSections} collapsed={isCollapsed} />
    </aside>
  );
}
