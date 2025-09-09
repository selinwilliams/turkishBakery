import Image from 'next/image'
import { Product } from '@/types/product'
import { urlForImage } from '@/sanity/image'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image 
    ? urlForImage(product.image).width(400).height(300).url()
    : '/images/white-cake.jpg'

  const formattedPrice = typeof product.price === 'number'
    ? `$${product.price}`
    : (product.price || '')

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-stone-200">
      <div className="relative h-64">
        {product.image ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center">
            <span className="text-stone-400 text-lg">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-serif text-stone-900">{product.title}</h3>
          {formattedPrice && (
            <span className="text-lg font-semibold text-amber-600">
              {formattedPrice}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 mb-3">
          {product.productType && (
            <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
              {product.productType}
            </span>
          )}
          {product.category && (
            <span className="inline-block bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-full font-medium">
              {product.category.replace('-', ' ')}
            </span>
          )}
        </div>
        
        {product.description && (
          <p className="text-stone-600 text-sm leading-relaxed">
            {product.description}
          </p>
        )}
      </div>
    </div>
  )
}
