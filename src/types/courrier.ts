import { FICHE } from "./fiche";

export type COURRIER = {
    id:number,
    expediteur:string,
    destination:string,
    traite_par:string,
    date_creation:string,
    objet:string,
    statut:string,
    date_suppression:string,
    fichiers:FICHE[],
    actions:string,
    type:string,
  
}
