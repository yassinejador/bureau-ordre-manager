const mysql = require("mysql2/promise");

async function main() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
    });

    console.log("Connected to MySQL server.");

    await connection.query("DROP DATABASE IF EXISTS db_bureau_ordre_manager");
    await connection.query("CREATE DATABASE db_bureau_ordre_manager");
    await connection.query("USE db_bureau_ordre_manager");
    console.log("Database created and selected.");

    const createTablesQueries = [
      `CREATE TABLE roles (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(255) NOT NULL,
                date_creation DATE NOT NULL
            )`,
      `CREATE TABLE etablissements (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                intitule VARCHAR(255) NOT NULL,
                adresse VARCHAR(255) NOT NULL,
                ville VARCHAR(255) NOT NULL,
                fax BIGINT NOT NULL,
                telephone BIGINT NOT NULL
            )`,
      `CREATE TABLE Services (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                nom VARCHAR(255) NOT NULL,
                date_creation DATE NOT NULL
            )`,
      `CREATE TABLE etats (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                etat ENUM('En attente', 'Traite', 'Cloture') NOT NULL
            )`,
      `CREATE TABLE permissions (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                nom VARCHAR(255) NOT NULL,
                date_creation DATE NULL
            )`,
      `CREATE TABLE users (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                nom VARCHAR(255) NOT NULL,
                prenom VARCHAR(255) NOT NULL,
                role_id INT NOT NULL,
                etablissement_id INT NOT NULL,
                service_id INT NOT NULL,
                date_creation DATE NOT NULL,
                archived BOOLEAN NOT NULL DEFAULT FALSE
            )`,
      `CREATE TABLE departements (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                intitule VARCHAR(255) NOT NULL,
                responsable_id INT NOT NULL
            )`,
      `CREATE TABLE courriers (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                expediteur INT NOT NULL,
                type ENUM('Départ', 'Arrivé'),
                destination INT,
                traite_par INT NULL,
                objet TEXT NOT NULL,
                etat_id INT NOT NULL,
                date_creation DATE NOT NULL,
                date_suppression DATETIME NULL
            )`,
      `CREATE TABLE fichiers (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                type_courrier ENUM('confidentiel', 'urgent') NULL,
                type_support ENUM('papier', 'numerique') NULL,
                fichier VARCHAR(255) NOT NULL,
                courrier_id INT NOT NULL
            )`,
      `CREATE TABLE Logs (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                description TEXT NOT NULL,
                date_action DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
      `CREATE TABLE permissionDetails (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                role_id INT NOT NULL,
                permission_id INT NOT NULL,
                hasPermission BOOLEAN NOT NULL
            )`,
    ];

    for (const query of createTablesQueries) {
      await connection.query(query);
      console.log(`Table created: ${query.split("(")[0]}`);
    }

    const alterQueries = [
      `ALTER TABLE permissionDetails ADD CONSTRAINT permissiondetails_role_id_foreign FOREIGN KEY (role_id) REFERENCES roles(id)`,
      `ALTER TABLE users ADD CONSTRAINT users_service_id_foreign FOREIGN KEY (service_id) REFERENCES Services(id)`,
      `ALTER TABLE users ADD CONSTRAINT users_role_id_foreign FOREIGN KEY (role_id) REFERENCES roles(id)`,
      `ALTER TABLE fichiers ADD CONSTRAINT fichiers_courrier_id_foreign FOREIGN KEY (courrier_id) REFERENCES courriers(id)`,
      `ALTER TABLE Logs ADD CONSTRAINT logs_user_id_foreign FOREIGN KEY (user_id) REFERENCES users(id)`,
      `ALTER TABLE courriers ADD CONSTRAINT courriers_traite_par_foreign FOREIGN KEY (traite_par) REFERENCES users(id)`,
      `ALTER TABLE courriers ADD CONSTRAINT courriers_etat_id_foreign FOREIGN KEY (etat_id) REFERENCES etats(id)`,
      `ALTER TABLE departements ADD CONSTRAINT departements_responsable_id_foreign FOREIGN KEY (responsable_id) REFERENCES users(id)`,
      `ALTER TABLE courriers ADD CONSTRAINT courriers_destination_foreign FOREIGN KEY (destination) REFERENCES etablissements(id)`,
      `ALTER TABLE permissionDetails ADD CONSTRAINT permissiondetails_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES permissions(id)`,
      `ALTER TABLE courriers ADD CONSTRAINT courriers_expediteur_foreign FOREIGN KEY (expediteur) REFERENCES etablissements(id)`,
      `ALTER TABLE users ADD CONSTRAINT users_etablissement_id_foreign FOREIGN KEY (etablissement_id) REFERENCES etablissements(id)`,
    ];

    for (const query of alterQueries) {
      await connection.query(query);
      console.log(`Foreign key added: ${query.split("FOREIGN")[0]}`);
    }

    const insertQueries = [
      `INSERT INTO roles (role, date_creation) VALUES
                ('Direction', CURDATE()),
                ('Secrétariat général', CURDATE()),
                ('Agents administratifs', CURDATE())`,
      `INSERT INTO permissions (nom, date_creation) VALUES
                ('Consulter le tableau de bord', NOW()),
                ('Consulter un courrier', NOW()),
                ('Créer un courrier', NOW()),
                ('Modifier un courrier', NOW()),
                ('Archiver un courrier', NOW()),
                ('Supprimer un courrier', NOW()),
                ('Créer un utilisateur', NOW()),
                ('Modifier un utilisateur', NOW()),
                ('Supprimer un utilisateur', NOW()),
                ('Créer un rôle', NOW()),
                ('Modifier un rôle', NOW()),
                ('Supprimer un rôle', NOW()),
                ('Créer une permission', NOW()),
                ('Modifier une permission', NOW()),
                ('Supprimer une permission', NOW()),
                ('Affecter des permissions', NOW()),
                ('Créer un établissement', NOW()),
                ('Modifier un établissement', NOW()),
                ('Télécharger les informations de l’établissement', NOW()),
                ('Générer le rapport', NOW()),
                ('Acces Logs', NOW())`,
      `INSERT INTO etablissements (intitule, adresse, ville, fax, telephone) VALUES
                ('FS', '123 Rue A', 'VilleA', 123456789, 987654321),
                ('ENSA', '123 Rue A', 'VilleC', 123456789, 987654321),
                ('ENS', '123 Rue A', 'VilleD', 123456789, 987654321),
                ('ENCG', '456 Rue B', 'VilleB', 223456789, 887654321)`,
      `INSERT INTO Services (nom, date_creation) VALUES
                ('Service Courrier', CURDATE()),
                ('Service Informatique', CURDATE())`,
      `INSERT INTO users (email, password, nom, prenom, role_id, etablissement_id, service_id, date_creation) VALUES
                ('admin.admin@fs.ucd.ac.ma', '$2a$10$bFY46MRnYHQ8T67IvS6LB.C52Gw7U.WMmVj3Io8bwz84urK8WvJ2a', 'Admin', 'Admin', 1, 1, 1, CURDATE()),
                ('secretariat.secretariat@fs.ucd.ac.ma', '$2a$10$MHykQakpkoj5FrMCE1pz9uA7W.xwnjr/2PyC7WVGEtPHbINjC9yBK', 'Secrétariat', 'Secrétariat', 2, 2, 2, CURDATE()),
                ('agent.administratif@fs.ucd.ac.ma', '$2a$10$sVPE9lG9aCxfspDOKjo1Peu1F/h9amynXdEJCw628jRfAcBYXqKta', 'Agent', 'Administratif', 3, 2, 2, CURDATE())`,
      `INSERT INTO departements (intitule, responsable_id) VALUES
                ('Département A', 1),
                ('Département B', 2)`,
      `INSERT INTO etats (etat) VALUES
                ('En attente'),
                ('Traite'),
                ('Cloture')`,
      `INSERT INTO courriers (expediteur, type, destination, traite_par, objet, etat_id, date_creation) VALUES
                (1, 'Départ', 2, 1, 'Demande de renseignements', 1, '2025-02-06'),
                (1, 'Départ', 3, 1, 'Demande de renseignements2', 1, '2025-01-19'),
                (2, 'Arrivé', 1, 2, 'Réponse à la demande', 1, '2025-02-03'),
                (1, 'Départ', 4, 2, 'Réponse à la demande1', 2, '2024-01-25'),
                (3, 'Arrivé', 1, 2, 'Réponse à la demande 3', 3, '2025-01-07'),
                (4, 'Arrivé', 1, 2, 'Réponse à la demande 4', 2, '2025-02-08'),
                (4, 'Arrivé', 1, 2, 'Réponse à la demande 5', 1, '2025-01-01')`,
      `INSERT INTO fichiers (type_courrier, type_support, fichier, courrier_id) VALUES
                ('confidentiel', 'numerique', 'fichier1.pdf', 1),
                ('confidentiel', 'papier', 'fichier2.png', 1),
                ('confidentiel', 'numerique', 'fichier5.png', 1),
                ('confidentiel', 'papier', 'portfolio6.pdf', 1),
                ('urgent', 'numerique', 'fichier2.png', 2),
                ('confidentiel', 'papier', 'fichier3.png', 2),
                ('urgent', 'numerique', 'fichier4.png', 3),
                ('confidentiel', 'papier', 'fichier5.png', 5),
                ('urgent', 'numerique', 'fichier6.png', 5),
                ('confidentiel', 'papier', 'fichier2.png', 5),
                ('urgent', 'papier', '', 6)`,
      `INSERT INTO Logs (user_id, description, date_action) VALUES
                (1, 'Création de courrier', NOW()),
                (2, 'Modification de courrier', NOW())`,
      `INSERT INTO permissionDetails (role_id, permission_id, hasPermission) VALUES
                (1, 1, TRUE), (1, 2, TRUE), (1, 3, TRUE), (1, 4, TRUE), (1, 5, TRUE),
                (1, 6, TRUE), (1, 7, TRUE), (1, 8, TRUE), (1, 9, TRUE), (1, 10, TRUE),
                (1, 11, TRUE), (1, 12, TRUE), (1, 13, TRUE), (1, 14, TRUE), (1, 15, TRUE),
                (1, 16, TRUE), (1, 17, TRUE), (1, 18, TRUE), (1, 19, TRUE), (1, 20, TRUE),
                (1, 21, TRUE), (2, 7, TRUE), (2, 8, TRUE), (2, 9, TRUE), (2, 10, TRUE),
                (2, 11, TRUE), (2, 12, TRUE), (2, 17, TRUE), (2, 18, TRUE), (2, 19, TRUE),
                (2, 20, TRUE), (3, 2, TRUE), (3, 3, TRUE), (3, 4, TRUE), (3, 5, TRUE),
                (3, 6, TRUE)`,
      `INSERT INTO permissionDetails (role_id, permission_id, hasPermission)
                SELECT r.id, p.id, FALSE
                FROM roles r
                CROSS JOIN permissions p
                LEFT JOIN permissionDetails pd ON r.id = pd.role_id AND p.id = pd.permission_id
                WHERE pd.permission_id IS NULL`,
    ];

    for (const query of insertQueries) {
      await connection.query(query);
      console.log(`Data inserted: ${query.split("(")[0]}`);
    }

    console.log("Database setup completed successfully!");
  } catch (error) {
    console.error("Error during database setup:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("MySQL connection closed.");
    }
  }
}

main();
