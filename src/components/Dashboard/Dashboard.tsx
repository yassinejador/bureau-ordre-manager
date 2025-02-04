"use client";

import React from "react";
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
  },
  {
    title: "Utilisateurs",
    total: "50", 
    icon: "/images/icons/users-svgrepo-com.svg", 
  },
  {
    title: "Établissements",
    total: "2", 
    icon: "/images/icons/building-flag-svgrepo-com.svg", 
  },
];

const Dashboard: React.FC = () => {
  return (
    <>
    
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-lg bg-white p-6 shadow flex items-center space-x-4">
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
