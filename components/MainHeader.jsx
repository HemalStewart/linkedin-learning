import React from 'react';
import {
  Bars3Icon as MenuIcon,
  BellIcon as Bell,
  UserIcon as User,
  MagnifyingGlassIcon as SearchIcon,
} from '@heroicons/react/24/solid';

export default function MainHeader({ onOpenMobileNav }) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 lg:hidden"
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-sm font-semibold text-white">
            LL
          </div>
          <span className="hidden text-lg font-semibold text-gray-900 sm:block">LinkedIn Learning</span>
        </div>
      </div>
      <div className="relative hidden w-full max-w-md flex-1 items-center lg:flex">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for courses, skills, or topics..."
          className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-700 transition-all duration-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 lg:hidden">
          <SearchIcon className="h-5 w-5" />
        </button>
        <button className="relative rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600">
          <Bell className="h-6 w-6" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            2
          </span>
        </button>
        <button className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-blue-600">
          <User className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
