export interface Product {
  _id: string
  title: string
  price?: number | string
  description?: string
  productType: 'cakes' | 'pastries' | 'cookies' | 'catering'
  category?: string
  image: {
    asset: {
      _ref: string
    }
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
  }
  featured?: boolean
}

// Keep the old interface for backward compatibility
export interface Cake extends Product {
  category: 'birthday' | 'wedding' | 'engagement' | 'catering'
}
