import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CourriersArrivesForm from "@/components/courriers/CourriersArrivesForm";
export const metadata: Metadata = {
  title: "Créer Courrier Arrivé - Bureau d'Ordre Digital",
  description:"Formulaire pour créer un courrier arrivé dans le système de gestion du bureau d'ordre - FS El Jadida",
};
export default function CourriersArrives() {
  return (
    <DefaultLayout>
      <Breadcrumb prefix="courriers" pageName="Arrivés" />
      <CourriersArrivesForm typeCourriers="arrivés" />
    </DefaultLayout>
  );
}