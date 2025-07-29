import { defineField, defineType } from "sanity"


export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Cakes", value: "cakes" },
          { title: "Pastries", value: "pastries" },
          { title: "Cookies", value: "cookies" },
          { title: "Catering", value: "catering" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Wedding Cakes", value: "wedding-cakes" },
          { title: "Birthday Cakes", value: "birthday-cakes" },
          { title: "Engagement Cakes", value: "engagement-cakes" },
          { title: "Cupcakes", value: "cupcakes" },
          { title: "Croissants", value: "croissants" },
          { title: "Muffins", value: "muffins" },
          { title: "Danish", value: "danish" },
          { title: "Chocolate Chip", value: "chocolate-chip" },
          { title: "Sugar Cookies", value: "sugar-cookies" },
          { title: "Wedding Catering", value: "wedding-catering" },
          { title: "Party Platters", value: "party-platters" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Show on homepage"
    }),
  ],
})