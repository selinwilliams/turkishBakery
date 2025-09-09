"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    cakeType: "",
    servings: "",
    // NEW: Cake customization fields
    cakeSize: "",
    layers: "",
    cakeFlavor: "",
    fruits: [] as string[],
    sauces: [] as string[],
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message with new cake options
    let message = `Hi! I'd like to order a cake:
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Event Date: ${formData.eventDate}
Cake Type: ${formData.cakeType}
Servings: ${formData.servings}`;

    // Add cake customization details if filled
    if (formData.cakeSize) message += `\nCake Size: ${formData.cakeSize}`;
    if (formData.layers) message += `\nLayers: ${formData.layers}`;
    if (formData.cakeFlavor) message += `\nCake Flavor: ${formData.cakeFlavor}`;
    if (formData.fruits.length > 0)
      message += `\nFruits: ${formData.fruits.join(", ")}`;
    if (formData.sauces.length > 0)
      message += `\nSauces/Toppings: ${formData.sauces.join(", ")}`;
    if (formData.message) message += `\nMessage: ${formData.message}`;

    const whatsappUrl = `https://wa.me/17138203443?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // NEW: Handle checkbox changes for fruits and sauces
  const handleCheckboxChange = (
    category: "fruits" | "sauces",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <main>
      {/* Hero Section with Background Image */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="/images/white-cake.jpg"
          alt="Contact background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-white/30"></div>

        <div className="container text-center relative z-10">
          <h1 className="text-5xl font-serif font-light mb-6 text-stone-900">
            Let's Create Something Sweet
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Ready to order your perfect cake? Get in touch and let's make your
            celebration unforgettable
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-serif font-light mb-12 text-stone-900">
              Get In Touch
            </h2>

            {/* Contact Methods */}
            <div className="space-y-8 mb-12">
              {/* Phone */}
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-300">
                  <span className="text-white text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-light text-stone-900 mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+17138203443"
                    className="text-lg text-stone-600 hover:text-amber-600 transition-colors"
                  >
                    +1 (713) 820-3443
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                  <span className="text-white text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-light text-stone-900 mb-1">
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/7138203443"
                    target="_blank"
                    className="text-lg text-stone-600 hover:text-green-600 transition-colors"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                  <span className="text-white text-2xl">📷</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-light text-stone-900 mb-1">
                    Instagram
                  </h3>
                  <a
                    href="https://instagram.com/hobbyandgift"
                    target="_blank"
                    className="text-lg text-stone-600 hover:text-pink-600 transition-colors"
                  >
                    @hobbyandgift
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors duration-300">
                  <span className="text-white text-2xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-light text-stone-900 mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@sweetcreations.com"
                    className="text-lg text-stone-600 hover:text-amber-600 transition-colors"
                  >
                    agekamanli@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-stone-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-serif font-light text-stone-900 mb-6">
                Business Hours
              </h3>
              <div className="space-y-3 text-stone-600">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <p className="text-sm text-stone-500 mt-6 italic">
                *Orders require 48-72 hours advance notice
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-serif font-light mb-12 text-stone-900">
              Order Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="agekamanli@gmail.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="1 (713) 820-3443"
                />
              </div>

              {/* Event Date */}
              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Event Date *
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  required
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                />
              </div>

              {/* Cake Type */}
              <div>
                <label
                  htmlFor="cakeType"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Cake Type *
                </label>
                <select
                  id="cakeType"
                  name="cakeType"
                  required
                  value={formData.cakeType}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                >
                  <option value="">Select cake type</option>
                  <option value="wedding">Wedding Cake</option>
                  <option value="birthday">Birthday Cake</option>
                  <option value="engagement">Engagement Cake</option>
                  <option value="catering">Catering</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* NEW: Cake Size */}
              <div>
                <label
                  htmlFor="cakeSize"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Cake Size
                </label>
                <select
                  id="cakeSize"
                  name="cakeSize"
                  value={formData.cakeSize}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                >
                  <option value="">Select cake size</option>
                  <option value="6 inch (6-8 people)">
                    6 inch (6-8 people)
                  </option>
                  <option value="8 inch (10-12 people)">
                    8 inch (10-12 people)
                  </option>
                  <option value="10 inch (15-18 people)">
                    10 inch (15-18 people)
                  </option>
                </select>
              </div>

              {/* NEW: Layers */}
              <div>
                <label
                  htmlFor="layers"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Number of Layers
                </label>
                <select
                  id="layers"
                  name="layers"
                  value={formData.layers}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                >
                  <option value="">Select layers</option>
                  <option value="1 layer">1 Layer (Single Layer)</option>
                  <option value="2 layers">
                    2 Layers (Double Layer with Filling)
                  </option>
                  <option value="3 layers">
                    3 Layers (Triple Layer with Fillings)
                  </option>
                </select>
              </div>

              {/* NEW: Cake Flavor */}
              <div>
                <label
                  htmlFor="cakeFlavor"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Cake Flavor
                </label>
                <select
                  id="cakeFlavor"
                  name="cakeFlavor"
                  value={formData.cakeFlavor}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                >
                  <option value="">Select cake flavor</option>
                  <option value="Vanilla Cake">Vanilla Cake</option>
                  <option value="Chocolate Cake">Chocolate Cake</option>
                  <option value="Cocoa Cake">Cocoa Cake</option>
                  <option value="Red Velvet Cake">Red Velvet Cake</option>
                </select>
              </div>

              {/* Servings */}
              <div>
                <label
                  htmlFor="servings"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Number of Servings
                </label>
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="e.g., 20"
                />
              </div>

              {/* NEW: Fruits */}
              <div>
                <label className="block text-stone-900 font-medium mb-3 text-lg">
                  Fresh Fruits (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Strawberry",
                    "Banana",
                    "Raspberry",
                    "Blueberry",
                    "Blackberry",
                  ].map((fruit) => (
                    <label
                      key={fruit}
                      className="flex items-center space-x-3 p-3 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.fruits.includes(fruit)}
                        onChange={() => handleCheckboxChange("fruits", fruit)}
                        className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                      />
                      <span className="text-stone-700">{fruit}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* NEW: Sauces & Toppings */}
              <div>
                <label className="block text-stone-900 font-medium mb-3 text-lg">
                  Sauces & Toppings (Optional)
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Chocolate Chips",
                    "Chocolate Sauce",
                    "White Chocolate Sauce",
                  ].map((sauce) => (
                    <label
                      key={sauce}
                      className="flex items-center space-x-3 p-3 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.sauces.includes(sauce)}
                        onChange={() => handleCheckboxChange("sauces", sauce)}
                        className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                      />
                      <span className="text-stone-700">{sauce}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-stone-900 font-medium mb-3 text-lg"
                >
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-lg resize-none"
                  placeholder="Tell us about your vision, colors, themes, dietary restrictions, special decorations, etc."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-5 rounded-xl font-medium text-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send Order Request via WhatsApp
              </button>
            </form>

            <p className="text-sm text-stone-500 mt-4 text-center">
              This will open WhatsApp with your order details pre-filled
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-stone-50 py-20">
        <div className="container">
          <h2 className="text-4xl font-serif font-light text-center mb-16 text-stone-900">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-serif font-light mb-4 text-stone-900">
                How far in advance should I order?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                We recommend ordering at least 48-72 hours in advance,
                especially for custom designs or weekend events.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-serif font-light mb-4 text-stone-900">
                Do you deliver?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Currently we offer pickup only from our home kitchen. We'll
                provide you with the address and pickup time when you place your
                order.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-serif font-light mb-4 text-stone-900">
                Can you accommodate dietary restrictions?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Absolutely! We can make dairy-free, and other special dietary
                accommodations with advance notice.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-serif font-light mb-4 text-stone-900">
                What's your pricing?
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Pricing varies based on size, design complexity, and
                ingredients. Contact us for a personalized quote!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
