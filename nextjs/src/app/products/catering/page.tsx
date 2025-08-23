// app/catering/page.tsx
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { CateringCategory, CateringInfo } from "@/types/catering";

async function getCateringData() {
  const categoriesQuery = `*[_type == "cateringCategory"] | order(order asc) {
    _id,
    title,
    icon,
    description,
    image,
    items[] {
      name,
      description,
      price,
      image
    },
    order
  }`;

  const infoQuery = `*[_type == "cateringInfo"][0] {
    _id,
    title,
    subtitle,
    heroImage,
    minimumOrder,
    advanceNotice,
    contactMessage
  }`;

  const [categories, info] = await Promise.all([
    client.fetch<CateringCategory[]>(categoriesQuery),
    client.fetch<CateringInfo>(infoQuery),
  ]);

  return { categories, info };
}

// Make this an async component
export default async function CateringPage() {
  // Actually fetch and use the data
  const { categories, info } = await getCateringData();
  console.log("Categories:", categories);
  console.log("Items in first category:", categories[0]?.items);
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-stone-50 py-20">
        {info?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src="/images/white-cake.jpg"
              alt="Catering background"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          <div className="absolute inset-0 bg-white/30"></div>
          </div>
        )}
        <div className="container text-center relative z-10">
          <h1 className="text-5xl font-serif font-light mb-6 text-stone-900">
            {info?.title || "Catering Services"}
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {info?.subtitle ||
              "Perfect for your special events, parties, and gatherings"}
          </p>
        </div>
      </section>

      {/* Dynamic Categories from Sanity */}
      <section className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-light mb-6 text-stone-900">
            Our Catering Menu
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            We offer a variety of delicious options for your events
          </p>
        </div>

        {/* Display categories from Sanity */}
        {categories && categories.length > 0 ? (
          <div className="space-y-20">
            {categories.map((category) => (
              <div key={category._id}>
                {/* Category Header */}
                <div className="text-center mb-12">
                  {category.icon && (
                    <div className="text-6xl mb-4">{category.icon}</div>
                  )}
                  <h3 className="text-3xl font-serif font-light text-stone-900 mb-4">
                    {category.title}
                  </h3>
                  {category.description && (
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Category Image (if exists) */}
                {category.image && (
                  <div className="mb-12 max-w-4xl mx-auto">
                    <div className="aspect-video relative rounded-2xl overflow-hidden h-64">
                      <Image
                        src={urlForImage(category.image)
                          .width(800)
                          .height(450)
                          .fit("crop")
                          .url()}
                        alt={category.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 800px"
                      />
                    </div>
                  </div>
                )}

                {/* Category Items */}
                {category.items && category.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {item.image && (
                          <div className="aspect-square relative relative overflow-hidden">
                            <Image
                              src={urlForImage(item.image)
                                .width(400)
                                .height(400)
                                .fit("crop")
                                .url()}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h4 className="text-xl font-semibold text-stone-900 mb-2">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-stone-600 mb-4 text-sm">
                              {item.description}
                            </p>
                          )}
                          {item.price && (
                            <div className="text-lg font-semibold text-amber-600">
                              {item.price}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-stone-500">
                      No items available in this category yet.
                    </p>
                    <p className="text-sm text-stone-400 mt-2">
                      Add items in Sanity Studio to display them here.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Fallback to your static categories if no Sanity data
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Your existing static categories as fallback */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center">
              <div className="text-6xl mb-6">🧁</div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">
                Sweets
              </h3>
              <p className="text-stone-600 mb-6">
                Delicious desserts and sweet treats for your special occasions
              </p>
              <p className="text-sm text-stone-400">
                Add categories in Sanity Studio to see your custom menu here.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center">
              <div className="text-6xl mb-6">🥟</div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">
                Appetizers
              </h3>
              <p className="text-stone-600 mb-6">
                Savory bites and appetizers to start your event perfectly
              </p>
              <p className="text-sm text-stone-400">
                Add categories in Sanity Studio to see your custom menu here.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center">
              <div className="text-6xl mb-6">🥗</div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">
                Salads
              </h3>
              <p className="text-stone-600 mb-6">
                Fresh and healthy salad options for balanced catering
              </p>
              <p className="text-sm text-stone-400">
                Add categories in Sanity Studio to see your custom menu here.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Keep your existing Pricing Section */}
      <section className="bg-stone-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-light text-center mb-12 text-stone-900">
              Catering Packages
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Small Events
                </h3>
                <p className="text-stone-600 mb-4">10-25 people</p>
                <p className="text-3xl font-bold text-amber-600 mb-4">
                  Starting at $150
                </p>
                <ul className="text-sm text-stone-600 space-y-1">
                  <li>• 3 appetizer varieties</li>
                  <li>• 2 dessert options</li>
                  <li>• Fresh salad</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center border-2 border-amber-200">
                <div className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Medium Events
                </h3>
                <p className="text-stone-600 mb-4">25-50 people</p>
                <p className="text-3xl font-bold text-amber-600 mb-4">
                  Starting at $300
                </p>
                <ul className="text-sm text-stone-600 space-y-1">
                  <li>• 5 appetizer varieties</li>
                  <li>• 3 dessert options</li>
                  <li>• 2 salad choices</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  Large Events
                </h3>
                <p className="text-stone-600 mb-4">50+ people</p>
                <p className="text-3xl font-bold text-amber-600 mb-4">
                  Custom Quote
                </p>
                <ul className="text-sm text-stone-600 space-y-1">
                  <li>• Unlimited varieties</li>
                  <li>• Custom menu design</li>
                  <li>• Special dietary options</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-stone-600 mb-6">
                {info?.contactMessage ||
                  "All packages include setup, serving utensils, and cleanup. Custom dietary accommodations available upon request."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-amber-600 transition-colors"
                >
                  Get Custom Quote
                </Link>
                <a
                  href="https://wa.me/1234567890?text=Hi! I'm interested in catering services for my event."
                  target="_blank"
                  className="bg-green-500 text-white px-8 py-4 rounded-full font-medium hover:bg-green-600 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
