import { RowDataPacket } from "mysql2";
import pool from "../db";

export const addCourriers = async (
  expediteur: number,
  destination: number,
  traite_par: number,
  objet: string,
  etat_id: number,
  date_creation: string,
  type: "Départ" | "Arrivé",
  type_courrier: "confidentiel" | "urgent",
  type_support: "papier" | "numerique",
  fichiers: string[],
) => {
  const [result] = (await pool.query(
    "INSERT INTO courriers (expediteur, destination, traite_par, objet, etat_id, date_creation, type) VALUES (?, ?, ?, ?, ?, ?,?)",
    [expediteur, destination, traite_par, objet, etat_id, date_creation, type],
  )) as any;

  for (const cheminFichier of fichiers) {
    await pool.query(
      "INSERT INTO fichiers (type_courrier, type_support, fichier, courrier_id) VALUES (?, ?, ?, ?)",
      [type_courrier, type_support, cheminFichier, result.insertId],
    );
  }

  return result;
};

export const getCourriersCountByType = async () => {
  const [results] = await pool.query<RowDataPacket[]>(
    "SELECT type, COUNT(*) AS total FROM courriers GROUP BY type",
  );

  const counts: Record<string, number> = {
    Départ: 0,
    Arrivé: 0,
  };

  (results as RowDataPacket[]).forEach((row) => {
    counts[row.type] = row.total;
  });

  return counts;
};

export const getCourriersDataByYearMonth = async () => {
  const [results] = await pool.query<RowDataPacket[]>(
    `SELECT 
        YEAR(date_creation) AS year, 
        MONTH(date_creation) AS month, 
        type, 
        COUNT(*) AS count
     FROM courriers 
     GROUP BY YEAR(date_creation), MONTH(date_creation), type
     ORDER BY year, month, type`,
  );

  const courriersData: {
    [year: string]: { entrants: number[]; sortants: number[] };
  } = {};

  results.forEach(
    (row: { year: string; month: number; type: string; count: number }) => {
      if (!courriersData[row.year]) {
        courriersData[row.year] = {
          entrants: Array(12).fill(0),
          sortants: Array(12).fill(0),
        };
      }

      if (row.type === "Arrivé") {
        courriersData[row.year].entrants[row.month - 1] = row.count;
      } else if (row.type === "Départ") {
        courriersData[row.year].sortants[row.month - 1] = row.count;
      }
    },
  );

  return courriersData;
};
