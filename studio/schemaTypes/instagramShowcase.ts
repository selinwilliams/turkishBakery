// studio/schemaTypes/instagramShowcase.ts
import { defineField, defineType } from 'sanity'

export const instagramShowcase = defineType({
  name: 'instagramShowcase',
  title: 'Instagram Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this showcase post'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'Caption that will appear with the image'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this image should appear (1, 2, 3, etc.)'
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Toggle to show/hide this image on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order'
    },
    prepare(selection) {
      const { title, media, order } = selection
      return {
        title: title,
        subtitle: `Order: ${order || 'Not set'}`,
        media: media
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})