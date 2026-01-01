# Estate Agent Client-Side Web Application
Module: 5COSC026W – Advanced Client-Side Web Development

This project is a client-side Single Page Application (SPA) built using React, Vite, and TypeScript.  
It allows users to search, view, and manage estate properties stored in a local JSON file.

The focus of this coursework is client-side interaction, UI behaviour, responsiveness, and code quality.

---

## Tech Stack
- React 18
- Vite
- TypeScript (TSX)
- React Router
- react-select
- react-datepicker
- react-tabs
- Plain CSS (hand-written media queries)

---

## Project Structure
src/
- data/properties.json  
- types/Property.ts  
- components/  
- hooks/  
- utils/  
- App.tsx  
- main.tsx  
- index.css  

---

## Property Data
- Exactly 7 properties stored in properties.json
- Each property includes:
  - id, type, price, bedrooms
  - dateAdded, postcode
  - shortDescription, longDescription
  - 6–8 images
  - floor plan
  - latitude and longitude

The dataset covers different prices, property types, bedroom counts, postcodes, and dates.

---

## Search Functionality
Users can search using any combination of:
- Property type
- Price range
- Bedroom range
- Date added
- Postcode

All inputs use React UI widgets.  
Empty search criteria are ignored.

Filtering logic is implemented as a reusable TypeScript function in:
utils/filterProperties.ts

---

## Property Results
- Properties are displayed as cards
- Each card shows:
  - Image
  - Price
  - Short description
  - Bedrooms, type, postcode
- Clicking a card opens the property detail page

Layouts are built using CSS Grid and Flexbox.

---

## Property Detail Page
Each property page includes:
- Image gallery with 6–8 images and thumbnail navigation
- Tabbed content using react-tabs:
  - Long description
  - Floor plan
  - Google Maps embed (latitude & longitude)

---

## Favourites System
- Add to favourites via drag & drop or star button
- Duplicate favourites are prevented using property ID
- Remove individual favourites or clear all
- Favourites panel is visible on the search page
- Favourites are persisted using localStorage

---

## Responsive Design
- Desktop layout (>1024px)
- Smaller screen layout (<1024px)
- Hand-written media queries
- Search page and property page adapt correctly

---

## UI & Aesthetics
- Clear visual grouping and hierarchy
- Maximum of two font families
- Consistent spacing and colours
- Clean, professional layout

---

## Code Quality
- Strong TypeScript typing
- Modular, reusable components
- Clean formatting and comments
- No unused or dead code

## How to Run
npm install  
npm run dev  

Open: http://localhost:5173


