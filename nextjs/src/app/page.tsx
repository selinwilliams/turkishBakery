import { client } from "@/sanity/client";
import { Cake } from "@/types/product";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import InstagramFeed from "@/components/InstagramFeed";

async function getProducts(): Promise<Cake[]> {
  const query = `*[_type == "cake" || _type == "product"] {
    _id,
    _type,
    title,
    price,
    description,
    category,
    productType,
    image,
    featured
  }`;

  return await client.fetch(query);
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/white-cake.jpg"
          alt="Beautiful cake background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-white/60"></div> */}

        {/* Content */}
        <div className="container text-center relative z-20">
          <h1 className="text-6xl md:text-7xl font-serif font-light mb-6 text-stone-900">
            Beautiful Custom Cakes
          </h1>
          <p className="text-xl md:text-2xl text-stone-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Handcrafted with love for your special occasions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/gallery"
              className="bg-stone-900 text-white px-10 py-4 rounded-full font-medium hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
            >
              View Our Gallery
            </Link>
            <Link 
              href="/contact"
              className="bg-white/90 backdrop-blur-sm border-2 border-stone-900 text-stone-900 px-10 py-4 rounded-full font-medium hover:bg-stone-900 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Get Your Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <section className="container section-padding bg-white">
        <h2 className="text-4xl font-serif font-light text-center mb-16 text-stone-900">
          Featured Creations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((cake) => (
            <ProductCard key={cake._id} product={cake} />
          ))}
        </div>
      </section>

      {/* NEW: Instagram Section */}
      <section className="bg-stone-50 py-20">
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-serif font-light mb-6 text-stone-900">
        Follow Our Journey
      </h2>
      <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
        See our latest creations and behind-the-scenes moments on Instagram
      </p>
    </div>

    <InstagramFeed username="hobbyandgift" limit={8} />

    <div className="text-center mt-12">
      <a
        href="https://instagram.com/hobbyandgift" // Update with her real handle
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-2xl">📷</span>
        <span>@hobbyandgift</span>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Follow</span>
      </a>
    </div>
  </div>
</section>
    </main>
  );
}