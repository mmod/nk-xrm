CREATE SCHEMA IF NOT EXISTS `mmdev` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
CREATE USER 'mmdadm'@'localhost' IDENTIFIED BY '^DevPass777$';
GRANT ALL ON `mmdev`.* TO 'mmdadm'@'localhost';

CREATE TABLE IF NOT EXISTS `mmdev`.`users`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` INT NULL,
  `acl` INT NULL,
  `ts` DATETIME NULL,
  `luts` DATETIME NULL,
  `luby` INT NULL,
  `username` VARCHAR(255) NULL,
  `password` TEXT NULL,
  `first` VARCHAR(100) NULL,
  `middle` VARCHAR(45) NULL,
  `last` VARCHAR(100) NULL,
  `email` TEXT NULL,
  `context` INT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `mmdev`.`users` 
( `type`, `acl`, `ts`, `luts`, `username`, `password`, `first`, `last`, `email`, `context` )
VALUES
( 1, 2, NOW(), NOW(), 'rik', '<REPLACEWITHYOURPASSWORDHASH>', 'Richard', 'Winters', 'rik@mmogp.com', 1 );

CREATE TABLE IF NOT EXISTS `mmdev`.`elevated`
(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user` INT NOT NULL,
    `secure` TEXT NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `mmdev`.`elevated`
( `user`, `secure` )
VALUES
( 1, 'REPLACEWITHYOURPASSWORDHASH>' );

CREATE TABLE IF NOT EXISTS `mmdev`.`contexts`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` INT NULL,
  `acl` INT NULL,
  `ts` DATETIME NULL,
  `owner` int NULL,
  `company` int NULL,
  `location` int NULL,
  `luts` DATETIME NULL,
  `luby` INT NULL,
  `add1` TEXT NULL,
  `add2` TEXT NULL,
  `city` VARCHAR(255) NULL,
  `state` VARCHAR(255) NULL,
  `country` VARCHAR(255) NULL,
  `zip` VARCHAR(45) NULL,
  `email` TEXT NULL,
  `phone` VARCHAR(45) NULL,
  `fax` VARCHAR(45) NULL,
  `ext` VARCHAR(10),
  PRIMARY KEY (`id`)
);

INSERT INTO `mmdev`.`contexts` 
( `type`, `acl`, `ts`, `owner`, `luts`, `add1`, `add2`, `city`, `state`, `country`, `zip`, `email`, `phone` )
VALUES
( 0, 2, NOW(), 1, NOW(), '10 Fake Avenue', 'Apt 1', 'Oneonta', 'NY', 'USA', '13820-1246', 'rik@mmogp.com', '607-555-5555' );

CREATE TABLE IF NOT EXISTS `mmdev`.`companies`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` INT NULL,
  `ts` DATETIME NULL,
  `owner` int NULL,
  `luts` DATETIME NULL,
  `luby` INT NULL,
  `name` TEXT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `mmdev`.`companies` 
( `ts`, `owner`, `luts`, `name`, `description` )
VALUES
( NOW(), 1, NOW(), 'Massively Modified, Inc.', 'Custom computer programming services. Game and Simulation specialization.' );

CREATE TABLE IF NOT EXISTS `mmdev`.`locations`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` INT NULL,
  `ts` DATETIME NULL,
  `company` int NULL,
  `luts` DATETIME NULL,
  `luby` INT NULL,
  `name` TEXT NULL,
  `description` TEXT NULL,
  `add1` TEXT NULL,
  `add2` TEXT NULL,
  `city` VARCHAR(255) NULL,
  `state` VARCHAR(255) NULL,
  `country` VARCHAR(255) NULL,
  `zip` VARCHAR(45) NULL,
  `email` TEXT NULL,
  `phone` VARCHAR(45) NULL,
  `ext` VARCHAR(10),
  PRIMARY KEY (`id`)
);

INSERT INTO `mmdev`.`locations` 
( `type`,  `ts`, `company`, `luts`, `name`, `description`, `add1`, `add2`, `city`, `state`, `country`, `zip`, `email`, `phone` )
VALUES
( 0, NOW(), 1, NOW(), 'Headquarters', 'Corporate office in Hometown, NY.', '10 Fake Avenue', 'Unit 1', 'Oneonta', 'NY', 'USA', '13820-1246', 'support@mmogp.com', '607-441-3319' );

INSERT INTO `mmdev`.`contexts` 
( `type`, `acl`, `ts`, `owner`, `company`, `location`, `luts`, `email`, `phone`, `fax` )
VALUES
( 1, 2, NOW(), 1, 1, 1, NOW(), 'rik@mmogp.com', '607-441-3319', '877-267-0412' );


CREATE SCHEMA IF NOT EXISTS `mmpro` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;

CREATE USER 'mmpadm'@'localhost' IDENTIFIED BY '^ProPass777$';
GRANT ALL ON `mmpro`.* TO 'mmpadm'@'localhost';

CREATE TABLE `mmpro`.`users` LIKE `mmdev`.`users`;
INSERT INTO `mmpro`.`users` SELECT * FROM `mmdev`.`users`;

CREATE TABLE `mmpro`.`elevated` LIKE `mmdev`.`elevated`;
INSERT INTO `mmpro`.`elevated` SELECT * FROM `mmdev`.`elevated`;

CREATE TABLE `mmpro`.`contexts` LIKE `mmdev`.`contexts`;
INSERT INTO `mmpro`.`contexts` SELECT * FROM `mmdev`.`contexts`;

CREATE TABLE `mmpro`.`companies` LIKE `mmdev`.`companies`;
INSERT INTO `mmpro`.`companies` SELECT * FROM `mmdev`.`companies`;

CREATE TABLE `mmpro`.`locations` LIKE `mmdev`.`locations`;
INSERT INTO `mmpro`.`locations` SELECT * FROM `mmdev`.`locations`;
