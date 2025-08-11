"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import Header from "@/app/components/header";
import { ArrowLeft } from "lucide-react";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedProperty");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.id == id) {
        setProperty(parsed);
      }
    }
  }, [id]);

  if (!property) return <div className="p-10 text-center text-gray-600">Property not found.</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 px-6 py-10">
         <div className="max-w-5xl mx-auto mb-4">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        
          <div className="relative">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-4 right-4">
              {property.isFavourite ? (
                <HeartSolid className="h-7 w-7 text-red-500" />
              ) : (
                <HeartOutline className="h-7 w-7 text-white drop-shadow" />
              )}
            </div>
          </div>

          <div className="p-6 space-y-6">

            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">{property.title}</h1>
                <p className="text-sm text-gray-500 mt-1">{property.address}</p>
              </div>
              <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                {property.listingType}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-700">${property.price.toLocaleString()}</h2>
              <p className="text-sm text-gray-400">Price</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-sm text-gray-600">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="text-lg font-medium">🛏 {property.bedrooms}</div>
                <div>Bedrooms</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="text-lg font-medium">🛁 {property.bathrooms}</div>
                <div>Bathrooms</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="text-lg font-medium">🚗 {property.carspots}</div>
                <div>Car Spots</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Property Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {property.descritption || "No additional details provided."}
              </p>
            </div>

            {/* <div className="pt-6 border-t">
              <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">
                Contact Agent
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
