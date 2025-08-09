import Link from "next/link";
import Header from "./header";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  title: string;
  submitText: string;
  linkText: string;
  linkHref: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export default function AuthForm({
  title,
  submitText,
  linkText,
  linkHref,
  onSubmit,
  loading
}: AuthFormProps) {
  return (
    <>
      <Header />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {submitText}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {linkText}{" "}
          <Link href={linkHref} className="text-blue-600 hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
