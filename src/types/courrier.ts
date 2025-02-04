import { FICHE } from "./fiche";

export type COURRIER = {
    
    courrier_id:number,
    expediteur:string,
    destination:string,
    traite_par:string,
    date_creation:string,
    objet:string,
    etat_id:string,
    date_suppression:string,
    fichier:FICHE[],
    actions:string,
}
