import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CourrierDetails from "@/components/courrierdetails/CourrierDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Détails du Courrier Archivé",
  description: "Détails du courrier archivé",
};

// Fonction pour récupérer les détails du courrier depuis l'API
async function getCourrierDetails(id: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/courriersArchives/${id}`, {
      cache: "no-store", // Pour éviter la mise en cache
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des détails du courrier");
    }

    const data = await response.json();
    return data.courrier[0]; // Assurez-vous que l'API retourne bien un objet avec une propriété `courrier`
  } catch (error) {
    console.error("Erreur :", error);
    return null;
  }
}

// Page principale
export default async function CourrierDetailsPage({ params }: { params: { Id: string } }) {
  console.log("Params:", params);
  // Vérifiez que l'ID est bien défini
  if (!params.Id) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Détails du Courrier Archivé" />
        <div className="flex flex-col gap-10">
          <p className="text-red-500">ID du courrier non spécifié</p>
        </div>
      </DefaultLayout>
    );
  }
  
  // Récupérer les détails du courrier
  const courrier = await getCourrierDetails((params.Id));

  // Si le courrier n'existe pas, afficher un message d'erreur
  if (!courrier) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Détails du Courrier Archivé" />
        <div className="flex flex-col gap-10">
          <p className="text-red-500">Courrier non trouvé</p>
        </div>
      </DefaultLayout>
    );
  }

  // Si le courrier existe, afficher les détails
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Détails du Courrier Archivé" />
      <div className="flex flex-col gap-10">
        <CourrierDetails courrier={courrier} />
      </div>
    </DefaultLayout>
  );
}