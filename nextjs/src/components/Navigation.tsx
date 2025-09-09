'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const productCategories = [
    { href: { pathname: '/gallery' }, label: 'All Cakes', icon: '🎂' },
    { href: { pathname: '/gallery', query: { category: 'wedding' } }, label: 'Wedding Cakes', icon: '💒' },
    { href: { pathname: '/gallery', query: { category: 'birthday' } }, label: 'Birthday Cakes', icon: '🎉' },
    { href: { pathname: '/gallery', query: { category: 'engagement' } }, label: 'Engagement Cakes', icon: '💍' },
    { href: '/products/catering', label: 'Catering Services', icon: '🍽️' },
  ] as const

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown when clicking a link
  const handleLinkClick = () => {
    setIsProductsOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="text-2xl font-serif text-stone-900">
            Sweet Creations
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors hover:text-amber-600 ${
                pathname === '/' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-700'
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown - Click-based */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={`font-medium transition-colors hover:text-amber-600 flex items-center ${
                  pathname.startsWith('/gallery') || pathname.startsWith('/products') 
                    ? 'text-amber-600 border-b-2 border-amber-600' 
                    : 'text-stone-700'
                }`}
              >
                Bakes & More
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    isProductsOpen ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-stone-200 rounded-lg shadow-lg py-3 z-50">
                  {productCategories.map((item) => (
                    <Link
                      key={typeof item.href === 'string' ? item.href : `${item.href.pathname}?${new URLSearchParams((item.href as any).query || {}).toString()}`}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center px-6 py-3 text-stone-700 hover:bg-stone-50 hover:text-amber-600 transition-colors"
                    >
                      <span className="text-xl mr-4">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      {item.href === '/products/catering' && (
                        <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          Services
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`font-medium transition-colors hover:text-amber-600 ${
                pathname === '/about' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-700'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`font-medium transition-colors hover:text-amber-600 ${
                pathname === '/contact' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-700'
              }`}
            >
              Contact
            </Link>
            
            {/* Call to Action */}
            <a
              href="tel:+17138203443"
              className="bg-stone-900 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-600 transition-colors"
            >
              📞 Order Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-stone-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

