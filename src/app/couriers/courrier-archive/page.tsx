import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableCourriersArchive from "@/components/Tables/TableCourriersArchive";


const CourRierArchive = () => {

return (
  <DefaultLayout>
    <Breadcrumb pageName="Les Couriers Archivées" />
    <div className="flex flex-col gap-10">
      <TableCourriersArchive />
    </div>
  </DefaultLayout>
);
};
export default CourRierArchive;