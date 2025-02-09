export type USER = {
  id: number;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  role: string;
  service: string;
  etablissement: string;
  role_id: number;
  etablissement_id: number;
  service_id: number;
  archived: boolean;
}
