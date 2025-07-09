import { client } from '@/sanity/client'
import { Cake } from '@/types/cake'
import CakeCard from '@/components/CakeCard'

async function getCakes(): Promise<Cake[]> {
  const query = `*[_type == "cake"] | order(_createdAt desc)[0...6] {
    _id,
    title,
    price,
    description,
    category,
    image
  }`
  
  return await client.fetch(query)
}

export default async function HomePage() {
  const cakes = await getCakes()

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Beautiful Custom Cakes
        </h1>
        <p className="text-lg text-gray-600">
          Handcrafted with love for your special occasions
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Cakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cakes.map((cake) => (
            <CakeCard key={cake._id} cake={cake} />
          ))}
        </div>
      </section>
    </main>
  )
}