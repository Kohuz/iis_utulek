USE shelter;

INSERT INTO users (name, surname, password, bank_account, is_caretaker)
VALUES
    ("Petr", "Pečovatel", "123456", "000", true);


INSERT INTO users (name, surname, password, is_volunteer)
VALUES
    ("Dan", "Dobrovolný", "another", true),
    ("Dora", "Dobrovolná", "another", true);


INSERT INTO users (name, surname, password, bank_account, is_veterinarian)
VALUES
    ("Václav","Veterinář", "doktor123", "001", true),
    ("Zdeněk","Zvěrolékař", "123doktro", "002", true);

INSERT INTO users (name, surname, password, bank_account, is_admin)
VALUES
    ("Adam", "Ajťákovič", "random", "003", true);


INSERT INTO animals (name, type, age)
VALUES
    ("Žofie", "Leguán", "3"),
    ("Alík", "Aligátor", "12"),
    ("Adam", "Pes", "5"),
    ("Izidora", "Kočka", "1"),
    ("Akuma", "Kočka", "3");


INSERT INTO events (date, commentary, type, start, stop, user_id, animal_id)
VALUES
    (
        DATE_ADD(CURDATE(), INTERVAL 1 DAY),
        "vaccination against rabies",
        "appointment",
        CONCAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), ' 11:00:00'),
        CONCAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), ' 12:00:00'),
        (SELECT user_id FROM users as u WHERE u.name = 'Petr'),
        (SELECT animal_id FROM animals as a WHERE a.name = 'Adam')
    ),
    (
        CURDATE(),
        "",
        "walk",
        CONCAT(CURDATE(), ' 9:00:00'),
        CONCAT(CURDATE(), ' 10:00:00'),
        (SELECT user_id FROM users as u WHERE u.name = 'Dan'),
        (SELECT animal_id FROM animals as a WHERE a.name = 'Alík')
    );
