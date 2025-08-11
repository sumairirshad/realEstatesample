// components/filterbar.tsx
"use client";

import { useState } from "react";

type FilterProps = {
  onFilter: (filters: {
    suburb: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
  }) => void;
};

export default function FilterBar({ onFilter }: FilterProps) {
  const [suburb, setSuburb] = useState("");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [bedrooms, setBedrooms] = useState<number | string>("");

  const handleSearch = () => {
    onFilter({
      suburb,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      bedrooms: Number(bedrooms),
    });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-6 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search by suburb"
        className="border rounded px-3 py-2 w-full"
        value={suburb}
        onChange={(e) => setSuburb(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        className="border rounded px-3 py-2 w-full"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="border rounded px-3 py-2 w-full"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <select aria-label="bedrooms"
        id="bedrooms"
        className="border rounded px-3 py-2 w-full"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
      >
        <option value="">Bedrooms</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
      </select>
      <button
        className="w-full bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
