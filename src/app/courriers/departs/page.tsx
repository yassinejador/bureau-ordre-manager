import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CourriersDepartsForm from "@/components/courriers/CourriersDepartsForm";

export const metadata: Metadata = {
  title: "Créer Courrier Départ - Bureau d'Ordre Digital",
  description:
    "Formulaire pour créer un courrier départ dans le système de gestion du bureau d'ordre - FS El Jadida",
};

export default function CourriersDeparts() {
  return (
    <DefaultLayout>
      <Breadcrumb prefix="courriers" pageName="Départ" />
      <CourriersDepartsForm typeCourriers="Départ" />
    </DefaultLayout>
  );
}
