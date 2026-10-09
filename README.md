# Crispy Wings — Rajahmundry

A single-page React + Vite website concept with a bold red-and-black visual style, animated hero, interactive menu categories, scroll reveals, featured food illustrations, location/contact section, and Zomato order links.

## Run locally

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
crispy-wings-rajahmundry/
├── public/
│   └── images/
│       ├── hero-wings.svg
│       ├── wings.svg
│       ├── pizza.svg
│       ├── burger.svg
│       └── chicken-bucket.svg
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Restaurant information

The address, phone number, menu item names and categories are based on the public Crispy Wings listing on Zomato. Prices are intentionally not shown; visitors are directed to Zomato for current prices and availability.

- Address listed: Shop 3 & 4, Door 79-07-06, Old Somalamma Temple Street, Syamala Nagar, Rajahmundry.
- Phone listed: +91 95424 26444 (please verify against the live listing before publishing).
- Order link: https://www.zomato.com/rajahmundry/crispy-wings-rajahmundry-locality/order

## Image note

The assets in `public/images/` are original local SVG illustrations created for this website concept. They do not hotlink external food images. Replace them with licensed restaurant/food photography if you want a photorealistic look.

## Before publishing

- Confirm the restaurant's phone number and address with the owner.
- Check the Zomato URL still points to the intended outlet.
- Replace illustrations with approved restaurant photos if available.
- Verify menu availability and descriptions with the restaurant.


## Download the local food photos

This project uses real food photography saved locally in `public/images/` (not remote image URLs at runtime). On Windows, run:

```bash
npm install
npm run assets:download
npm run dev
```

The asset download script fetches the photos from Unsplash and stores them in `public/images/`. An internet connection is required for this one-time download. The SVG files in the folder are only decorative/legacy assets; the hero, featured food cards, and manifesto section use the local JPG photos.
