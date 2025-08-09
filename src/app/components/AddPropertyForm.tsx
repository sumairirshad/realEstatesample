"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { insertProperty } from "../Services/BaseAPI";
import { Loader2 } from "lucide-react";
import { useUser } from "../context/userContext";

export default function AddPropertyForm() {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    listingType: "1",
    bedrooms: "1",
    bathrooms: "1",
    carSpots: "1",
    description: "",
    imageUrl:"",
  });
  const {userId, email} = useUser();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first.");
        setLoading(false);
        return;
      }

      const payload = {
        userId: userId, 
        title: formData.title,
        descritption: formData.description,
        address: formData.address,
        listingType: parseInt(formData.listingType),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        carspots: parseInt(formData.carSpots),
        imageUrl: formData.imageUrl,
        price: parseInt(formData.price)
      };

      const res = await insertProperty<{
        isSuccess: boolean;
        messages: string[];
        errorMessages?: string[];
      }>(payload);

      if (res.isSuccess) {
        toast.success(res.messages[0]);
      } else {
        toast.error(res.errorMessages?.[0] || "Failed to list property.");
        console.error(res);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
      setFormData({
        title: "",
        description: "",
        address: "",
        listingType: "",
        bedrooms: "",
        bathrooms: "",
        carSpots: "",
        imageUrl: "",
        price: ""
      });
    }
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="mx-auto bg-white rounded-xl p-8 space-y-6"
  >
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Add New Property</h1>
    
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="relative">
        <input
          aria-label="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter Title"
          className="peer w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative">
        <input
          aria-label="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Enter Full Address"
          className="peer w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="relative">
        <input
          aria-label="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Enter house price"
          className="peer w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <select
          aria-label="listingType"
          name="listingType"
          value={formData.listingType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">Rent</option>
          <option value="2">Sale</option>
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Bedrooms</label>
        <select
          aria-label="bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
        >
          {[...Array(6)].map((_, i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Bathrooms</label>
        <select
          aria-label="bathrooms"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
        >
          {[...Array(6)].map((_, i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Car Spots</label>
        <select
          aria-label="carSpots"
          name="carSpots"
          value={formData.carSpots}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
        >
          {[...Array(6)].map((_, i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
    </div>

      <div className="relative">
        <input
          aria-label="image"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          placeholder=" "
          className="peer w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="absolute text-sm text-gray-500 top-3 left-3 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-500">
          Image Url
        </label>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the property"
        />
      </div>

    <div>
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 w-full sm:w-auto flex items-center justify-center"
      >
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          "Submit Property"
        )}
      </button>
    </div>
  </form>
);

}
