"use client";

import { useEffect, useState } from "react";
import Header from "../components/header";
import PropertyCard from "../components/propertyCard";
import { fetchIsPropertyFavourited } from "../Services/BaseAPI";
import { useUser } from "../context/userContext";
import { APIProperty, PropertyCardData } from "../sharedProperty";


export default function FavoritesPage() {
  const {userId} = useUser();
  const [properties, setProperties] = useState<PropertyCardData[]>([]);

  
useEffect(() => {
  if(!userId) return;
  const load = async () => {

    try {
      const res = await fetchIsPropertyFavourited<{
        result: APIProperty[];
        isSuccess: boolean;
        messages: string[];
        errorMessages?: string[];
      }>({userId});

      if (res.isSuccess) {
        const formatted: PropertyCardData[] = res.result.map((prop) => ({
          ...prop,
          listingType: prop.listingType === 1 ? "rent" : "sell",
        }));
        setProperties(formatted);
      } else {
        console.error(res.errorMessages?.[0] || "Failed to fetch.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  load();
}, [userId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto p-6 sm:p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorite Properties</h1>

        {properties.length === 0 ? (
          <p className="text-gray-500">You have no favorite properties yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {properties.map((prop,index) => (
              <PropertyCard key={index} {...prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
