
    use db_bureau_ordre_manager;

-- Insertion des rôles
INSERT INTO roles (role, date_creation) VALUES
('Direction', CURDATE()),
('Secrétariat général', CURDATE()),
('Responsables de départements', CURDATE()),
('Agents administratifs', CURDATE());

-- Insertion des permissions
INSERT INTO permissions (nom, date_creation) VALUES 
('Accéder au tableau de bord', now()),
('Créer un nouveau courrier arriver', now()),
('Créer un nouveau courrier depart', now()),
('Supprimer un courrier', now()),
('Archiver un courrier', now()),
('Générer des rapports mensuels et annuels', now()),
('Créer un role', now()),
('Gérer les permissions', now()),
('Consulter la liste des utilisateurs', now());


-- Insertion des établissements
INSERT INTO etablissements (intitule, adresse, ville, fax, telephone) VALUES
('FS', '123 Rue A', 'VilleA', 123456789, 987654321),
('ENSA', '123 Rue A', 'VilleC', 123456789, 987654321),
('ENS', '123 Rue A', 'VilleD', 123456789, 987654321),
('ENCG', '456 Rue B', 'VilleB', 223456789, 887654321);

-- Insertion des services
INSERT INTO Services (nom, date_creation) VALUES
('Service Courrier', CURDATE()),
('Service Informatique', CURDATE());

-- Insertion des utilisateurs
INSERT INTO users (email, password, nom, prenom, role_id, etablissement_id, service_id, date_creation) VALUES
('user.user@fs.ucd.ac.ma', '$2a$10$7C1/qUL/iMD8i.HUDzDABuuYXuxtZLI1hYnlgKlrXADRfANLpLBd6', 'Doe', 'John', 1, 1, 1, CURDATE()),
('user.user1@fs.ucd.ac.ma', '$2a$10$7C1/qUL/iMD8i.HUDzDABuuYXuxtZLI1hYnlgKlrXADRfANLpLBd6', 'Smith', 'Alice', 2, 2, 2, CURDATE());

-- Insertion des départements
INSERT INTO departements (intitule, responsable_id) VALUES
('Département A', 1),
('Département B', 2);

-- Insertion des états
INSERT INTO etats (etat) VALUES
('Enattente'),
('Traite'),
('Cloture');

-- Insertion des courriers
INSERT INTO courriers (expediteur, destination, traite_par, objet, etat_id, date_creation,type) VALUES
(1, 2, 1, 'Demande de renseignements', 1, now(),'Départ'),
(2, 1, 2, 'Réponse à la demande', 2, now(),'Arrivé');

-- Insertion des fichiers
INSERT INTO fichiers (type_courrier, type_support, fichier, courrier_id) VALUES
('confidentiel', 'numerique', 'file1.pdf', 1),
('urgent', 'papier', 'file2.pdf', 2);

-- Insertion des logs
INSERT INTO Logs (user_id, description, date_action) VALUES
(1, 'Création de courrier', CURDATE()),
(2, 'Modification de courrier', CURDATE());

-- Insertion des permissions détaillées
INSERT INTO permissionDetails (role_id, permission_id, hasPermission) VALUES
-- Rôle 1 :
(1, 1, TRUE),
(1, 2, TRUE),
(1, 3, TRUE),
(1, 4, TRUE),
(1, 5, TRUE),
(1, 6, TRUE),
(1, 7, TRUE),
(1, 8, TRUE),
(1, 9, TRUE),

-- Rôle 2 :
(2, 1, TRUE),
(2, 2, TRUE),
(2, 3, TRUE),
(2, 4, TRUE),
(2, 5, TRUE),
(2, 6, TRUE),
(2, 7, TRUE),
(2, 8, TRUE),
(2, 9, TRUE),

-- Rôle 3 :
(3, 1, TRUE),
(3, 2, TRUE),
(3, 3, TRUE),
(3, 4, TRUE),
(3, 5, TRUE),
(3, 6, TRUE),
(3, 7, TRUE),
(3, 8, TRUE),
(3, 9, TRUE),

-- Rôle 4 :
(4, 1, TRUE),
(4, 2, TRUE),
(4, 3, TRUE),
(4, 4, TRUE),
(4, 5, TRUE),
(4, 6, TRUE),
(4, 7, TRUE),
(4, 8, TRUE),
(4, 9, TRUE);
