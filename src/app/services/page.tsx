import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SERVICE } from "@/types/service";
import TableServices from "@/components/Tables/TableServices";


export const metadata: Metadata = {
  title: "Roles",
  description:
    "Liste des Roles",
};

const Services = () => {
    const ServicesData : SERVICE[] =  [
      { id: 1, nom: "Service A", date_creation: "01/01/2025" },
      { id: 2, nom: "Service A", date_creation: "01/01/2025" },
      { id: 3, nom: "Service A", date_creation: "01/01/2025" },
      { id: 4, nom: "Service A", date_creation: "01/01/2025" }
    ]
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Roles" />
      <div className="flex flex-col gap-10">
        <TableServices services={ServicesData}/>
      </div>
    </DefaultLayout>
  );
};

export default Services;
