"use client";

import { COURRIER } from "@/types/courrier";

type CourrierDetailsProps = {
  courrier: COURRIER | null;
};

export default function CourrierDetails({ courrier }: CourrierDetailsProps) {
  // Si le courrier est null ou undefined, afficher un message d'erreur
  if (!courrier) {
    return <p className="text-red-500">Aucune donnée disponible pour ce courrier.</p>;
  }

  // Afficher les détails du courrier
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Informations du Courrier</h2>
      <div className="space-y-4">
        <div>
          <span className="font-medium">ID : </span>
          <span>{courrier.id}</span>
        </div>
        <div>
          <span className="font-medium">Expéditeur : </span>
          <span>{courrier.expediteur_nom}</span>
        </div>
        <div>
          <span className="font-medium">Destination : </span>
          <span>{courrier.destination_nom}</span>
        </div>
        <div>
          <span className="font-medium">Objet : </span>
          <span>{courrier.objet}</span>
        </div>
        <div>
          <span className="font-medium">Traité par : </span>
          <span>{courrier.traite_par_nom}</span>
        </div>
        <div>
          <span className="font-medium">État : </span>
          <span>{courrier.etat_courrier}</span>
        </div>
        <div>
          <span className="font-medium">Date de création : </span>
          <span>{new Date(courrier.date_creation).toLocaleDateString()}</span>
        </div>
        <div>
          <span className="font-medium">Date de suppression : </span>
          <span>
            {courrier.date_suppression
              ? new Date(courrier.date_suppression).toLocaleDateString()
              : "Non supprimé"}
          </span>
        </div>
        <div>
          <span className="font-medium">Fichiers joints : </span>
          {courrier.fichiers_noms && courrier.fichiers_noms.trim().length > 0 ? (
            <div className="flex flex-col space-y-2">
              {courrier.fichiers_noms.split(",").map((fichier, index) => {
                const fichierTrim = fichier.trim();
                return (
                  <a
                    key={index}
                    href={`/api/uploads?file=${encodeURIComponent(fichierTrim)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {fichierTrim}
                  </a>
                );
              })}
            </div>
          ) : (
            <span>Aucun fichier joint</span>
          )}
        </div>
      </div>
    </div>
  );
}