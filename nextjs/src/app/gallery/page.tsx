import { client } from "@/sanity/client";
import { Cake } from "@/types/product";
import GalleryClient from "@/components/GalleryClient";
import Image from "next/image";

async function getAllProducts(): Promise<Cake[]> {
  const query = `*[_type == "cake" || _type == "product"] | order(_createdAt desc) {
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

export default async function GalleryPage() {
  const products = await getAllProducts();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="/images/white-cake.jpg"
          alt="Gallery background"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Stronger overlay for readability */}
        <div className="absolute inset-0 bg-white/30"></div>

        <div className="container text-center relative z-10">
          <h1 className="text-5xl font-serif font-light mb-6 text-stone-900">
            Our Gallery
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Browse our collection of handcrafted cakes and treats, each one
            uniquely designed for special moments
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="container py-16">
        <GalleryClient products={products} />
      </section>
    </main>
  );
}
