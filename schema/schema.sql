CREATE DATABASE IF NOT EXISTS shelter;

USE shelter;

DROP TABLE IF EXISTS minimal_user;

CREATE TABLE minimal_user (
    name VARCHAR(255) DEFAULT "",
    surname VARCHAR(255) DEFAULT "",
    house_no INTEGER,
    post_serial_no INTEGER,
    bank_acc_no INTEGER,
    email VARCHAR(255)
);

CREATE TABLE admin AS (SELECT * FROM minimal_user);
ALTER TABLE admin ADD (
    admin_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    CONSTRAINT PRIMARY KEY (admin_id)
);

CREATE TABLE caretaker AS (SELECT * FROM minimal_user);
ALTER TABLE caretaker ADD (
    caretaker_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    CONSTRAINT PRIMARY KEY (caretaker_id)
);

CREATE TABLE nonregistered AS (SELECT * FROM minimal_user);
ALTER TABLE nonregistered ADD (
    nonregistered_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    CONSTRAINT PRIMARY KEY (nonregistered_id)
);

CREATE TABLE walk (
    walk_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    start DATE,
    end DATE,
    PRIMARY KEY (walk_id)
);

CREATE TABLE reservation (
    reservation_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (reservation_id)
);

CREATE TABLE animal (
    animal_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT "",
    type VARCHAR(255) DEFAULT "",
    photo VARCHAR(255) DEFAULT "", -- Probably not
    age INTEGER UNSIGNED,
    PRIMARY KEY (animal_id)
);

CREATE TABLE animal_event (
    animal_event_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    date DATE,
    commentary VARCHAR(1024) DEFAULT "",
    type VARCHAR(255),
    PRIMARY KEY (animal_event_id)
)
