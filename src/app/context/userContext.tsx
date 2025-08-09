"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type JwtPayload = {
  sub: string;
  email: string;
  exp: number;
  [key: string]: any;
};

type UserContextType = {
  userId: string | null;
  email: string | null;
};

const UserContext = createContext<UserContextType>({ userId: null, email: null });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.sub) {
        router.push("/");
        return;
      }

      setUserId(decoded.sub);
      setEmail(decoded.email);
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/");
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, email }}>
      {children}
    </UserContext.Provider>
  );
};
