import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SwitcherThree from "@/components/Switchers/SwitcherFour";

export const metadata: Metadata = {
  title: "Permissions",
  description:
    "Les permissions de ce role",
};

const Permissions = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ajouter un role" />
        <SwitcherThree />
    </DefaultLayout>
  );
};

export default Permissions;
