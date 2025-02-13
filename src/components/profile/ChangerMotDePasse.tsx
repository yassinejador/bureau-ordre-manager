import { useState } from "react";
import Alert from "../Alerts/Alert";

const ChangerMotDePasse: React.FC = () => {
  const [ancienMotDePasse, setAncienMotDePasse] = useState("");
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nouveauMotDePasse.length < 8) {
      setErreur("Le mot de passe doit comporter au moins 8 caractères.");
      setSuccessMessage("");
      return;
    }

    if (nouveauMotDePasse !== confirmerMotDePasse) {
      setErreur("Les mots de passe ne correspondent pas.");
      setSuccessMessage("");
      return;
    }

    const res = await fetch("/api/updatepass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ancienMotDePasse,
        nouveauMotDePasse,
        confirmerMotDePasse,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setErreur("");
      setSuccessMessage("Mot de passe modifié avec succès !");
    } else {
      setErreur(data.message || "Une erreur est survenue.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      {successMessage && <Alert message={successMessage} type="success" />}

      {erreur && <Alert message={erreur} type="danger" />}

      <h5 className="mb-4 text-2xl font-semibold text-blue-500">
        Changer le Mot de Passe
      </h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="ancienMotDePasse"
            className="mb-2 block font-semibold text-black"
          >
            Ancien Mot de Passe
          </label>
          <input
            type="password"
            id="ancienMotDePasse"
            className="w-full rounded-md border p-2"
            value={ancienMotDePasse}
            onChange={(e) => setAncienMotDePasse(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="nouveauMotDePasse"
            className="mb-2 block font-semibold text-black"
          >
            Nouveau Mot de Passe
          </label>
          <input
            type="password"
            id="nouveauMotDePasse"
            className="w-full rounded-md border p-2"
            value={nouveauMotDePasse}
            onChange={(e) => setNouveauMotDePasse(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmerMotDePasse"
            className="mb-2 block font-semibold text-black"
          >
            Confirmer le Nouveau Mot de Passe
          </label>
          <input
            type="password"
            id="confirmerMotDePasse"
            className="w-full rounded-md border p-2"
            value={confirmerMotDePasse}
            onChange={(e) => setConfirmerMotDePasse(e.target.value)}
            required
          />
        </div>

        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Sauvegarder les Changements
        </button>
      </form>
    </div>
  );
};

export default ChangerMotDePasse;
