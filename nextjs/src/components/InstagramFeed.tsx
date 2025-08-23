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

  useEffect(() => {
    async function fetchInstagramPosts() {
      try {
        setLoading(true)
        const response = await fetch(`/api/instagram?username=${username}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        setPosts(data.posts.slice(0, limit))
        
      } catch (err) {
        setError('Unable to load Instagram posts')
        console.error('Instagram fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [username, limit])

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
        <p className="text-stone-500">{error}</p>
        <p className="text-sm text-stone-400 mt-2">
          Follow us on Instagram @{username}
        </p>
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
          className="group aspect-square relative overflow-hidden rounded-lg bg-stone-200 hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={post.media_url}
            alt={post.caption || 'Instagram post'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-center text-white">
              <span className="text-2xl mb-2 block">📷</span>
              <span className="text-sm font-medium">View on Instagram</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}