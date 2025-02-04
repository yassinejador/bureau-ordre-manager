"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: [2, 2],
    curve: "smooth",
  },
  grid: {
    xaxis: {
      lines: { show: true },
    },
    yaxis: {
      lines: { show: true },
    },
  },
  dataLabels: { enabled: false },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    title: { text: "Nombre de courriers" },
    min: 0,
    max: 200,
  },
};

const ChartOne: React.FC = () => {
  // Données statiques pour les courriers entrants et sortants (remplacer plus tard par API)
  const series = [
    {
      name: "Courriers Entrants",
      data: [120, 90, 150, 130, 170, 110, 140, 160, 125, 135, 145, 155],
    },
    {
      name: "Courriers Sortants",
      data: [80, 60, 100, 95, 110, 75, 95, 105, 90, 100, 110, 120],
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <h3 className="text-lg font-semibold text-gray-800">
        Évolution des Courriers
      </h3>
      <div id="chartOne" className="-ml-5">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default ChartOne;
