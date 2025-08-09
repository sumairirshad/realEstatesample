"use client";

import AuthForm from "../components/AuthForm";
import { useRouter } from "next/navigation";
import { userRegistration } from "../Services/apiService";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setLoading(true);

  const formData = new FormData(e.currentTarget);
    const data: any = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await userRegistration<{
        isSuccess: boolean;
        result: any;
        messages: string[];
        errorMessages?: string[];
      }>(data);

      if (res.isSuccess) {
        toast.success(res.messages[0]);
      } else {
        toast.error(res?.messages![0]);
        setLoading(false);
      }
    } catch (error: any) {
      const message = error?.messages || "An unexpected error occurred";
      toast.error(message);
      setLoading(false);
    }
  };


  return (
    <AuthForm
      title="Register"
      submitText="Create Account"
      linkText="Already have an account?"
      linkHref="/login"
      onSubmit={handleRegister}
      loading={loading}
    />
  );
}
