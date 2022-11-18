CREATE DATABASE IF NOT EXISTS shelter;

USE shelter;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_event;
DROP TABLE IF EXISTS user_request;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS animals;
DROP TABLE IF EXISTS animal_event;
DROP TABLE IF EXISTS animal_request;
DROP TABLE IF EXISTS requests;



-- Event related tables

CREATE TABLE events (
    event_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    -- NOTE: in javascript models use DATE() filter function
    date DATETIME,
    commentary VARCHAR(1024) DEFAULT "",
    type VARCHAR(255) DEFAULT "",
    start DATETIME,
    stop DATETIME,
    state VARCHAR(255) DEFAULT "pending",
    PRIMARY KEY (event_id)
);



-- Request related tables

CREATE TABLE requests (
    request_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    date DATETIME,
    commentary VARCHAR(1024) DEFAULT "",
    type VARCHAR(255) DEFAULT "",
    -- NOTE: valid values are pending|approved|rejected
    state VARCHAR(255) DEFAULT "pending",
    PRIMARY KEY (request_id)
);



-- User tables

CREATE TABLE users (
    user_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT "",
    surname VARCHAR(255) DEFAULT "",
    password VARCHAR(255) DEFAULT "",
    bank_acc_no INTEGER,
    is_volunteer BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false,
    is_caretaker BOOLEAN DEFAULT false,
    is_veterinarian BOOLEAN DEFAULT false,
    verified BOOLEAN DEFAULT false,
    PRIMARY KEY (user_id)
);

ALTER TABLE events ADD (
    -- AUTO_INCREMENTS guarantees, that ID values are going to start at 1
    user_id INTEGER UNSIGNED DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

ALTER TABLE requests ADD (
    user_id INTEGER UNSIGNED DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_event (
    user_id INTEGER UNSIGNED NOT NULL,
    event_id INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE user_request (
    user_id INTEGER UNSIGNED NOT NULL,
    request_id INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, request_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (request_id) REFERENCES requests(request_id)
);



-- Animal related tables

CREATE TABLE animals (
    animal_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT "",
    type VARCHAR(255) DEFAULT "",
    commentary VARCHAR(1024) DEFAULT "",
    age INTEGER,
    state VARCHAR(255) DEFAULT "sheltered",
    -- NOTE: isn't it redundant with the state field above?
    borrowed BOOLEAN DEFAULT false,
    PRIMARY KEY (animal_id)
);

ALTER TABLE events ADD (
    animal_id INTEGER UNSIGNED DEFAULT 0,
    FOREIGN KEY (animal_id) REFERENCES animals(animal_id)
);

ALTER TABLE requests ADD (
    animal_id INTEGER UNSIGNED DEFAULT 0,
    FOREIGN KEY (animal_id) REFERENCES animals(animal_id)
);

CREATE TABLE animal_event (
    animal_id INTEGER UNSIGNED NOT NULL,
    event_id INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (animal_id, event_id),
    FOREIGN KEY (animal_id) REFERENCES animals(animal_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE animal_request (
    animal_id INTEGER UNSIGNED NOT NULL,
    request_id INTEGER UNSIGNED NOT NULL,
    PRIMARY KEY (animal_id, request_id),
    FOREIGN KEY (animal_id) REFERENCES animals(animal_id),
    FOREIGN KEY (request_id) REFERENCES requests(request_id)
);
