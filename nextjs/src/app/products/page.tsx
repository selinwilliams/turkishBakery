import Link from "next/link"


export default function ProductsPage() {
  return (
    <main className="container py-20">
      <h1 className="text-4xl font-serif font-light text-center mb-8 text-stone-900">
        All Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/products/cakes">🎂 Cakes</Link>
        <Link href="/products/pastries">🥐 Pastries</Link>
        <Link href="/products/cookies">🍪 Cookies</Link>
        <Link href="/products/catering">🍽️ Catering</Link>
      </div>
    </main>
  )
}