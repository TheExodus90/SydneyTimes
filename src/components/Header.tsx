'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-['UnifrakturCook'] text-gray-800">
          The Baulkham Gazette
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/category/politics" className="text-gray-600 hover:text-gray-900 font-['Cormorant_Garamond']">Politics</Link>
          <Link href="/category/technology" className="text-gray-600 hover:text-gray-900 font-['Cormorant_Garamond']">Technology</Link>
          <Link href="/category/science" className="text-gray-600 hover:text-gray-900 font-['Cormorant_Garamond']">Science</Link>
          <Link href="/category/culture" className="text-gray-600 hover:text-gray-900 font-['Cormorant_Garamond']">Culture</Link>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/category/politics" className="block text-gray-600 hover:text-gray-900 font-['Cormorant_Garamond']">Politics</Link>
            <Link href="/category/technology" className="block text-gray-600 hover:text-gray-900 font-['Cormorant_Garamond']">Technology</Link>
            <Link href="/category/science" className="block text-gray-600 hover:text-gray-900 font-['Cormorant_Garamond']">Science</Link>
            <Link href="/category/culture" className="block text-gray-600 hover:text-gray-900 font-['Cormorant_Garamond']">Culture</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
