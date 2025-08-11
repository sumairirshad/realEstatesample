"use client";

import FilterBar from "./components/filterbar";
import PropertyCard from "./components/propertyCard";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { fetchProperties } from "./Services/BaseAPI";
import { useUser } from "./context/userContext";
import { APIProperty, PropertyCardData } from "./sharedProperty";

export default function Home() {
  const [allProperties, setAllProperties] = useState<PropertyCardData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardData[]>([]);
  const { userId } = useUser();

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      try {
        const res = await fetchProperties<{
          result: APIProperty[];
          isSuccess: boolean;
          messages: string[];
          errorMessages?: string[];
        }>({ userId });

        if (res.isSuccess) {
          const formatted: PropertyCardData[] = res.result.map((prop) => ({
            ...prop,
            listingType: prop.listingType === 1 ? "rent" : "sell",
          }));
          setAllProperties(formatted);
          setFilteredProperties(formatted); 
        } else {
          console.error(res.errorMessages?.[0] || "Failed to fetch.");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    load();
  }, [userId]);

  const handleFilter = ({
    suburb,
    minPrice,
    maxPrice,
    bedrooms,
  }: {
    suburb: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
  }) => {
    const result = allProperties.filter((prop) => {
      const matchesSuburb =
        !suburb || prop.address.toLowerCase().includes(suburb.toLowerCase());
      const matchesMin = !minPrice || prop.price >= minPrice;
      const matchesMax = !maxPrice || prop.price <= maxPrice;
      const matchesBedrooms = !bedrooms || prop.bedrooms >= bedrooms;

      return matchesSuburb && matchesMin && matchesMax && matchesBedrooms;
    });

    setFilteredProperties(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <div className="mx-auto p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        <div>
          <FilterBar onFilter={handleFilter} />
        </div>

        <div>
          {filteredProperties.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-10">
              No properties match the criteria.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
