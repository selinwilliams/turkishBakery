export interface CateringItem {
  name: string
  description?: string
  price?: string
  image?: {
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
}

export interface CateringCategory {
  _id: string
  title: string
  icon?: string
  description?: string
  image?: {
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
  items?: CateringItem[]
  order?: number
}

export interface CateringInfo {
  _id: string
  title: string
  subtitle?: string
  heroImage?: {
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
  minimumOrder?: string
  advanceNotice?: string
  contactMessage?: string
}