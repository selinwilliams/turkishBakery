import { defineField, defineType } from "sanity"

export const cake = defineType({
  name: "cake",
  title: "Cake",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Birthday", value: "birthday" },
          { title: "Wedding", value: "wedding" },
          { title: "Engagement", value: "engagement" },
          { title: "Catering", value: "catering" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Cake Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
})
