"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface GraphiqueRépartitionCourriersProps {
  courriersEntrants: number;
  courriersSortants: number;
}

const GraphiqueRepartitionCourriers: React.FC<
  GraphiqueRépartitionCourriersProps
> = ({ courriersEntrants, courriersSortants }) => {
  const totalCourriers = courriersEntrants + courriersSortants;

  const percentEntrants =
    totalCourriers > 0
      ? ((courriersEntrants / totalCourriers) * 100).toFixed(1)
      : "0";
  const percentSortants =
    totalCourriers > 0
      ? ((courriersSortants / totalCourriers) * 100).toFixed(1)
      : "0";

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#3C50E0", "#80CAEE"],
    labels: ["Courriers Entrants", "Courriers Sortants"],
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: { enabled: false },
  };

  const series = [courriersEntrants, courriersSortants];

  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white p-6 shadow xl:col-span-4">
      <h5 className="text-lg font-semibold text-gray-800">
        Répartition des Courriers
      </h5>

      <div className="mt-4 flex justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={250}
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-y-3">
        <div className="flex w-full items-center space-x-2 sm:w-1/2">
          <span className="block h-3 w-3 rounded-full bg-[#3C50E0]"></span>
          <p className="text-sm font-medium text-gray-700">
            <span>Courriers Entrants</span>
            <span> {percentEntrants}%</span>
          </p>
        </div>

        <div className="flex w-full items-center space-x-2 sm:w-1/2">
          <span className="block h-3 w-3 rounded-full bg-[#80CAEE]"></span>
          <p className="text-sm font-medium text-gray-700 ">
            <span>Courriers Sortants</span>
            <span> {percentSortants}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GraphiqueRepartitionCourriers;
