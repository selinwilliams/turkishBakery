'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const productCategories = [
    { href: '/gallery', label: 'All Cakes' },
    { href: '/gallery?category=wedding', label: 'Wedding Cakes' },
    { href: '/gallery?category=birthday', label: 'Birthday Cakes' },
    { href: '/gallery?category=engagement', label: 'Engagement Cakes' },
    { href: '/gallery?category=catering', label: 'Catering' },
  ]
  const mainNavItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

   const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="text-2xl font-serif text-stone-900"
            onClick={handleLinkClick}
          >
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

            {/* Products Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                className={`font-medium transition-colors hover:text-amber-600 flex items-center ${
                  pathname.startsWith('/gallery') ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-700'
                }`}
              >
                Our Cakes
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-stone-200 rounded-lg shadow-lg py-2">
                  {productCategories.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-amber-600 transition-colors"
                    >
                      {item.label}
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
          <button 
            className="md:hidden text-stone-700 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-4">
            {/* Main Navigation Items */}
            <div className="space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`block px-4 py-3 text-lg font-medium transition-colors ${
                    pathname === item.href 
                      ? 'text-amber-600 bg-amber-50' 
                      : 'text-stone-700 hover:text-amber-600 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Our Cakes Section */}
              <div className="px-4 py-2">
                <div className="text-lg font-medium text-stone-900 mb-2">Our Cakes</div>
                <div className="space-y-1 ml-4">
                  {productCategories.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`block py-2 text-stone-600 hover:text-amber-600 transition-colors ${
                        pathname === item.href ? 'text-amber-600' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="px-4 pt-4 border-t border-stone-200 mt-4">
                <a
                  href="tel:+17138203443"
                  className="block w-full bg-stone-900 text-white text-center px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors"
                  onClick={handleLinkClick}
                >
                  📞 Order Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}