DROP DATABASE IF EXISTS db_bureau_ordre_manager;
create DATABASE db_bureau_ordre_manager;

use db_bureau_ordre_manager;

CREATE TABLE `users`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `prenom` VARCHAR(255) NOT NULL,
    `role_id` INT NOT NULL,
    `etablissement_id` INT NOT NULL,
    `service_id` INT NOT NULL,
    `date_creation` DATE NOT NULL
);
CREATE TABLE `departements`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `intitule` VARCHAR(255) NOT NULL,
    `responsable_id` INT NOT NULL
);
CREATE TABLE `fichiers`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type_courrier` ENUM('confidentiel', 'urgent')  NULL,
    `type_support` ENUM('papier', 'numerique')  NULL,
    `fichier` VARCHAR(255) NOT NULL,
    `courrier_id` INT NOT NULL
);
CREATE TABLE `etablissements`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `intitule` VARCHAR(255) NOT NULL,
    `adresse` VARCHAR(255) NOT NULL,
    `ville` VARCHAR(255) NOT NULL,
    `fax` BIGINT NOT NULL,
    `telephone` BIGINT NOT NULL
);
CREATE TABLE `courriers`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `expediteur` INT  NULL,
    `destination` INT  NULL,
    `traite_par` INT  NULL,
    `objet` TEXT NOT NULL,
    `etat_id` INT  NULL,
    `date_creation` DATE  NULL,
    `date_suppression` DATETIME NULL,
    `type` ENUM('Départ', 'Arrivé') NOT NULL
);

CREATE TABLE `etats`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `etat` ENUM('Enattente', 'Traite', 'Cloture') NOT NULL
);
CREATE TABLE `roles`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` VARCHAR(255) NOT NULL,
    `date_creation` DATE NOT NULL
);
CREATE TABLE `permissions`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nom` VARCHAR(255) NOT NULL,
    `date_creation` DATE NOT NULL
);
CREATE TABLE `Services`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nom` VARCHAR(255) NOT NULL,
    `date_creation` DATE NOT NULL
);
CREATE TABLE `Logs`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `description` TEXT NOT NULL,
    `date_action` DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `permissionDetails`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role_id` INT NOT NULL,
    `permission_id` INT NOT NULL,
    `hasPermission` BOOLEAN NOT NULL
);
ALTER TABLE
    `permissionDetails` ADD CONSTRAINT `permissiondetails_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `roles`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_service_id_foreign` FOREIGN KEY(`service_id`) REFERENCES `Services`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `roles`(`id`);
ALTER TABLE
    `fichiers` ADD CONSTRAINT `fichiers_courrier_id_foreign` FOREIGN KEY(`courrier_id`) REFERENCES `courriers`(`id`);
ALTER TABLE
    `Logs` ADD CONSTRAINT `logs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `courriers` ADD CONSTRAINT `courriers_traite_par_foreign` FOREIGN KEY(`traite_par`) REFERENCES `users`(`id`);
ALTER TABLE
    `courriers` ADD CONSTRAINT `courriers_etat_id_foreign` FOREIGN KEY(`etat_id`) REFERENCES `etats`(`id`);
ALTER TABLE
    `departements` ADD CONSTRAINT `departements_responsable_id_foreign` FOREIGN KEY(`responsable_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `courriers` ADD CONSTRAINT `courriers_destination_foreign` FOREIGN KEY(`destination`) REFERENCES `etablissements`(`id`);
ALTER TABLE
    `permissionDetails` ADD CONSTRAINT `permissiondetails_permission_id_foreign` FOREIGN KEY(`permission_id`) REFERENCES `permissions`(`id`);
ALTER TABLE
    `courriers` ADD CONSTRAINT `courriers_expediteur_foreign` FOREIGN KEY(`expediteur`) REFERENCES `etablissements`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_etablissement_id_foreign` FOREIGN KEY(`etablissement_id`) REFERENCES `etablissements`(`id`);
    