import { useEffect, useState } from "react";
import { USER } from "@/types/users";

export const useUser = () => {
  const [user, setUser] = useState<USER | null>(null);
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user");
        if (!res.ok) return;
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Erreur récupération utilisateur :", error);
      }
    };

    fetchUser();
  }, []);

  return user;
};
