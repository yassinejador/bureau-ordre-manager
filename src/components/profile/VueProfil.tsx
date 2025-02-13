import { USER } from '@/types/users';
import React from 'react';

const VueProfil: React.FC<{ user: USER }> = ({ user }) => {
  return (
    <div>
      <h5 className="mb-4 mt-6 text-2xl font-semibold text-blue-500">Détails du Profil</h5> 
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex">
          <span className="mr-2 font-semibold text-black">Nom:</span> 
          <span className="text-black">{user.nom}</span>
        </div>
        <div className="flex">
          <span className="mr-2 font-semibold text-black">Prénom :</span> 
          <span className="text-black">{user.prenom}</span> 
        </div>
        <div className="flex">
          <span className="mr-2 font-semibold text-black">Service :</span> 
          <span className="text-black">{user.service_nom}</span> 
        </div>
        <div className="flex">
          <span className="mr-2 font-semibold text-black">Rôle :</span> 
          <span className="text-black">{user.role}</span> 
        </div>
        <div className="flex">
          <span className="mr-2 font-semibold text-black">Etablissement :</span> 
          <span className="text-black">{user.etablissement_intitule}</span> {/* Texte en noir */}
        </div>
        <div className="flex">
          <span className="mr-2 font-semibold text-black">Email :</span> 
          <span className="text-black">{user.email}</span> 
        </div>
      </div>
    </div>
  );
};

export default VueProfil;
