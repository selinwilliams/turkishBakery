'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const productCategories = [
    { href: { pathname: '/gallery' }, label: 'Menu', icon: '🎂' },
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
    setIsMobileOpen(false)
    setIsMobileProductsOpen(false)
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
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className={`font-medium px-3 py-2 rounded-md transition-colors ${
                pathname === '/' ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown - Click-based */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className={`font-medium px-3 py-2 rounded-md transition-colors flex items-center ${
                  pathname.startsWith('/gallery') || pathname.startsWith('/products')
                    ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                    : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
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
                  {productCategories.map((item) => {
                    const isGallery = pathname.startsWith('/gallery')
                    const qCat = searchParams?.get('category') || 'all'
                    const itemHrefObj = typeof item.href === 'string' ? { pathname: item.href } : item.href
                    const itemCat = (itemHrefObj as any).query?.category || 'all'
                    const isActive = (typeof item.href !== 'string' && isGallery && qCat === itemCat) || (!('query' in (itemHrefObj as any)) && pathname === (itemHrefObj as any).pathname)
                    const key = typeof item.href === 'string' ? item.href : `${itemHrefObj.pathname}?${new URLSearchParams((itemHrefObj as any).query || {}).toString()}`
                    return (
                      <Link
                        key={key}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`flex items-center px-6 py-3 transition-colors ${
                          isActive
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                      >
                      <span className="text-xl mr-4">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                      {item.href === '/products/catering' && (
                        <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          Services
                        </span>
                      )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`font-medium px-3 py-2 rounded-md transition-colors ${
                pathname === '/about' ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`font-medium px-3 py-2 rounded-md transition-colors ${
                pathname === '/contact' ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
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
            className="md:hidden text-stone-700"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white shadow-sm">
          <div className="container px-4 py-3 space-y-2">
            <Link href="/" onClick={handleLinkClick} className={`block py-2 px-2 rounded-md font-medium ${pathname === '/' ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`}>Home</Link>

            {/* Mobile Our Cakes accordion */}
            <button
              className="w-full flex items-center justify-between py-2 px-2 rounded-md font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700"
              onClick={() => setIsMobileProductsOpen((v) => !v)}
              aria-expanded={isMobileProductsOpen}
            >
              <span>Bakes and More</span>
              <svg className={`w-4 h-4 transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobileProductsOpen && (
              <div className="pl-4 space-y-2">
                {(() => {
                  const cat = searchParams?.get('category') || 'all'
                  const isGallery = pathname.startsWith('/gallery')
                  const linkCls = (active: boolean) => `block py-2 rounded-md ${
                    active ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
                  }`
                  return (
                    <>
                      <Link href={{ pathname: '/gallery' }} onClick={handleLinkClick} className={linkCls(isGallery && cat === 'all')}>🎂 Bakes and More</Link>
                      <Link href={{ pathname: '/gallery', query: { category: 'wedding' } }} onClick={handleLinkClick} className={linkCls(isGallery && cat === 'wedding')}>💒 Wedding Cakes</Link>
                      <Link href={{ pathname: '/gallery', query: { category: 'birthday' } }} onClick={handleLinkClick} className={linkCls(isGallery && cat === 'birthday')}>🎉 Birthday Cakes</Link>
                      <Link href={{ pathname: '/gallery', query: { category: 'engagement' } }} onClick={handleLinkClick} className={linkCls(isGallery && cat === 'engagement')}>💍 Engagement Cakes</Link>
                      <Link href={'/products/catering'} onClick={handleLinkClick} className={linkCls(pathname === '/products/catering')}>🍽️ Catering Services</Link>
                    </>
                  )
                })()}
              </div>
            )}

            <Link href="/about" onClick={handleLinkClick} className={`block py-2 px-2 rounded-md font-medium ${pathname === '/about' ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`}>About</Link>
            <Link href="/contact" onClick={handleLinkClick} className={`block py-2 px-2 rounded-md font-medium ${pathname === '/contact' ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'}`}>Contact</Link>
            <a href="tel:+1234567890" onClick={handleLinkClick} className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-full font-medium">📞 Order Now</a>
          </div>
        </div>
      )}
    </nav>
  )
}
