'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import ProductCard from './ProductCard'

interface GalleryClientProps {
  products: Product[]
  initialCategory?: string
}

const categories = [
  { value: 'all', label: 'All Cakes', icon: '🎂' },
  { value: 'wedding', label: 'Wedding', icon: '💒' },
  { value: 'birthday', label: 'Birthday', icon: '🎉' },
  { value: 'engagement', label: 'Engagement', icon: '💍' },
  { value: 'catering', label: 'Catering', icon: '🍽️' },
]

export default function GalleryClient({ products, initialCategory = 'all' }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  // Keep selected category in sync when URL query changes
  useEffect(() => {
    setSelectedCategory(initialCategory)
  }, [initialCategory])

  const baseCategory = (val?: string) => {
    const v = (val || '').toLowerCase()
    if (v.includes('wedding')) return 'wedding'
    if (v.includes('birthday')) return 'birthday'
    if (v.includes('engagement')) return 'engagement'
    if (v.includes('catering')) return 'catering'
    if (v.includes('pastries')) return 'pastries'
    if (v.includes('cookies')) return 'cookies'
    return v.replace(/\s+/g, '-').replace(/-+$/, '')
  }


  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => {
        const cat = baseCategory(product.category)
        if (selectedCategory === 'catering') {
          return cat === 'catering' || product.productType === 'catering'
        }
        // For wedding/birthday/engagement, accept loose matches in category
        if (['wedding', 'birthday', 'engagement'].includes(selectedCategory)) {
          return cat === selectedCategory
        }
        return cat === selectedCategory
      })

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.value
                ? 'bg-stone-900 text-white shadow-lg transform scale-105'
                : 'bg-white text-stone-700 border-2 border-stone-200 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:scale-105'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.label}</span>
            {selectedCategory === category.value && (
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {filteredProducts.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Products Count & Sort */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-stone-600">
          <span className="font-medium text-stone-900">{filteredProducts.length}</span>
          {' '}
          {selectedCategory === 'all' ? 'products' : `${selectedCategory} cakes`} found
        </div>
        
        {/* Optional: Add sort dropdown later */}
        <div className="text-sm text-stone-500">
          Showing latest first
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product._id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🎂</div>
          <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">
            No {selectedCategory === 'all' ? 'products' : `${selectedCategory} cakes`} found
          </h3>
          <p className="text-stone-600 mb-8 max-w-md mx-auto">
            We don't have any {selectedCategory === 'all' ? 'products' : `${selectedCategory} cakes`} in our gallery yet. 
            Check back soon for new additions!
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  )
}
