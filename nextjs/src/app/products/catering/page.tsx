// app/catering/page.tsx
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { CateringCategory, CateringInfo } from "@/types/catering";

// Ensure fresh data on each request (no caching)
export const revalidate = 0;

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
      // Project basePrice to price for UI compatibility
      "price": coalesce(price, string(basePrice)),
      image
    },
    order
  }`;

  const infoQuery = `*[_type == "cateringInfo"][0] {
    _id,
    title,
    subtitle,
    heroImage,
    highlightTitle,
    highlightSubtitle,
    highlightImages,
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

export default async function CateringPage() {
  const { categories, info } = await getCateringData();
  const sweets = categories?.find(
    (c) => c.title?.toLowerCase() === "sweets"
  );
  const appetizers = categories?.find(
    (c) => c.title?.toLowerCase() === "appetizers"
  );

  // Use only curated highlight images from Sanity to avoid duplication
  const galleryImages = (info?.highlightImages || []).slice(0, 8);
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-stone-50 py-20">
        <div className="absolute inset-0">
          <Image
            src={info?.heroImage
              ? urlForImage(info.heroImage).width(1920).height(700).fit("crop").url()
              : "/images/catering-hero.jpg"}
            alt="Catering background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/30" />
        </div>
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

      {/* Curated Highlights (optional) */}
      {galleryImages.length > 0 && (
        <section className="container py-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-light text-stone-900">
              {info?.highlightTitle || 'A Taste Of Our Menu'}
            </h2>
            { (info?.highlightSubtitle || '').length > 0 && (
              <p className="text-stone-600">{info?.highlightSubtitle}</p>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden rounded-2xl border border-stone-200">
                <Image
                  src={urlForImage(img).width(600).height(600).fit("crop").url()}
                  alt="Catering item"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dynamic Categories from Sanity */}
      <section className="container py-16">
        {/* Quick anchor nav for sections */}
        <div className="flex justify-center gap-3 mb-8">
          <a href="#sweets" className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100">Sweets</a>
          <a href="#appetizers" className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100">Appetizers</a>
        </div>
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-light text-stone-900">
            Our Catering Menu
          </h2>
          <p className="text-lg text-stone-600">
            Sweet treats and savory bites for every occasion
          </p>
        </div>

        {/* Sweets Section */}
        <div id="sweets" className="mb-16 scroll-mt-24">
          <div className="mb-6 text-center">
            <h3 className="text-3xl font-serif font-light text-stone-900 flex items-center justify-center gap-3">
              <span>{sweets?.icon || "🧁"}</span>
              Sweets
            </h3>
            {sweets?.description && (
              <p className="text-stone-600 mt-2 max-w-2xl mx-auto">
                {sweets.description}
              </p>
            )}
          </div>

          {sweets?.items?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sweets.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                  {item.image && (
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={urlForImage(item.image).width(600).height(600).fit("crop").url()}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-lg font-semibold text-stone-900">{item.name}</h4>
                      {item.price && (
                        <span className="text-amber-700 font-semibold whitespace-nowrap">{item.price}</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-stone-600 mt-2 line-clamp-3">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-stone-500 text-center py-8">Add sweets in Sanity to see them here.</div>
          )}
        </div>

        {/* Appetizers Section */}
        <div id="appetizers" className="mt-20 scroll-mt-24">
          <div className="mb-6 text-center">
            <h3 className="text-3xl font-serif font-light text-stone-900 flex items-center justify-center gap-3">
              <span>{appetizers?.icon || "🥟"}</span>
              Appetizers
            </h3>
            {appetizers?.description && (
              <p className="text-stone-600 mt-2 max-w-2xl mx-auto">
                {appetizers.description}
              </p>
            )}
          </div>

          {appetizers?.items?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {appetizers.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                  {item.image && (
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={urlForImage(item.image).width(600).height(600).fit("crop").url()}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-lg font-semibold text-stone-900">{item.name}</h4>
                      {item.price && (
                        <span className="text-amber-700 font-semibold whitespace-nowrap">{item.price}</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-stone-600 mt-2 line-clamp-3">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-stone-500 text-center py-8">Add appetizers in Sanity to see them here.</div>
          )}
        </div>

        {/* Fallback when no categories exist at all */}
        {!categories?.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center">
              <div className="text-6xl mb-6">🧁</div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">Sweets</h3>
              <p className="text-stone-600">Delicious desserts and sweet treats.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center">
              <div className="text-6xl mb-6">🥟</div>
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-4">Appetizers</h3>
              <p className="text-stone-600">Savory bites to start your event.</p>
            </div>
          </div>
        )}
      </section>

      {/* Keep your existing Pricing Section */}
      <section className="bg-stone-50 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-light text-center mb-12 text-stone-900">Catering Packages</h2>

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
                  href="https://wa.me/17138203443?text=Hi! I'm interested in catering services for my event."
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
