import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Ajouter Service",
  description:
    "Formulaire pour Ajouter un service",
};

const FormLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ajouter un service" />

      <div className="flex justify-center  bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-boxdark">
        <h3 className="mb-6 text-xl font-semibold text-black dark:text-white text-center">
          Ajouter un service
        </h3>
        <form action="#">
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Nom
            </label>
            <input
              type="text"
              placeholder="Nom de service"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <button className="w-full rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">
            Ajouter
          </button>
        </form>
      </div>
    </div>
    </DefaultLayout>
  );
};

export default FormLayout;
