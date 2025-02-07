"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LeftSection from "@/components/auth/LeftSection";
import Alert from "@/components/Alerts/Alert"; 

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "danger" | "info";
  } | null>(null); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log("Réponse API :", data);
      if (res.ok) {
        router.push("/");
      } else {
        setAlert({
          message: data.error || "Une erreur est survenue",
          type: "danger",
        });
      }
    } catch (error) {
      setAlert({
        message: "Une erreur est survenue, veuillez réessayer.",
        type: "danger",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-[1400px] rounded-xl border border-stroke bg-white shadow-default">
        <Link
          href="/"
          className="flex justify-center"
          aria-label="Logo Faculté des Sciences El Jadida"
        >
          <Image
            src="/images/logo/logo_ucd.png"
            alt="Logo FS El Jadida"
            width={100}
            height={40}
            className="h-auto w-auto text-center"
            priority
          />
        </Link>

        <div className="flex flex-wrap items-center">
          <LeftSection />
          <div className="w-full border-stroke lg:w-1/2 lg:border-l">
            <div className="p-6 sm:p-12 xl:p-16">
              <div className="mb-8 text-center lg:hidden">
                <h1 className="text-xl font-bold text-gray-800">
                  Bureau d'Ordre Digital
                </h1>
              </div>
              <h2 className="mb-8 text-2xl font-bold text-primary">
                Connexion à votre compte
              </h2>
              {alert && <Alert message={alert.message} type={alert.type} />} 
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block font-medium text-gray-700"
                  >
                    Email professionnel
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="focus:shadow-input w-full rounded-lg border border-gray-300 bg-transparent px-6 py-4 text-gray-800 outline-none transition focus:border-primary"
                      placeholder="nom.prenom@fs.ucd.ac.ma"
                    />
                    <span className="absolute right-4 top-4 text-gray-400">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2.5 block font-medium text-gray-700"
                  >
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      className="focus:shadow-input w-full rounded-lg border border-gray-300 bg-transparent px-6 py-4 text-gray-800 outline-none transition focus:border-primary"
                      placeholder="Votre mot de passe"
                    />
                    <span className="absolute right-4 top-4 text-gray-400">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-6 py-4 text-white transition hover:bg-primary/90 focus:ring-2 focus:ring-primary/20"
                >
                  Se connecter
                </button>
                <p className="text-center text-sm text-gray-600">
                  En cas de problème de connexion, veuillez contacter
                  <br className="hidden sm:block" />
                  l'administrateur du système
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
