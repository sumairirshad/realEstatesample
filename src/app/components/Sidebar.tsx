"use client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Sidebar() {


  const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logout');
        location.href = '/';
  }

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <Link href="/panel" className="block hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link href="/panel/add-property" className="block hover:bg-gray-700 p-2 rounded">
          Add Property
        </Link>
        <button onClick={handleLogout} className="block hover:bg-red-900 p-2 rounded cursor-pointer">
          Log Out
        </button>
      </nav>
    </aside>
  );
}
