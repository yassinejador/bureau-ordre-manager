import { SERVICE } from "@/types/service";
import dateformat from "../../../helpers/dateformat";
import Link from "next/link";

const TableServices = ({ services }: { services: SERVICE[] }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Services</h4>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-3 sm:grid-cols-3 rounded-sm bg-gray-200 dark:bg-meta-4">
          <div className="p-3 text-center font-medium uppercase text-black dark:text-white">id</div>
          <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Nom</div>
          <div className="p-3 text-center font-medium uppercase text-black dark:text-white">Date de creation</div>
        </div>

        {/* Table Rows */}
        {services.map((service) => (
          <div
            key={service.id}
            className={`grid grid-cols-3 sm:grid-cols-3 items-center border-b border-stroke dark:border-strokedark last:border-b-0`}
          >
            <div className="p-3 text-center text-black dark:text-white">{service.id}</div>
            <div className="p-3 text-center text-black dark:text-white">{service.nom}</div>
            <div className="p-3 text-center text-black dark:text-white">{dateformat(new Date(service.date_creation))}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700">
          <Link href="/forms/form-ajouter-service">
            Ajouter un nouveau service
          </Link>
        </button>
      </div>
    </div>
  );
};

export default TableServices;
