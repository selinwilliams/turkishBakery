Turkish Bakery Monorepo
=======================

This repo contains a Next.js app (`nextjs`) and a Sanity Studio (`studio`) for a home bakery website. It powers pages like Gallery, Catering, Products, About, and Contact.

Quick Start
-----------

- Prerequisites: Node 18+, npm 9+, a Sanity project (projectId + dataset).
- Install and run:

```
# Next.js app
cd nextjs
npm install
npm run dev
# http://localhost:3000

# Sanity Studio
cd ../studio
npm install
npm run dev
# http://localhost:3333
```

Environment
-----------

Create `nextjs/.env.local` with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_SANITY_DATASET=<your_dataset>
```

Project and dataset are also configured in `studio/sanity.config.ts`.

Structure
---------

- `nextjs/` – Next.js 14 (App Router) site
  - `src/app/` – routes (e.g., `page.tsx`, `gallery`, `products/catering`)
  - `src/components/` – UI components (e.g., `Navigation.tsx`, `ProductCard.tsx`)
  - `src/sanity/` – Sanity client + image builder
  - `public/images/` – static images (e.g., `white-cake.jpg`, `catering-hero.jpg`)
- `studio/` – Sanity Studio v3
  - `schemaTypes/` – content schemas (`product`, `cateringCategory`, `cateringInfo`, `instagramShowcase`)

Content Model (Sanity)
----------------------

- `product` – For Cakes, Pastries, Cookies, Catering showcase products
  - Fields: `title`, `price`, `description`, `productType` (cakes|pastries|cookies|catering), `category` (wedding|birthday|engagement|catering), `image`, `featured`, optional customization fields for cakes
- `cateringCategory` – Categories like Sweets, Appetizers with `items` (name, image, price/basePrice)
- `cateringInfo` – Page copy + hero and curated highlight images for the catering page
- `instagramShowcase` – Optional curated IG-like images

Publish changes in Studio to make them live in the site.

Key Pages
---------

- `Gallery` (`/gallery`):
  - Shows all `product` docs and also flattens items from `cateringCategory` into a “Catering” tab.
  - Supports deep links: `/gallery?category=wedding|birthday|engagement|catering`.
  - Fresh data: page disables caching so updates appear quickly.

- `Catering` (`/products/catering`):
  - Two main sections: Sweets and Appetizers.
  - Optional curated highlights via `cateringInfo.highlightImages`.
  - Uses `cateringCategory` → `items` (image, name, description, price/basePrice).

- `About` (`/about`):
  - Hero with `white-cake.jpg` overlay.
  - Story section with `hands.jpg` image.

Common Tasks
------------

- Add a new wedding cake to Gallery:
  1) Create a `product` doc
  2) Set `productType = cakes`
  3) Set `category = wedding`
  4) Add `image` and `price`
  5) Publish

- Add a catering item:
  1) Open a `cateringCategory` (e.g., Sweets)
  2) Add an item (`name`, `image`, `basePrice`)
  3) Publish
  4) It will show under Catering page and in Gallery’s Catering tab

- Curate “A Taste Of Our Menu” on Catering page:
  - In `cateringInfo`, set `highlightImages` (optional). Only curated images show there.

Troubleshooting
---------------

- “I published but don’t see changes”: make sure you published, then hard refresh. The app’s key pages set `revalidate = 0` to fetch fresh data.
- Gallery filters not switching: navigation uses query-string deep links; the Gallery client syncs to the URL and remounts when the category changes.
- Old/legacy `cake` docs: The Gallery only reads `product` and catering items. If you previously had `_type == "cake"` documents, migrate to `product`.
- Images from Sanity not loading: Next.js image config allows `cdn.sanity.io`. Ensure items have an image set and published.

Useful Commands
---------------

```
# Next.js
npm run dev        # start dev server
npm run build      # production build
npm run start      # run production build

# Sanity
npm run dev        # studio dev server
npm run build      # build studio
```

Deploy Notes
------------

- Next.js image config (`nextjs/next.config.js`) is set for Sanity CDN, and `output: 'standalone'` for containerized deployments.
- Provide the same SANITY project/dataset env values in your hosting environment.

License
-------

Private project – no license specified.
