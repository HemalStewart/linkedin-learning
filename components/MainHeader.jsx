import React from 'react';
import {
  Bars3Icon as MenuIcon,
  MagnifyingGlassIcon as SearchIcon,
  UserCircleIcon as UserCircle,
  GlobeAltIcon as Globe,
  ChevronDownIcon as ChevronDown,
} from '@heroicons/react/24/solid';

export default function MainHeader({ onOpenMobileNav }) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100"
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <MenuIcon className="h-7 w-7" />
        </button>
        <div className="flex items-center gap-3 text-gray-900">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a66c2] text-lg font-bold uppercase text-white">
            in
          </div>
          <span className="text tracking-tight">Learning</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
        <button className="flex items-center gap-1 text-gray-700 transition-colors duration-150 hover:text-gray-900">
          <SearchIcon className="h-6 w-6" />
          <span className="hidden sm:inline">Search</span>
        </button>
        <button className="flex items-center gap-1 text-gray-700 transition-colors duration-150 hover:text-gray-900">
          <UserCircle className="h-6 w-6" />
          <span className="hidden sm:inline">Me</span>
          <ChevronDown className="h-6 w-6" />
        </button>
        <button className="relative flex items-center gap-1 text-gray-700 transition-colors duration-150 hover:text-gray-900">
          <Globe className="h-6 w-6" />
          <span className="hidden sm:inline">EN</span>
          <span className="absolute -top-1 -right-0 h-2 w-2 rounded-full bg-red-500" />
          <ChevronDown className="h-6 w-6" />
        </button>
        <button className="px-3 py-1 text-sm font-semibold text-gray-900 transition-colors duration-150 hover:border-gray-400 hover:text-gray-900">
          Start my free month
        </button>
      </div>
    </header>
  );
}
