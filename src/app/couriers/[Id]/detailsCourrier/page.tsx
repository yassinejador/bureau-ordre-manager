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
    const courrierResponse = await fetch(`${process.env.API_URL}/api/courriersArchives/${id}`, {
      cache: "no-store", // Pour éviter la mise en cache
    });

    if (!courrierResponse.ok) {
      throw new Error("Erreur lors de la récupération des détails du courrier");
    }

    const courrierData = await courrierResponse.json();
    console.log("courrier info =", courrierData);
    const courrier = courrierData.courrier[0];

    
    
    // fonction pour Récupérer les informations des fichiers
    const fichiersResponse = await fetch(`${process.env.API_URL}/api/fichierJointsArchive/${id}`, {
      cache: "no-store",
    });

    if (!fichiersResponse.ok) {
      throw new Error("Erreur lors de la récupération des fichiers du courrier");
    }

    const fichiersData = await fichiersResponse.json();
    console.log("fichier = ", fichiersData);
     // Filtrer les fichiers joints pour ne garder que ceux associés à ce courrier
    const fichiersAssocies = fichiersData.fichiersJoints.filter(
      (fichier: any) => fichier.courrier_id === parseInt(id)
    );
    // Structurer les fichiers pour l'affichage
    const fichiersStructurés = fichiersAssocies.map((fichier: any) => ({
      fichier: fichier.fichier.trim(),// Nom du fichier (enlever les espaces et sauts de ligne)
      type_courrier: fichier.type_courrier || "Inconnu", // Type du courrier
      type_support: fichier.type_support || "Inconnu", // Type de support
    }));

    console.log("Fichiers structurés :", fichiersStructurés);
    // Ajouter les fichiers structurés au courrier
     courrier.fichiers = fichiersStructurés;


     return courrier; // Retourner le courrier avec les fichiers associés
    } catch (error) {
      console.error("Erreur :", error);
      return null; // Retourner null en cas d'erreur
    }
  }

  

// Page principale
export default async function CourrierDetailsPage({ params }: { params: { Id: string } }) {
  console.log("ID reçu:", params);
  // Vérification de l'ID 
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