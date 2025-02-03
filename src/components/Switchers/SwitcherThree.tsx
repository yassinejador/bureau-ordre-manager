"use client";
import { PERMISSIONDETAILS } from "@/types/permissiondetails";

const PermissionSwitcher = ({
  label,
  role_id,
  idPermission,
  hasPermission,
  state,
  setter,
}: {
  label: string;
  role_id: number;
  idPermission: number;
  hasPermission: boolean | number;
  state: PERMISSIONDETAILS[];
  setter: React.Dispatch<React.SetStateAction<PERMISSIONDETAILS[]>>;
}) => {

  // Fonction pour basculer l'état d'une permission
  const handleChange = async () => {
    setter((prevState) =>
      prevState.map((permission) =>
        permission.id === idPermission
          ? { ...permission, hasPermission: !permission.hasPermission }
          : permission
      )
    );

    const res = await fetch(`/api/permissions/${role_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idPermissionDetails: idPermission, hasPermission: hasPermission==1?false: true }),
    });
    const data = await res.json();

    if (res.ok) {
      console.log(role_id);
    } else {
      console.log(data.erreur);
    }
  };

  // Fonction pour rendre un switcher avec un label
  const renderSwitcher = (label: string) => (
    <div className="flex items-center mb-4">
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={hasPermission as boolean}
            onChange={() => handleChange()}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${hasPermission && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
              }`}
          >

            <span className={`${hasPermission && "hidden"}`}>
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
      {renderSwitcher(label)}
    </div>
  );
};

export default PermissionSwitcher;
