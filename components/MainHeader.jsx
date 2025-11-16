import React from 'react';
import {
  Bars3Icon as MenuIcon,
  MagnifyingGlassIcon as SearchIcon,
  UserCircleIcon as UserCircle,
  GlobeAltIcon as Globe,
  ChevronDownIcon as ChevronDown,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/solid';

export default function MainHeader({ onOpenMobileNav, theme = 'light', onToggleTheme }) {
  const isDark = theme === 'dark';
  const headerClasses = isDark
    ? 'border-white/10 bg-slate-900/70 text-slate-100 backdrop-blur-2xl shadow-[0_10px_40px_rgba(2,6,23,0.55)]'
    : 'border-white/60 bg-gradient-to-br from-white/95 via-slate-50/80 to-white/70 text-slate-900 backdrop-blur-2xl shadow-[0_20px_45px_rgba(15,23,42,0.15)]';
  const iconButtonBase =
    'rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur';
  const iconButtonStyles = isDark
    ? `${iconButtonBase} text-gray-200 hover:bg-white/10 focus:ring-white/30 focus:ring-offset-slate-900/40`
    : `${iconButtonBase} text-gray-600 hover:bg-slate-900/5 focus:ring-slate-400/40 focus:ring-offset-white/60`;
  const textButtonClasses = isDark
    ? 'text-gray-200 hover:text-white'
    : 'text-gray-700 hover:text-gray-900';
  const accentButtonClasses = isDark
    ? 'px-3 py-1 text-sm font-semibold text-gray-100 transition-colors duration-150 hover:text-white/90 bg-white/10 rounded-full backdrop-blur border border-white/20'
    : 'px-3 py-1 text-sm font-semibold text-gray-900 transition-colors duration-150 hover:text-gray-900 bg-gradient-to-r from-white/95 via-slate-50/60 to-white/70 rounded-full backdrop-blur border border-white/70';
  const themeButtonClasses = isDark
    ? 'flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-100 transition-colors hover:bg-white/20 backdrop-blur'
    : 'flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-gray-800 transition-colors hover:bg-white/90 backdrop-blur';

  return (
    <header className={`flex h-14 items-center justify-between border-b px-4 ${headerClasses}`}>
      <div className="flex items-center gap-5">
        <button
          type="button"
          className={iconButtonStyles}
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <MenuIcon className="h-7 w-7" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a66c2] text-lg font-bold uppercase text-white shadow-lg shadow-[#0a66c2]/30">
            in
          </div>
          <span className={`tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Learning</span>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm font-medium">
        <button className={`flex items-center gap-1 transition-colors duration-150 ${textButtonClasses}`}>
          <SearchIcon className="h-6 w-6" />
          <span className="hidden sm:inline">Search</span>
        </button>
        <button className={`flex items-center gap-1 transition-colors duration-150 ${textButtonClasses}`}>
          <UserCircle className="h-6 w-6" />
          <span className="hidden sm:inline">Me</span>
          <ChevronDown className="h-6 w-6" />
        </button>
        <button className={`relative flex items-center gap-1 transition-colors duration-150 ${textButtonClasses}`}>
          <Globe className="h-6 w-6" />
          <span className="hidden sm:inline">EN</span>
          <span className="absolute -top-1 -right-0 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
          <ChevronDown className="h-6 w-6" />
        </button>
        <button className={accentButtonClasses}>
          Start my free month
        </button>
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className={themeButtonClasses}
            aria-label="Toggle color theme"
          >
            {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
        )}
      </div>
    </header>
  );
}
