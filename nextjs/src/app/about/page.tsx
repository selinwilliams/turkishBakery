import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section with Background Image */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="/images/white-cake.jpg"
          alt="About background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-white/30"></div>

        <div className="container text-center relative z-10">
          <h1 className="text-5xl font-serif font-light mb-6 text-stone-900">
            About Sweet Creations
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Every cake tells a story, and I'm here to help you tell yours
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/hands.jpg" //need to add this
              alt="Baker in kitchen"
              fill
              className="object-cover"
            />
          </div>

          {/* Story */}
          <div>
            <h2 className="text-4xl font-serif font-light mb-8 text-stone-900">
              Hi, I'm Gulsah
            </h2>

            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>
                Welcome to Sweet Creations! What started as a passion for baking
                in my home kitchen has grown into a love affair with creating
                beautiful, delicious cakes that make your special moments even
                sweeter.
              </p>

              <p>
                I believe that every celebration deserves a cake that's as
                unique as the occasion itself. Whether it's a wedding, birthday,
                engagement, or just because, I pour my heart into every
                creation, using only the finest ingredients and time-honored
                techniques.
              </p>

              <p>
                From my kitchen to your table, each cake is handcrafted with
                love, attention to detail, and a commitment to making your
                celebration unforgettable.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
              >
                Let's Create Something Sweet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-stone-50 py-20">
        <div className="container">
          <h2 className="text-4xl font-serif font-light text-center mb-16 text-stone-900">
            What Makes Us Special
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Quality */}
            <div className="text-center">
              <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-amber-600 transition-colors duration-300">
                <span className="text-3xl">🥄</span>
              </div>
              <h3 className="text-2xl font-serif font-light mb-4 text-stone-900">
                Premium Ingredients
              </h3>
              <p className="text-stone-600 leading-relaxed">
                I use only the finest ingredients - real butter, fresh eggs,
                premium chocolate, and seasonal fruits to ensure every bite is
                perfect.
              </p>
            </div>

            {/* Custom */}
            <div className="text-center">
              <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-amber-600 transition-colors duration-300">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-2xl font-serif font-light mb-4 text-stone-900">
                Custom Designs
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Every cake is uniquely designed to match your vision. From
                elegant wedding cakes to fun birthday themes, your imagination
                is the limit.
              </p>
            </div>

            {/* Personal */}
            <div className="text-center">
              <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-amber-600 transition-colors duration-300">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-2xl font-serif font-light mb-4 text-stone-900">
                Personal Touch
              </h3>
              <p className="text-stone-600 leading-relaxed">
                As a home-based bakery, I provide personalized service and
                attention to detail that larger bakeries simply can't match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container py-20">
        <h2 className="text-4xl font-serif font-light text-center mb-16 text-stone-900">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-serif font-light mb-3 text-stone-900">
              Consultation
            </h3>
            <p className="text-stone-600">
              We discuss your vision, dietary needs, and event details
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-serif font-light mb-3 text-stone-900">
              Design
            </h3>
            <p className="text-stone-600">
              I create a custom design and provide a detailed quote
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-serif font-light mb-3 text-stone-900">
              Creation
            </h3>
            <p className="text-stone-600">
              Your cake is handcrafted with love and attention to detail
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
              4
            </div>
            <h3 className="text-xl font-serif font-light mb-3 text-stone-900">
              Pickup
            </h3>
            <p className="text-stone-600">
              Pickup arranged from our home kitchen on your special day
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-stone-50 py-20">
        <div className="container">
          <h2 className="text-4xl font-serif font-light text-center mb-16 text-stone-900">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-stone-600 mb-6 italic leading-relaxed">
                "The wedding cake was absolutely perfect! Beautiful design and
                tasted amazing. All our guests were asking where we got it
                from."
              </p>
              <div>
                <p className="text-stone-900 font-medium">Sarah & Mike</p>
                <p className="text-stone-500 text-sm">Wedding Cake</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-stone-600 mb-6 italic leading-relaxed">
                "Best birthday cake ever! My daughter was so happy with her
                unicorn cake. The attention to detail was incredible."
              </p>
              <div>
                <p className="text-stone-900 font-medium">Jennifer M.</p>
                <p className="text-stone-500 text-sm">Birthday Cake</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-stone-600 mb-6 italic leading-relaxed">
                "Professional service and delicious results. The engagement cake
                was the highlight of our party!"
              </p>
              <div>
                <p className="text-stone-900 font-medium">David & Lisa</p>
                <p className="text-stone-500 text-sm">Engagement Cake</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-stone-900 py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-serif font-light mb-6 text-white">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's work together to create the perfect cake for your special
            occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="bg-white text-stone-900 px-10 py-4 rounded-full font-medium hover:bg-amber-100 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/gallery"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-medium hover:bg-white hover:text-stone-900 transition-all duration-300 transform hover:scale-105"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
