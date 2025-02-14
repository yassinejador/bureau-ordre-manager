import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableCourriersArchive from "@/components/Tables/TableCourriersArchive";
import { COURRIER } from "@/types/courrier";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Courriers Archivés",
  description:
    "Liste des Courriers Archivés",
};

const CourrierArchive = async () => {
  const response = await fetch(`${process.env.API_URL}/api/courriersArchives`, { cache: "no-cache" });
  const data = await response.json();
  const courriers = data.courriers || [];
  console.log("Données récupérées :", courriers);
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Les Courriers Archivés" />
      <div className="flex flex-col gap-10">
        <TableCourriersArchive courriers={courriers} />
      </div>
    </DefaultLayout>
  );
};

export default CourrierArchive;
