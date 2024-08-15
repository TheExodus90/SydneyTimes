'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
      };
      setCurrentTime(now.toLocaleString('en-US', options));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2 relative">
        <div className="absolute top-2 left-4 text-gray-600 text-sm font-['Cormorant_Garamond']">
          {currentTime}
        </div>
        <div className="flex flex-col items-center">
          <Link href="/" className="text-4xl font-['UnifrakturCook'] text-gray-800 text-center mb-1">
            The Baulkham Gazette
          </Link>
          <nav className="hidden md:flex space-x-4 mt-1">
            <Link href="/category/politics" className="text-gray-600 hover:text-gray-900 text-sm font-['Cormorant_Garamond']">Politics</Link>
            <Link href="/category/technology" className="text-gray-600 hover:text-gray-900 text-sm font-['Cormorant_Garamond']">Technology</Link>
            <Link href="/category/science" className="text-gray-600 hover:text-gray-900 text-sm font-['Cormorant_Garamond']">Science</Link>
            <Link href="/category/culture" className="text-gray-600 hover:text-gray-900 text-sm font-['Cormorant_Garamond']">Culture</Link>
          </nav>
          <button
            className="md:hidden mt-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2 bg-white shadow-md">
            <Link href="/category/politics" className="block text-gray-600 hover:text-gray-900 text-sm font-['Cormorant_Garamond']">Politics</Link>
            <Link href="/category/technology" className="block text-gray-600 hover:text-gray-900 text-sm font-['Cormorant_Garamond']">Technology</Link>
            <Link href="/category/science" className="block text-gray-600 hover:text-gray-900 text-sm font-['Cormorant_Garamond']">Science</Link>
            <Link href="/category/culture" className="block text-gray-600 hover:text-gray-900 text-sm font-['Cormorant_Garamond']">Culture</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
