"use client";
import { ApexOptions } from "apexcharts";
import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface GraphiqueEvolutionCourriersProps {
  dataByMonth: { [year: string]: { entrants: number[]; sortants: number[] } };
  dataByDay: {
    [year: string]: {
      [month: string]: {
        [day: string]: { entrants: number; sortants: number };
      };
    };
  };
}

interface LegacyProps {
  data: { [year: string]: { entrants: number[]; sortants: number[] } };
}

type Props = GraphiqueEvolutionCourriersProps | LegacyProps;

const moisFrancais = [
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
];

function hasNewProps(props: Props): props is GraphiqueEvolutionCourriersProps {
  return "dataByMonth" in props && "dataByDay" in props;
}

const GraphiqueEvolutionCourriers: React.FC<Props> = (props) => {
  const dataByMonth = hasNewProps(props) ? props.dataByMonth : props.data;
  const dataByDay = hasNewProps(props) ? props.dataByDay : {};

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [viewMode, setViewMode] = useState<"year" | "month">("year");
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(moisFrancais);
  const [maxValue, setMaxValue] = useState<number>(300);

  useEffect(() => {
    if (dataByMonth && Object.keys(dataByMonth).length > 0) {
      setSelectedYear(Object.keys(dataByMonth)[0]);
    }
  }, [dataByMonth]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year);
    setSelectedMonth("");
    setViewMode("year");
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setSelectedMonth(month);
    if (month) {
      setViewMode("month");
    } else {
      setViewMode("year");
    }
  };

  useEffect(() => {
    if (!selectedYear || !dataByMonth?.[selectedYear]) return;

    if (viewMode === "year") {
    
      setSeries([
        {
          name: "Courriers Entrants",
          data: dataByMonth[selectedYear].entrants,
        },
        {
          name: "Courriers Sortants",
          data: dataByMonth[selectedYear].sortants,
        },
      ]);
      setCategories(moisFrancais);

      const allData = [
        ...dataByMonth[selectedYear].entrants,
        ...dataByMonth[selectedYear].sortants,
      ];
      const maxVal = Math.max(...allData);
      setMaxValue(maxVal > 0 ? maxVal + 5 : 300);
    } else if (
      viewMode === "month" &&
      selectedMonth &&
      dataByDay?.[selectedYear]?.[selectedMonth]
    ) {
      const daysData = dataByDay[selectedYear][selectedMonth];

      const daysInMonth = new Date(
        parseInt(selectedYear),
        parseInt(selectedMonth),
        0,
      ).getDate();

      const entrantsData: number[] = [];
      const sortantsData: number[] = [];
      const dayLabels: string[] = [];

      for (let i = 1; i <= daysInMonth; i++) {
        const dayStr = i.toString();
        dayLabels.push(dayStr);

        if (daysData[dayStr]) {
          entrantsData.push(daysData[dayStr].entrants);
          sortantsData.push(daysData[dayStr].sortants);
        } else {
          entrantsData.push(0);
          sortantsData.push(0);
        }
      }

      setSeries([
        { name: "Courriers Entrants", data: entrantsData },
        { name: "Courriers Sortants", data: sortantsData },
      ]);
      setCategories(dayLabels);

      const allDayData = [...entrantsData, ...sortantsData];
      const maxDayVal = Math.max(...allDayData);
      setMaxValue(maxDayVal > 0 ? maxDayVal + 5 : 300);
    }
  }, [selectedYear, selectedMonth, viewMode, dataByMonth, dataByDay]);

  const options: ApexOptions = useMemo(() => {
    return {
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
        categories: categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: {
          text: "Nombre de courriers",
        },
        min: 0,
        max: maxValue,
      },
    };
  }, [categories, maxValue]);

  const availableMonths = useMemo(() => {
    if (!selectedYear || !dataByDay?.[selectedYear]) return [];
    return Object.keys(dataByDay[selectedYear]).sort(
      (a, b) => parseInt(a) - parseInt(b),
    );
  }, [selectedYear, dataByDay]);

  const canShowMonthSelector =
    hasNewProps(props) && Object.keys(dataByDay).length > 0;

  return (
    <div
      id="chartOne"
      className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8"
    >
      <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 sm:mb-0">
          Évolution des Courriers
        </h3>
        <div className="flex flex-col gap-2 sm:flex-row">
          {dataByMonth && Object.keys(dataByMonth).length > 0 && (
            <select
              className="form-select rounded"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {Object.keys(dataByMonth).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}

          {canShowMonthSelector && (
            <select
              className="form-select rounded"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">Tous les mois</option>
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {moisFrancais[parseInt(month) - 1]}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="-ml-5">
        {series.length > 0 && (
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width="100%"
          />
        )}
      </div>
    </div>
  );
};

export default GraphiqueEvolutionCourriers;
