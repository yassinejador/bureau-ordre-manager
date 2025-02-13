import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProfileComponent from "@/components/profile/ProfileComponent";

export const metadata: Metadata = {
  title: "Mon Profil",
  description: "Consultez et mettez à jour votre profil utilisateur.",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Profil" />
      </div>
      <ProfileComponent />
    </DefaultLayout>
  );
};

export default Profile;
