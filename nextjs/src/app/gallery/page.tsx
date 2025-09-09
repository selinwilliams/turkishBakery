import { client } from "@/sanity/client";
import { Product } from "@/types/product";
import GalleryClient from "@/components/GalleryClient";
import Image from "next/image";

export const revalidate = 0;

async function getAllProducts(): Promise<Product[]> {
  const productsQuery = `*[_type == "product"] | order(_createdAt desc) {
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


  // Flatten catering items to look like products for the gallery
  const cateringItemsQuery = `*[_type == "cateringCategory"]{
    _id,
    items[]{
      _key,
      name,
      description,
      // prefer basePrice; sometimes price may be string in older content
      "price": coalesce(basePrice, price),
      image
    }
  }`;

  const [products, cateringCats] = await Promise.all([
    client.fetch(productsQuery),
    client.fetch(cateringItemsQuery),
  ]);

  const cateringMapped: Product[] = (cateringCats || []).flatMap((cat: any) =>
    (cat.items || []).map((item: any, idx: number) => ({
      _id: `catering:${cat._id}:${item._key || idx}`,
      title: item.name,
      price: item.price,
      description: item.description,
      productType: 'catering',
      category: 'catering',
      image: item.image,
      featured: false,
    }))
  );

  // Merge: products first, then catering items
  return [...products, ...cateringMapped] as Product[];
}

export default async function GalleryPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const products = await getAllProducts();
  const initialCategory = typeof searchParams?.category === 'string' ? searchParams?.category : 'all';

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
        {/* Remount client component when category changes to avoid stale state */}
        <GalleryClient key={initialCategory} products={products} initialCategory={initialCategory} />
      </section>
    </main>
  );
}
