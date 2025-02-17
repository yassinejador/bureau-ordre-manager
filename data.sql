use db_bureau_ordre_manager;

-- Insertion des rôles
INSERT INTO roles (role, date_creation) VALUES
('Direction', CURDATE()),
('Secrétariat général', CURDATE()),
('Responsables de départements', CURDATE()),
('Agents administratifs', CURDATE());

-- Insertion des permissions
INSERT INTO permissions (nom, date_creation) VALUES 
('Consulter le tableau de bord', NOW()),
-- Gestion des courriers
('Consulter un courrier', NOW()),
('Créer un courrier', NOW()),
('Modifier un courrier', NOW()),
('Archiver un courrier', NOW()),
('Supprimer un courrier', NOW()),
-- Gestion des utilisateurs
('Créer un utilisateur', NOW()),
('Modifier un utilisateur', NOW()),
('Supprimer un utilisateur', NOW()),
-- Gestion des rôles
('Créer un rôle', NOW()),
('Modifier un rôle', NOW()),
('Supprimer un rôle', NOW()),
-- Gestion des permissions
('Créer une permission', NOW()),
('Modifier une permission', NOW()),
('Supprimer une permission', NOW()),
('Affecter des permissions', NOW()),
-- Gestion des établissements
('Créer un établissement', NOW()),
('Modifier un établissement', NOW()),
('Télécharger les informations de l’établissement', NOW()),
-- Génération des rapports
('Générer le rapport', NOW()),
-- Logs
('Acces Logs', NOW());


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
 ('user.user@fs.ucd.ac.ma', '$2a$10$7C1/qUL/iMD8i.HUDzDABuuYXuxtZLI1hYnlgKlrXADRfANLpLBd6', 'Hassan', 'Ahmed', 1, 1, 1, CURDATE()),
('user.user1@fs.ucd.ac.ma', '$2a$10$2fcilhpvj4zlBw8RsVyvW.99N7JaJbTpot9Ln4/QZF1qwXAxIflKO', 'Ahmed', 'saferioui', 2, 2, 2, CURDATE());

-- Insertion des départements
INSERT INTO departements (intitule, responsable_id) VALUES
('Département A', 1),
('Département B', 2);

-- Insertion des états
INSERT INTO etats (etat) VALUES
('En attente'),
('Traite'),
('Cloture');

-- Insertion des courriers
INSERT INTO courriers (expediteur, type , destination, traite_par, objet, etat_id, date_creation) VALUES
(1,'Départ', 2, 1, 'Demande de renseignements', 1, '2025-02-06'),
(1,'Départ', 3, 1, 'Demande de renseignements2', 1, '2025-01-19'),
(2, 'Arrivé', 1, 2, 'Réponse à la demande', 1, '2025-02-03'),
(1, 'Départ', 4, 2, 'Réponse à la demande1', 2, '2024-01-25'),
(3, 'Arrivé', 1, 2, 'Réponse à la demande 3', 3, '2025-01-07'),
(4, 'Arrivé', 1, 2, 'Réponse à la demande 4', 2, '2025-02-08'),
(4, 'Arrivé', 1, 2, 'Réponse à la demande 5', 1, '2025-01-01');





-- Insertion des fichiers
INSERT INTO fichiers (type_courrier, type_support, fichier, courrier_id) VALUES
('confidentiel', 'numerique', 'fichier1.pdf
', 1),
('confidentiel', 'papier', 'fichier2.png
', 1),
('confidentiel', 'numerique', 'fichier5.png
', 1),
('confidentiel', 'papier', 'portfolio6.pdf
', 1),
('urgent', 'numerique', 'fichier2.png
', 2),
('confidentiel', 'papier', 'fichier3.png
', 2),
('urgent', 'numerique', 'fichier4.png
', 3),
('confidentiel', 'papier', 'fichier5.png
', 5),
('urgent', 'numerique', 'fichier6.png
', 5),
('confidentiel', 'papier', 'fichier2.png
', 5),
('urgent', 'papier', '
', 6);

-- Insertion des logs
INSERT INTO Logs (user_id, description, date_action) VALUES
(1, 'Création de courrier', CURDATE()),
(2, 'Modification de courrier', CURDATE());

-- Insertion des permissions détaillées  
INSERT INTO permissionDetails (role_id, permission_id, hasPermission) VALUES  

-- Direction (role_id = 1) - A toutes les permissions  
(1, 1, TRUE),  -- Consulter le tableau de bord  
(1, 2, TRUE),  -- Consulter un courrier  
(1, 3, TRUE),  -- Créer un courrier  
(1, 4, TRUE),  -- Modifier un courrier  
(1, 5, TRUE),  -- Archiver un courrier  
(1, 6, TRUE),  -- Supprimer un courrier  
(1, 7, TRUE),  -- Créer un utilisateur  
(1, 8, TRUE),  -- Modifier un utilisateur  
(1, 9, TRUE),  -- Supprimer un utilisateur  
(1, 10, TRUE), -- Créer un rôle  
(1, 11, TRUE), -- Modifier un rôle  
(1, 12, TRUE), -- Supprimer un rôle  
(1, 13, TRUE), -- Créer une permission  
(1, 14, TRUE), -- Modifier une permission  
(1, 15, TRUE), -- Supprimer une permission  
(1, 16, TRUE), -- Affecter des permissions  
(1, 17, TRUE), -- Créer un établissement  
(1, 18, TRUE), -- Modifier un établissement  
(1, 19, TRUE), -- Télécharger les informations de l’établissement  
(1, 20, TRUE), -- Générer le rapport  

-- Secrétariat général (role_id = 2) - Gestion des utilisateurs, rôles et établissements 
(2, 7, TRUE),  -- Créer un utilisateur  
(2, 8, TRUE),  -- Modifier un utilisateur  
(2, 9, TRUE),  -- Supprimer un utilisateur  
(2, 10, TRUE), -- Créer un rôle  
(2, 11, TRUE), -- Modifier un rôle  
(2, 12, TRUE), -- Supprimer un rôle  
(2, 17, TRUE), -- Créer un établissement  
(2, 18, TRUE), -- Modifier un établissement  
(2, 19, TRUE), -- Télécharger les informations de l’établissement  
(2, 20, TRUE), -- Générer le rapport  

-- Agent administratif (role_id = 3) - Gestion des courriers uniquement  
(3, 2, TRUE),  -- Consulter un courrier  
(3, 3, TRUE),  -- Créer un courrier  
(3, 4, TRUE),  -- Modifier un courrier  
(3, 5, TRUE),  -- Archiver un courrier  
(3, 6, TRUE);  -- Supprimer un courrier  

