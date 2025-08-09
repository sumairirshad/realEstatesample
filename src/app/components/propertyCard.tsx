"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "../context/userContext";
import { saveFavourites } from "../Services/BaseAPI";

type Props = {
  id:number;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  carspots: number;
  imageUrl: string;
  listingType: "rent" | "sell";
  isFavourite?: boolean;
};

export default function PropertyCard({
  id,
  title,
  price,
  address,
  bedrooms,
  bathrooms,
  carspots,
  imageUrl,
  listingType,
  isFavourite
}: Props) {
  const [liked, setLiked] = useState<boolean>(!!isFavourite);
  const {userId, email} = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    alert(isFavourite);
  }, []);

  const handleFav= async(propertyId:number) =>
  {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first.");
        setLoading(false);
        return;
      }

      const payload = {
        userId: userId,
        propertyId:propertyId
      };

      const res = await saveFavourites<{
        isSuccess: boolean;
        messages: string[];
        errorMessages?: string[];
      }>(payload);

      if (res.isSuccess) {
        toast.success(res.messages[0]);
        setLiked(true);
      } else {
        toast.error(res.errorMessages?.[0] || "Failed to add in fav list.");
        console.error(res);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-white rounded-md shadow-md overflow-hidden transform transition duration-300  hover:shadow-lg"
    >
      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
        {listingType === "rent" ? "Rent" : "Sell"}
      </div>

      <button
        onClick={() => handleFav(id)}
        className="cursor-pointer absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:bg-gray-100 transition"
      >
        {liked ? (
          <HeartSolid className="h-5 w-5 text-red-500" />
        ) : (
          <HeartOutline className="h-5 w-5 text-gray-500" />
        )}
      </button>

      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{address}</p>
        <p className="text-blue-600 font-bold text-lg mt-2">
          ${price.toLocaleString()}
        </p>
        <div className="text-sm text-gray-600 mt-2">
          🛏 {bedrooms} Bed | 🛁 {bathrooms} Bath | 🚗 {carspots} Car
        </div>

        <div className="mt-4">
          <button
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={() => console.log("View details clicked")}
          >
            <ArrowUpRight className="h-4 w-4 text-white" />
            View Details
          </button>
        </div>

      </div>
    </motion.div>
  );
}
