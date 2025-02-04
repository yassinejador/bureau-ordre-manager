"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { PERMISSIONDETAILS } from "@/types/permissiondetails";
import { useEffect, useState } from "react";

type Props = {
  params: { role_id: string},
};

const Permissions = ({params}: Props) => {
  const [permissions, setPermissions] = useState<PERMISSIONDETAILS[]>([]),
  role_id = parseInt(params.role_id, 10);

  useEffect(() => {
    const fetchPermission = async (): Promise<PERMISSIONDETAILS[]> => {
      try {
        const res = await fetch(`/api/permissions/${role_id}`, {
          cache: "no-cache",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch permissions");
        }

        const data = await res.json();
        return data.permissions || [];
      } catch (error) {
        console.error("Erreur lors de la récupération des permissions :", error);
        return [];
      }
    };

    const loadPermissions = async () => {
      const permissions = await fetchPermission();
      setPermissions(permissions);
    };

    loadPermissions();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Permissions" />
      {permissions.map((item, index) => (
        <SwitcherThree
          key={index}
          label={item.nom}
          role_id={role_id}
          idPermission={item.id}
          hasPermission={item.hasPermission}
          state={permissions}
          setter={setPermissions}
        />
      ))}
    </DefaultLayout>
  );
};

export default Permissions;
