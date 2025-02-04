import CourrierDetails from "@/components/courrierdetails/CourrierDetails";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const DetailsPage = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Détails de Courier Archivée" />      
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CourrierDetails />
    </div>
  </DefaultLayout>
    
    
  );
};

export default DetailsPage;
