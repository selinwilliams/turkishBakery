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
              name: "featured",
              title: "Featured (recommend for highlights)",
              type: "boolean",
              initialValue: false,
              description: "Mark as a recommended item",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "basePrice",
              title: "Base Price",
              type: "number",
              description: "Base price for the item (whole cake price for single tier)",
            }),
            defineField({
              name: "image",
              title: "Item Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "itemType",
              title: "Item Type",
              type: "string",
              options: {
                list: [
                  { title: "Regular Item", value: "regular" },
                  { title: "Cake", value: "cake" },
                ],
              },
              initialValue: "regular",
            }),
            defineField({
              name: "cakeOptions",
              title: "Cake Customization Options",
              type: "object",
              hidden: ({ parent }) => parent?.itemType !== "cake",
              fields: [
                defineField({
                  name: "availableSizes",
                  title: "Available Cake Sizes",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({
                          name: "size",
                          title: "Size",
                          type: "string",
                          description: "e.g., '6 inch', '8 inch', '10 inch'",
                        }),
                        defineField({
                          name: "servings",
                          title: "Serves",
                          type: "string",
                          description: "e.g., '6-8 people', '10-12 people'",
                        }),
                        defineField({
                          name: "priceModifier",
                          title: "Price Modifier",
                          type: "number",
                          description: "Additional cost for this size (0 for base size)",
                        }),
                      ],
                    },
                  ],
                  initialValue: [
                    { size: "6 inch", servings: "6-8 people", priceModifier: 0 },
                    { size: "8 inch", servings: "10-12 people", priceModifier: 15 },
                    { size: "10 inch", servings: "15-18 people", priceModifier: 30 },
                  ],
                }),
                defineField({
                  name: "availableTiers",
                  title: "Available Tiers/Layers",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({
                          name: "tierCount",
                          title: "Number of Tiers",
                          type: "number",
                          validation: (rule) => rule.required().min(1).max(5),
                        }),
                        defineField({
                          name: "priceMultiplier",
                          title: "Price Multiplier",
                          type: "number",
                          description: "Multiply base price by this (1 for single tier, 1.8 for double, etc.)",
                          initialValue: 1,
                        }),
                        defineField({
                          name: "description",
                          title: "Description",
                          type: "string",
                          description: "e.g., 'Single Layer', 'Double Layer with Filling'",
                        }),
                      ],
                    },
                  ],
                  initialValue: [
                    { tierCount: 1, priceMultiplier: 1, description: "Single Layer" },
                    { tierCount: 2, priceMultiplier: 1.8, description: "Double Layer with Filling" },
                    { tierCount: 3, priceMultiplier: 2.5, description: "Triple Layer with Fillings" },
                  ],
                }),
                defineField({
                  name: "cakeTypes",
                  title: "Available Cake Types",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({
                          name: "name",
                          title: "Cake Type Name",
                          type: "string",
                        }),
                        defineField({
                          name: "value",
                          title: "Value",
                          type: "string",
                        }),
                        defineField({
                          name: "priceModifier",
                          title: "Price Modifier",
                          type: "number",
                          description: "Additional cost for this cake type",
                          initialValue: 0,
                        }),
                      ],
                    },
                  ],
                  initialValue: [
                    { name: "Vanilla Cake", value: "vanilla", priceModifier: 0 },
                    { name: "Chocolate Cake", value: "chocolate", priceModifier: 0 },
                    { name: "Red Velvet Cake", value: "red-velvet", priceModifier: 5 },
                    { name: "Cocoa Cake", value: "cocoa", priceModifier: 0 },
                  ],
                }),
                defineField({
                  name: "fruitOptions",
                  title: "Available Fruit Options",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({
                          name: "name",
                          title: "Fruit Name",
                          type: "string",
                        }),
                        defineField({
                          name: "value",
                          title: "Value",
                          type: "string",
                        }),
                        defineField({
                          name: "priceModifier",
                          title: "Price Modifier",
                          type: "number",
                          description: "Additional cost for this fruit option",
                          initialValue: 0,
                        }),
                      ],
                    },
                  ],
                  initialValue: [
                    { name: "Fresh Strawberries", value: "strawberry", priceModifier: 3 },
                    { name: "Fresh Bananas", value: "banana", priceModifier: 2 },
                    { name: "Fresh Raspberries", value: "raspberry", priceModifier: 4 },
                    { name: "Fresh Blueberries", value: "blueberry", priceModifier: 4 },
                    { name: "Fresh Blackberries", value: "blackberry", priceModifier: 4 },
                  ],
                }),
                defineField({
                  name: "sauceOptions",
                  title: "Available Sauce/Topping Options",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({
                          name: "name",
                          title: "Sauce/Topping Name",
                          type: "string",
                        }),
                        defineField({
                          name: "value",
                          title: "Value",
                          type: "string",
                        }),
                        defineField({
                          name: "priceModifier",
                          title: "Price Modifier",
                          type: "number",
                          description: "Additional cost for this sauce/topping",
                          initialValue: 0,
                        }),
                      ],
                    },
                  ],
                  initialValue: [
                    { name: "Chocolate Sauce Drizzle", value: "chocolate-sauce", priceModifier: 2 },
                    { name: "White Chocolate Sauce", value: "white-chocolate-sauce", priceModifier: 3 },
                    { name: "Chocolate Chips", value: "chocolate-chips", priceModifier: 2 },
                  ],
                }),
                defineField({
                  name: "customizationNotes",
                  title: "Customization Notes",
                  type: "text",
                  description: "Additional notes about customization options, lead times, etc.",
                  initialValue: "Custom decorations and special requests available. Please contact us at least 48 hours in advance for custom orders.",
                }),
              ],
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
      name: "highlightTitle",
      title: "Highlight Title",
      type: "string",
      initialValue: "A Taste Of Our Menu",
    }),
    defineField({
      name: "highlightSubtitle",
      title: "Highlight Subtitle",
      type: "string",
      initialValue: "Freshly baked, beautifully presented.",
    }),
    defineField({
      name: "highlightImages",
      title: "Curated Highlight Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Optional curated images shown near the top of the catering page.",
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
