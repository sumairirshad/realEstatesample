"use client";

import AuthForm from "../components/AuthForm";
import { useRouter } from "next/navigation";
import { userLogin } from "../Services/apiService";
import toast from "react-hot-toast";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await userLogin<{
        isSuccess: boolean;
        result: { token: string; user: { id: number; email: string; fullName: string } };
        messages: string[];
        errorMessages?: string[];
      }>(data);

      if (res.isSuccess) {
        localStorage.setItem("token", res.result.token);
        toast.success(res.messages[0]);
        router.push("/panel");
      } else {
        toast.error(res.errorMessages?.[0] || "Login failed");
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Login"
      submitText="Sign In"
      linkText="Don't have an account?"
      linkHref="/registration"
      onSubmit={handleLogin}
      loading={loading}
    />
  );
}
