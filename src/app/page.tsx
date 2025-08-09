"use client"
import FilterBar from "./components/filterbar";
import PropertyCard from "./components/propertyCard";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { fetchIsPropertyFavourited, fetchProperties } from "./Services/BaseAPI";
import { useUser } from "./context/userContext";

export type ListingType = "rent" | "sell"; 

  
type APIProperty = {
  id: number;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  carspots: number;
  imageUrl: string;
  listingType: number; 
  isFavourite: boolean;
};

type PropertyCardData = Omit<APIProperty, "listingType"> & {
  listingType: ListingType; 
}

export default function Home() {

  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [favourites, setFavourites] = useState<number[]>([]);
  const {userId} = useUser();
  useEffect(() => {
    const load = async () => {
        try {
          const res = await fetchProperties<{
            result: APIProperty[];
            isSuccess: boolean;
            messages: string[];
            errorMessages?: string[];
          }>({userId: userId ?? null,});

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
    }, []);
  

  return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header />

        <div className="mx-auto p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">

          <div>
            <FilterBar />
          </div>

          <div>
            {properties.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-10">
                No properties are listed.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {properties.map((prop) => (
                  <PropertyCard key={prop.id} {...prop}/>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}