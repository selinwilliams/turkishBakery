import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Base Price',
      type: 'number',
      validation: (rule) => rule.required(),
      description: 'Base price for the product (starting price for cakes)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          {title: 'Cakes', value: 'cakes'},
          {title: 'Pastries', value: 'pastries'},
          {title: 'Cookies', value: 'cookies'},
          {title: 'Catering', value: 'catering'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Wedding Cakes', value: 'wedding'},
          {title: 'Birthday Cakes', value: 'birthday'},
          {title: 'Engagement Cakes', value: 'engagement'},
          {title: 'Custom Cakes', value: 'custom'},
          {title: 'Catering', value: 'catering'},
          {title: 'Pastries', value: 'pastries'},
          {title: 'Cookies', value: 'cookies'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show on homepage',
    }),
    // NEW: Cake customization options
    defineField({
      name: 'isCustomizable',
      title: 'Is Customizable Cake',
      type: 'boolean',
      description: 'Enable customization options for this cake',
      hidden: ({ document }) => document?.productType !== 'cakes',
      initialValue: false,
    }),
    defineField({
      name: 'cakeOptions',
      title: 'Cake Customization Options',
      type: 'object',
      hidden: ({ document }) => document?.productType !== 'cakes' || !document?.isCustomizable,
      fields: [
        defineField({
          name: 'availableSizes',
          title: 'Available Cake Sizes',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'size',
                  title: 'Size',
                  type: 'string',
                  description: 'e.g., "6 inch", "8 inch", "10 inch"',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'servings',
                  title: 'Serves',
                  type: 'string',
                  description: 'e.g., "6-8 people", "10-12 people"',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'priceModifier',
                  title: 'Price Modifier',
                  type: 'number',
                  description: 'Additional cost for this size (0 for base size)',
                  initialValue: 0,
                }),
              ],
              preview: {
                select: {
                  title: 'size',
                  subtitle: 'servings',
                  description: 'priceModifier',
                },
                prepare({ title, subtitle, description }) {
                  return {
                    title: title,
                    subtitle: `${subtitle} - ${description > 0 ? `+$${description}` : 'Base Price'}`,
                  }
                },
              },
            },
          ],
          initialValue: [
            { size: '6 inch', servings: '6-8 people', priceModifier: 0 },
            { size: '8 inch', servings: '10-12 people', priceModifier: 15 },
            { size: '10 inch', servings: '15-18 people', priceModifier: 30 },
          ],
        }),
        defineField({
          name: 'availableTiers',
          title: 'Available Tiers/Layers',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'tierCount',
                  title: 'Number of Tiers',
                  type: 'number',
                  validation: (rule) => rule.required().min(1).max(5),
                }),
                defineField({
                  name: 'priceMultiplier',
                  title: 'Price Multiplier',
                  type: 'number',
                  description: 'Multiply base price by this (1 for single tier, 1.8 for double, etc.)',
                  validation: (rule) => rule.required().min(1),
                  initialValue: 1,
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  description: 'e.g., "Single Layer", "Double Layer with Filling"',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'tierCount',
                  subtitle: 'description',
                  description: 'priceMultiplier',
                },
                prepare({ title, subtitle, description }) {
                  return {
                    title: `${title} Tier${title > 1 ? 's' : ''}`,
                    subtitle: subtitle,
                    description: `×${description}`,
                  }
                },
              },
            },
          ],
          initialValue: [
            { tierCount: 1, priceMultiplier: 1, description: 'Single Layer' },
            { tierCount: 2, priceMultiplier: 1.8, description: 'Double Layer with Filling' },
            { tierCount: 3, priceMultiplier: 2.5, description: 'Triple Layer with Fillings' },
          ],
        }),
        defineField({
          name: 'cakeTypes',
          title: 'Available Cake Types',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Cake Type Name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'priceModifier',
                  title: 'Price Modifier',
                  type: 'number',
                  description: 'Additional cost for this cake type',
                  initialValue: 0,
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'priceModifier',
                },
                prepare({ title, subtitle }) {
                  return {
                    title: title,
                    subtitle: subtitle > 0 ? `+$${subtitle}` : 'No extra cost',
                  }
                },
              },
            },
          ],
          initialValue: [
            { name: 'Vanilla Cake', value: 'vanilla', priceModifier: 0 },
            { name: 'Chocolate Cake', value: 'chocolate', priceModifier: 0 },
            { name: 'Red Velvet Cake', value: 'red-velvet', priceModifier: 5 },
            { name: 'Cocoa Cake', value: 'cocoa', priceModifier: 0 },
          ],
        }),
        defineField({
          name: 'fruitOptions',
          title: 'Available Fruit Options',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Fruit Name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'priceModifier',
                  title: 'Price Modifier',
                  type: 'number',
                  description: 'Additional cost for this fruit option',
                  initialValue: 0,
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'priceModifier',
                },
                prepare({ title, subtitle }) {
                  return {
                    title: title,
                    subtitle: subtitle > 0 ? `+$${subtitle}` : 'No extra cost',
                  }
                },
              },
            },
          ],
          initialValue: [
            { name: 'Fresh Strawberries', value: 'strawberry', priceModifier: 3 },
            { name: 'Fresh Bananas', value: 'banana', priceModifier: 2 },
            { name: 'Fresh Raspberries', value: 'raspberry', priceModifier: 4 },
            { name: 'Fresh Blueberries', value: 'blueberry', priceModifier: 4 },
            { name: 'Fresh Blackberries', value: 'blackberry', priceModifier: 4 },
          ],
        }),
        defineField({
          name: 'sauceOptions',
          title: 'Available Sauce/Topping Options',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Sauce/Topping Name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'priceModifier',
                  title: 'Price Modifier',
                  type: 'number',
                  description: 'Additional cost for this sauce/topping',
                  initialValue: 0,
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'priceModifier',
                },
                prepare({ title, subtitle }) {
                  return {
                    title: title,
                    subtitle: subtitle > 0 ? `+$${subtitle}` : 'No extra cost',
                  }
                },
              },
            },
          ],
          initialValue: [
            { name: 'Chocolate Sauce Drizzle', value: 'chocolate-sauce', priceModifier: 2 },
            { name: 'White Chocolate Sauce', value: 'white-chocolate-sauce', priceModifier: 3 },
            { name: 'Chocolate Chips', value: 'chocolate-chips', priceModifier: 2 },
          ],
        }),
        defineField({
          name: 'customizationNotes',
          title: 'Customization Notes',
          type: 'text',
          description: 'Additional notes about customization options, lead times, etc.',
          initialValue: 'Custom decorations and special requests available. Please contact us at least 48 hours in advance for custom orders.',
        }),
      ],
    }),
    // NEW: Additional product images
    defineField({
      name: 'gallery',
      title: 'Product Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Additional images for this product',
    }),
    // NEW: Product availability
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'object',
      fields: [
        defineField({
          name: 'inStock',
          title: 'In Stock',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'leadTime',
          title: 'Lead Time',
          type: 'string',
          description: 'e.g., "24 hours", "2-3 days", "1 week"',
          hidden: ({ parent }) => parent?.inStock !== false,
        }),
        defineField({
          name: 'preOrderOnly',
          title: 'Pre-order Only',
          type: 'boolean',
          description: 'Requires advance ordering',
          initialValue: false,
        }),
        defineField({
          name: 'minimumNotice',
          title: 'Minimum Notice Required',
          type: 'string',
          description: 'e.g., "48 hours", "1 week"',
          hidden: ({ parent }) => !parent?.preOrderOnly,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'productType',
      media: 'image',
      price: 'price',
      featured: 'featured',
    },
    prepare({ title, subtitle, media, price, featured }) {
      return {
        title: title,
        subtitle: `${subtitle} - $${price}${featured ? ' ⭐' : ''}`,
        media: media,
      }
    },
  },
})