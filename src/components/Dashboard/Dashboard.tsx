import Image from "next/image";
import GraphiqueEvolutionCourriers from "../Charts/GraphiqueEvolutionCourriers";
import GraphiqueRepartitionCourriers from "../Charts/GraphiqueRepartitionCourriers";
import { getUserCount } from "../../../lib/queries/users";
import { getEtablissementCount } from "../../../lib/queries/etablissements";
import { getCourriersCountByType } from "../../../lib/queries/courriers";
import { getCourriersData } from "../../../lib/queries/courriers"; // Mise à jour de l'import
import GenererRapport from "@/components/Gen/GenererRapport";

const Dashboard = async () => {
  const totalUsers = await getUserCount();
  const totalEtablissements = await getEtablissementCount();
  const courriersCount = await getCourriersCountByType();
  const courriersDataComplete = await getCourriersData();

  const stats = [
    {
      title: "Courriers Entrants",
      total: courriersCount["Arrivé"] || 0,
      icon: "/images/icons/email-download-svgrepo-com.svg",
    },
    {
      title: "Courriers Sortants",
      total: courriersCount["Départ"] || 0,
      icon: "/images/icons/email-upload-svgrepo-com.svg",
    },
    {
      title: "Utilisateurs",
      total: totalUsers || 0,
      icon: "/images/icons/users-svgrepo-com.svg",
    },
    {
      title: "Établissements",
      total: totalEtablissements || 0,
      icon: "/images/icons/building-flag-svgrepo-com.svg",
    },
  ];

  return (
    <>
      <GenererRapport
        totalUsers={totalUsers}
        totalEtablissements={totalEtablissements}
        courriersDepartCount={courriersCount["Départ"]}
        courriersAriveesCount={courriersCount["Arrivé"]}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 rounded-lg bg-white p-6 shadow"
          >
            <Image src={stat.icon} alt={stat.title} width={40} height={40} />
            <div>
              <p className="text-lg font-semibold">{stat.title}</p>
              <p className="text-xl font-bold">{stat.total}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <GraphiqueEvolutionCourriers
          dataByMonth={courriersDataComplete.byMonth}
          dataByDay={courriersDataComplete.byDay}
        />
        <GraphiqueRepartitionCourriers
          courriersEntrants={courriersCount["Arrivé"] || 0}
          courriersSortants={courriersCount["Départ"] || 0}
        />
      </div>
    </>
  );
};

export default Dashboard;
