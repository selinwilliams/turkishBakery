import { defineField, defineType } from "sanity"

export const cateringCategory = defineType({
  name: "cateringCategory",
  title: "Catering Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Sweets", value: "Sweets" },
          { title: "Appetizers", value: "Appetizers" },
          { title: "Salads", value: "Salads" },
          { title: "Main Dishes", value: "Main Dishes" },
          { title: "Beverages", value: "Beverages" },
        ],
      },
    }),
    defineField({
      name: "icon",
      title: "Icon (emoji)",
      type: "string",
      options: {
        list: [
          { title: "🧁 Cupcake", value: "🧁" },
          { title: "🥟 Appetizer", value: "🥟" },
          { title: "🥗 Salad", value: "🥗" },
          { title: "🍰 Cake", value: "🍰" },
          { title: "🥪 Sandwich", value: "🥪" },
          { title: "🍕 Main Dish", value: "🍕" },
          { title: "🥤 Beverage", value: "🥤" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Describe this category in English",
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Item Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              description: "e.g., '$5 per person' or '₺15 per portion'",
            }),
            defineField({
              name: "image",
              title: "Item Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (1, 2, 3...)",
      initialValue: 1,
    }),
  ],
})

// Keep the cateringInfo the same...
export const cateringInfo = defineType({
  name: "cateringInfo",
  title: "Catering Information", 
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Catering Services",
    }),
    defineField({
      name: "subtitle", 
      title: "Page Subtitle",
      type: "text",
      initialValue: "Perfect for your special events, parties, and gatherings",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "minimumOrder",
      title: "Minimum Order Info", 
      type: "string",
      initialValue: "Catering available for events of 10+ people",
    }),
    defineField({
      name: "advanceNotice",
      title: "Advance Notice Required",
      type: "string", 
      initialValue: "Please contact us at least 48-72 hours before your event",
    }),
    defineField({
      name: "contactMessage",
      title: "Contact Message",
      type: "text",
      initialValue: "Every event is unique. Contact us to discuss your specific needs and preferences.",
    }),
  ],
})