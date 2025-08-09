"use client";
import { useEffect, useState } from "react";
import PanelLayout from "../components/PanelLayout";
import { motion } from "framer-motion";

export default function PanelHome() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PanelLayout>
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-gray-800">🏠 Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Welcome to your admin panel. You can manage properties, users, and more here.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-blue-600">15</h2>
              <p className="text-gray-500">Total Properties</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-green-600">4</h2>
              <p className="text-gray-500">Pending Approvals</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-red-600">1</h2>
              <p className="text-gray-500">Rejected Listings</p>
            </div>
          </div>
        </motion.div>
      )}
    </PanelLayout>
  );
}
