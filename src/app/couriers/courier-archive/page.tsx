import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableCouriersArchive from "@/components/Tables/TableCouriersArchive";


const CourierArchive = () => {

return (
  <DefaultLayout>
    <Breadcrumb pageName="Les Couriers Archivées" />
    <div className="flex flex-col gap-10">
      <TableCouriersArchive />
    </div>
  </DefaultLayout>
);
};
export default CourierArchive;