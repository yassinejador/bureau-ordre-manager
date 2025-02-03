"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Alert from "@/components/Alerts/Alert";
import { useRouter } from "next/navigation";

const FormLayout = () => {
  const [nomService, setNomService] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomService: nomService }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage(`Le service ${nomService} a étè ajouté avec succès !`);
      setNomService("");
      setTimeout(() => {
        setMessage(""); // Masque l'alerte après 5 secondes
      }, 7000);
      router.push("/services")
    } else {
      setMessage(data.error || "Une erreur s'est produite.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ajouter un service" />

      <div className="flex justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-boxdark">
          <h3 className="mb-6 text-xl font-semibold text-black dark:text-white text-center">
            Ajouter un service
          </h3>
          {/* Alerte de succès */}
          {message && (
            <Alert message={message} type="success"/> 
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nom
              </label>
              <input
                type="text"
                name="nomService"
                value={nomService}
                onChange={(e) => setNomService(e.target.value)}
                placeholder="Nom de service"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              />

            </div>
            <button
              type="submit"
              className="w-full rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
              disabled={loading}
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
