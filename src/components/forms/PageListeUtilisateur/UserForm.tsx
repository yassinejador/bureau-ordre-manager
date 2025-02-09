import { useState, useEffect } from 'react';
import { USER } from '@/types/users';

type UserFormProps = {
  user: USER;
  onClose: () => void;
  onUpdate: (updatedUser: USER) => void; // Permet de mettre à jour la liste après modification
};

const UserForm = ({ user, onClose, onUpdate }: UserFormProps) => {
  const [formData, setFormData] = useState<USER>(user);
  const [loading, setLoading] = useState(false);

  // Mettre à jour le formulaire si l'utilisateur change
  useEffect(() => {
    setFormData(user);
  }, [user]);

  // Gestion des changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Vérifier si le champ nom n'est pas vide
      if (!formData.nom.trim()) {
        alert("Le nom ne peut pas être vide.");
        return;
      }
  
      // Séparer prénom et nom
      const nameParts = formData.nom.trim().split(" ");
      const prenom = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : "";
      const nom = nameParts[nameParts.length - 1];
  
      // Construire l'objet de mise à jour
      const updatedData = {
        id: formData.id,
        nom,
        prenom,
        email: formData.email,
      };
  
      console.log("Données envoyées :", updatedData);
  
      const response = await fetch(`/api/updateUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Échec de la mise à jour: ${errorMessage}`);
      }
  
      // Mettre à jour l'affichage après modification
      onUpdate({ ...formData, prenom, nom });
  
      alert("Utilisateur mis à jour avec succès");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erreur lors de la mise à jour :", error.message);
        alert(`Une erreur s'est produite: ${error.message}`);
      } else {
        console.error("Erreur inconnue :", error);
        alert("Une erreur inconnue s'est produite.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Modifier Utilisateur</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
        

          {/* Champ Nom */}
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            placeholder="Nom"
            className="border p-2 w-full"
          />

          {/* Champ Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="border p-2 w-full"
          />

          {/* champ du rôle */}
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            readOnly
            required
            placeholder="Role"
            className="border p-2 w-full"
          />
         

          {/* champ du service */}
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            readOnly
            required
            placeholder="Service"
            className="border p-2 w-full"
          />
          

          {/* champ de l'établissement */}
          <input
            type="text"
            name="etablissement"
            value={formData.etablissement}
            onChange={handleChange}
            readOnly
            required
            placeholder="Etablissement"
            className="border p-2 w-full"
          />
          

          {/* Boutons */}
          <div className="flex justify-end space-x-3">
            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
