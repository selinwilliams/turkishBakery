export interface Cake {
    _id: string
    title: string
    price: number
    description?: string
    category: 'birthday' | 'wedding' | 'engagement' | 'catering'
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
}