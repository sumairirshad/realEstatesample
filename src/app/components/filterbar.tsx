"use client";

export default function FilterBar() {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-6 flex flex-wrap gap-4">
      <input type="text" placeholder="Search by suburb" className="border rounded px-3 py-2 w-full" />
      <input type="number" placeholder="Min Price" className="border rounded px-3 py-2 w-full" />
      <input type="number" placeholder="Max Price" className="border rounded px-3 py-2 w-full" />
      <select id="bedrooms" aria-label="bedrooms" className="border rounded px-3 py-2 w-full">
        <option value="">Bedrooms</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
      </select>
      <button className="w-full bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Search</button>
    </div>  
  );
}
