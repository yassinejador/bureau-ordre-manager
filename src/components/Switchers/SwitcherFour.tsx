"use client";
import { useState } from "react";

// Définition des types pour les permissions
type PermissionsState = {
  [key: string]: boolean;
};

const PermissionSwitcher = () => {
  // State typé pour les permissions
  const [permissions, setPermissions] = useState<PermissionsState>({
    accessIncomingMail: false,
    accessOutgoingMail: false,
    addRole: false,
    addService: false,
    accessStatistics: false,
  });

  // Fonction pour basculer l'état d'une permission
  const handleChange = (permission: string) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));
  };

  // Fonction pour rendre un switcher avec un label
  const renderSwitcher = (permission: string, label: string) => (
    <div className="flex items-center mb-4">
      <label htmlFor={permission} className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            id={permission}
            className="sr-only"
            checked={permissions[permission]}
            onChange={() => handleChange(permission)}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              permissions[permission] && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          >

            <span className={`${permissions[permission] && "hidden"}`}>
              <svg
                className="h-4 w-4 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </label>
      <span className="ml-2">{label}</span>
    </div>
  );

  return (
    <div>
      {renderSwitcher("accessIncomingMail", "Accès à la liste des courriers arrivés")}
      {renderSwitcher("accessOutgoingMail", "Accès à la liste des courriers départs")}
      {renderSwitcher("addRole", "Ajouter un rôle")}
      {renderSwitcher("addService", "Ajouter un service")}
      {renderSwitcher("accessStatistics", "Accès aux statistiques")}
    </div>
  );
};

export default PermissionSwitcher;
