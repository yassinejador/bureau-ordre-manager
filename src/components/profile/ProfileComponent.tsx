"use client";

import { useState } from "react";
import VueProfil from "./VueProfil";
import ChangerMotDePasse from "./ChangerMotDePasse";
import { useUser } from "@/hooks/useUser";

type Onglet = "vue" | "motdepasse";

const ProfileComponent: React.FC = () => {
  const [ongletActif, setOngletActif] = useState<Onglet>("vue");
  const user = useUser();

  if (!user) {
    return <div>Veuillez vous connecter pour voir votre profil.</div>;
  }

  return (
    <div className="mx-auto mt-8 w-full rounded-lg bg-white p-6 shadow-md">
      <ul className="mb-4 flex border-b">
        <li className="mr-4">
          <button
            className={`px-4 py-2 focus:outline-none ${
              ongletActif === "vue"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setOngletActif("vue")}
          >
            Vue du Profil
          </button>
        </li>

        <li>
          <button
            className={`px-4 py-2 focus:outline-none ${
              ongletActif === "motdepasse"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setOngletActif("motdepasse")}
          >
            Changer le Mot de Passe
          </button>
        </li>
      </ul>

      <div>
        {ongletActif === "vue" && <VueProfil user={user} />}
        {ongletActif === "motdepasse" && <ChangerMotDePasse />}
      </div>
    </div>
  );
};

export default ProfileComponent;
