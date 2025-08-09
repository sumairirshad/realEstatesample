"use client";

import Header from "../components/header";
import PropertyCard from "../components/propertyCard";

const favoriteProperties = [
  {
    id: 3,
    title: "Beachside Villa",
    price: 1200000,
    address: "78 Ocean Rd, Gold Coast",
    bedrooms: 5,
    bathrooms: 3,
    image: "https://w0.peakpx.com/wallpaper/665/714/HD-wallpaper-a-house-is-not-a-home-place-home-house-zynah.jpg",
  },
  {
    id: 4,
    title: "Urban Loft",
    price: 610000,
    address: "12 City Lane, Brisbane",
    bedrooms: 2,
    bathrooms: 2,
    image: "https://i.pinimg.com/736x/93/e1/0e/93e10e06e28a305bbb1f9be260cec04f.jpg",
  },
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto p-6 sm:p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorite Properties</h1>

        {favoriteProperties.length === 0 ? (
          <p className="text-gray-500">You have no favorite properties yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {favoriteProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
