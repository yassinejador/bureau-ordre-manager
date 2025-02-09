import { useState, useEffect } from 'react';
import { ETABLISSEMENT } from '@/types/etablissement';

type EtablissementFormProps = {
  etablissement: ETABLISSEMENT;
  onClose: () => void;
  onUpdate: (updatedEtablissement: ETABLISSEMENT) => void;
};

const EtablissementForm = ({ etablissement, onClose, onUpdate }: EtablissementFormProps) => {
  const [formData, setFormData] = useState<ETABLISSEMENT>({ ...etablissement });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({ ...etablissement });
  }, [etablissement]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.intitule.trim()) {
      alert("Le nom ne peut pas être vide.");
      setLoading(false);
      return;
    }

    try {
      const updatedData = {
        id: formData.id,
        intitule: formData.intitule,
        adresse: formData.adresse,
        ville: formData.ville,
        fax: formData.fax,
        telephone: formData.telephone,
      };

      console.log("Données envoyées :", updatedData);

      const response = await fetch(`/api/updateEtablissement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Échec de la mise à jour: ${errorMessage}`);
      }

      onUpdate({ ...formData });
      alert("Établissement mis à jour avec succès");
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert(error instanceof Error ? `Une erreur s'est produite: ${error.message}` : "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Modifier Établissement</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="intitule"
            value={formData.intitule}
            onChange={handleChange}
            required
            placeholder="Nom"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
            placeholder="Adresse"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            required
            placeholder="Ville"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            required
            placeholder="Fax"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
            placeholder="Téléphone"
            className="border p-2 w-full"
          />

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

export default EtablissementForm;
