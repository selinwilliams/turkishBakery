// src/app/api/instagram/route.ts
import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { urlForImage } from '@/sanity/image'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'hobbyandgift'
  const limit = parseInt(searchParams.get('limit') || '8')

  // Curated professional bakery images
  try {
    // Fetch Instagram showcase posts from Sanity
    const query = `*[_type == "instagramShowcase" && isActive == true] | order(order asc) [0...${limit}] {
      _id,
      title,
      caption,
      image,
      order
    }`
    
    const showcasePosts = await client.fetch(query)
    
    // Transform to Instagram-like format
    const posts = showcasePosts.map((post: any, index: number) => ({
      id: post._id,
      media_url: post.image ? urlForImage(post.image).width(500).height(500).fit('crop').url() : null,
      permalink: `https://instagram.com/${username}`,
      caption: post.caption || `Beautiful creation from Sweet Creations`,
      media_type: 'IMAGE',
      title: post.title
    }))
    
    return NextResponse.json({ posts })
    
  } catch (error) {
    console.error('Failed to fetch Instagram showcase:', error)
    
    // Fallback to empty array
    return NextResponse.json({ posts: [] })
  }
}