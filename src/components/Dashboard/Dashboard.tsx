"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ChartTwo from "../Charts/ChartTwo";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";

interface Stat {
  title: string;
  total: string;
  icon: string;
}

const stats: Stat[] = [
  {
    title: "Courriers Entrants",
    total: "120",
    icon: "/images/icons/email-download-svgrepo-com.svg",
  },
  {
    title: "Courriers Sortants",
    total: "85",
    icon: "/images/icons/email-upload-svgrepo-com.svg",
  }
];

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<string>("0");
  const [etablissementCount, setEtablissementCount] = useState<string>("0");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        
        if (data.totalUsers) {
          setUserCount(data.totalUsers); 
        }

        if (data.totalEtablissements) {
          setEtablissementCount(data.totalEtablissements); 
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchCounts();
  }, []);

  const updatedStats = [
    ...stats,
    {
      title: "Utilisateurs",
      total: userCount, 
      icon: "/images/icons/users-svgrepo-com.svg",
    },
    {
      title: "Établissements",
      total: etablissementCount, // Nombre d'établissements dynamique
      icon: "/images/icons/building-flag-svgrepo-com.svg",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {updatedStats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 rounded-lg bg-white p-6 shadow"
          >
            <Image src={stat.icon} alt={stat.title} width={40} height={40} />
            <div>
              <p className="text-lg font-semibold">{stat.title}</p>
              <p className="text-xl font-bold">{stat.total}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartOne />
        <ChartThree />
      </div>
    </>
  );
};

export default Dashboard;
