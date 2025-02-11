"use client";
import { ApexOptions } from "apexcharts";
import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface GraphiqueEvolutionCourriersProps {
  data: { [year: string]: { entrants: number[]; sortants: number[] } };
}

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
    max: 300, // This will be dynamically updated
  },
};

const GraphiqueEvolutionCourriers: React.FC<GraphiqueEvolutionCourriersProps> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState<string>(Object.keys(data)[0]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const series = [
    { name: "Courriers Entrants", data: data[selectedYear].entrants },
    { name: "Courriers Sortants", data: data[selectedYear].sortants },
  ];

  // Calcul dynamique du maximum
  const maxCourrierValue = useMemo(() => {
    const allData = [...data[selectedYear].entrants, ...data[selectedYear].sortants];
    const maxValue = Math.max(...allData);
    return maxValue + 5; // Ajouter 5 au max
  }, [data, selectedYear]);

  // Mise à jour des options pour yaxis avec max dynamique
  const updatedOptions = {
    ...options,
    yaxis: {
      ...options.yaxis,
      max: maxCourrierValue,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Évolution des Courriers</h3>
        <div className="mb-4">
          <select className="form-select" value={selectedYear} onChange={handleYearChange}>
            {Object.keys(data).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div id="chartOne" className="-ml-5">
        <ReactApexChart
          options={updatedOptions}
          series={series}
          type="area"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default GraphiqueEvolutionCourriers;
