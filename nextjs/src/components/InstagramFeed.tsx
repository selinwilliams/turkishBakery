'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
  media_type: string
}

interface InstagramFeedProps {
  username: string
  limit?: number
}

export default function InstagramFeed({ username, limit = 8 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // For now, we'll use placeholder data
  // Later we'll replace this with real Instagram API calls
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Placeholder posts - replace with real API call later
      const placeholderPosts = Array.from({ length: limit }, (_, i) => ({
        id: `post-${i}`,
        media_url: `/images/placeholder-instagram-${(i % 4) + 1}.jpg`,
        permalink: `https://instagram.com/p/placeholder${i}`,
        caption: `Beautiful cake creation #${i + 1}`,
        media_type: 'IMAGE'
      }))
      
      setPosts(placeholderPosts)
      setLoading(false)
    }, 1000)
  }, [limit])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-stone-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-stone-500">Unable to load Instagram posts</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group aspect-square relative overflow-hidden rounded-lg bg-stone-200"
        >
          {/* Placeholder for now - will be real Instagram images later */}
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <span className="text-white text-4xl group-hover:scale-110 transition-transform">
              📷
            </span>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm font-medium">View on Instagram</span>
          </div>
        </a>
      ))}
    </div>
  )
}