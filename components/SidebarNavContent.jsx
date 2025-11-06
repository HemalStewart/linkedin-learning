import React from 'react';
import { QuestionMarkCircleIcon as HelpCircle } from '@heroicons/react/24/solid';

export default function SidebarNavContent({ navSections, collapsed = false }) {
  return (
    <div className="flex h-full flex-col">
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={sectionIndex === 0 ? 'mt-2' : 'mt-4'}>
            {!collapsed && section.title && (
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
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
                      item.active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`h-6 w-6 transition-colors duration-200 ${
                        item.active ? 'text-blue-600' : 'text-gray-500'
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
      <div className={`border-t border-gray-200 ${collapsed ? 'py-3' : 'px-3 py-4'}`}>
        <button
          type="button"
          className={`flex w-full items-center ${
            collapsed ? 'justify-center' : 'gap-3'
          } rounded-md px-3 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600`}
        >
          <HelpCircle className="h-6 w-6" />
          {!collapsed && <span>Help</span>}
        </button>
      </div>
    </div>
  );
}
