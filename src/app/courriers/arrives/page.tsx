import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableArrives from "@/components/Tables/TableArrives";
import { COURRIER } from "@/types/courrier";

export const metadata: Metadata = {
  title: "Courriers Arrivées",
  description: "Liste des courriers arrivées",
};

async function fetchCourriers(): Promise<COURRIER[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/arrivescourries`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch courriers");
    }

    const data = await res.json();
    return data.courriers || []; 
  } catch (error) {
    console.error("Erreur lors de la récupération des courriers :", error);
    return [];
  }
}

const Courriers = async () => {
  const courriers = await fetchCourriers(); 

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Arrivées de courriers" />
      <div className="flex flex-col gap-10">
        <TableArrives courriersData={courriers} />
      </div>
    </DefaultLayout>
  );
};

export default Courriers;
