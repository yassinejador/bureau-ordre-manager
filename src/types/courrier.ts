import { FICHE } from "./fiche";

export type COURRIER = {
    id:number,
    courrier_id:number,
    expediteur:string,
    destination:string,
    traite_par:string,
    date_creation:string,
    objet:string,
    statut:string,
    date_suppression:string,
    fichier:FICHE[],
    actions:string,
    traite_par_nom:string,
    etat_courrier:string,
    expediteur_nom:string,
    destination_nom:string,
    type:string,
    fichiers_noms:string,
}
