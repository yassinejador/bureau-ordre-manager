import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Historique from "@/components/Tables/Historique";

const LogPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Historiques" />
      <div className="flex flex-col gap-10">
        <Historique />
      </div>
    </DefaultLayout>
  );
};

export default LogPage;