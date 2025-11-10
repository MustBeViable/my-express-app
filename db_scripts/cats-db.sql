DROP DATABASE IF EXISTS cat_database;
CREATE DATABASE cat_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cat_database;

CREATE TABLE `wsk_users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(191) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_username` (`username`),
  UNIQUE KEY `uq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `wsk_cats` (
  `cat_id` INT(11) NOT NULL AUTO_INCREMENT,
  `cat_name` VARCHAR(255) NOT NULL,
  `weight` FLOAT NOT NULL,
  `owner` INT(11) NOT NULL,
  `filename` VARCHAR(255) NOT NULL,
  `birthdate` DATE DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `wsk_users` (`user_id`, `name`, `username`, `email`, `password`, `role`) VALUES
(1, 'Administrator', 'admin', 'admin@metropolia.fi', '$2a$10$5RzpyimIeuzNqW7G8seBiOzBiWBvrSWroDomxMa0HzU6K2ddSgixS', 'admin'),
(37, 'Test User', 'john', 'john@metropolia.fi', '$2a$10$5RzpyimIeuzNqW7G8seBiOzBiWBvrSWroDomxMa0HzU6K2ddSgixS', 'user');

INSERT INTO `wsk_cats` (`cat_id`, `cat_name`, `weight`, `owner`, `filename`, `birthdate`) VALUES
(41, 'Siiri', 4, 37, 'some_filename', '2010-03-05');

ALTER TABLE `wsk_users` AUTO_INCREMENT = 38;
ALTER TABLE `wsk_cats`  AUTO_INCREMENT = 43;

ALTER TABLE `wsk_cats`
  ADD KEY `idx_owner` (`owner`);

ALTER TABLE `wsk_cats`
  ADD CONSTRAINT `fk_owner_user_id`
    FOREIGN KEY (`owner`) REFERENCES `wsk_users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE;