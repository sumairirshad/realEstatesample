"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          My Real Estate
        </Link>
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link href="/favorites">Favorites</Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/registration">Register</Link>
            </>
          ) : (
            <Link href="/panel">My Panel</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
