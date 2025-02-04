import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Bureau d'Ordre Digital - Faculté des Sciences El Jadida",
  description: "Tableau de bord du système de gestion du bureau d'ordre - FS El Jadida",
};

export default function Home() {
  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
}