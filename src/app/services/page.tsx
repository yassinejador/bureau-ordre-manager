import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SERVICE } from "@/types/service";
import TableServices from "@/components/Tables/TableServices";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Services",
  description:
    "Liste des Services",
};

async function fetchServices(): Promise<SERVICE[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/services`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await res.json();
    return data.services || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des services :", error);
    return [];
  }
}

const Services = async () => {
  const services = await fetchServices();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Services" />
      <div className="flex flex-col gap-10">
        <TableServices services={services} />
      </div>
    </DefaultLayout>
  );
};

export default Services;
