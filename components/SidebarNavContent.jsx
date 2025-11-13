import React from 'react';
import { QuestionMarkCircleIcon as HelpCircle } from '@heroicons/react/24/solid';

export default function SidebarNavContent({ navSections, collapsed = false, theme = 'light' }) {
  const isDark = theme === 'dark';
  const sectionTitleClasses = isDark ? 'text-gray-400' : 'text-gray-500';
  const activeClasses = isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900';
  const idleClasses = isDark
    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
  const iconActiveClasses = isDark ? 'text-white' : 'text-gray-900';
  const iconIdleClasses = isDark ? 'text-gray-400' : 'text-gray-500';
  const footerBorder = isDark ? 'border-gray-800' : 'border-gray-200';
  const footerButtonClasses = isDark
    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';

  return (
    <div className={`flex h-full flex-col ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={sectionIndex === 0 ? 'mt-2' : 'mt-4'}>
            {!collapsed && section.title && (
              <h3 className={`mb-2 text-xs font-semibold uppercase tracking-wider ${sectionTitleClasses}`}>
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <button
                    type="button"
                    className={`flex w-full items-center ${
                      collapsed ? 'justify-center' : 'gap-3'
                    } rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      item.active ? activeClasses : idleClasses
                    }`}
                  >
                    <item.icon
                      className={`h-6 w-6 transition-colors duration-200 ${
                        item.active ? iconActiveClasses : iconIdleClasses
                      }`}
                    />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className={`border-t ${footerBorder} ${collapsed ? 'py-3' : 'px-3 py-4'}`}>
        <button
          type="button"
          className={`flex w-full items-center ${
            collapsed ? 'justify-center' : 'gap-3'
          } rounded-md px-3 py-2 text-sm transition-colors duration-200 ${footerButtonClasses}`}
        >
          <HelpCircle className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          {!collapsed && <span>Help</span>}
        </button>
      </div>
    </div>
  );
}
