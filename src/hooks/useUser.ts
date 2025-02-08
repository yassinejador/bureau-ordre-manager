import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

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
