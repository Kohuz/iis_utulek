USE shelter;

INSERT INTO users (email, name, surname, password, bank_account, is_caretaker)
VALUES
    (
        'petr@test.test',
        'Petr',
        'Pečovatel',
        '$2b$10$ZgDyhKAsE97AeBLXDQW20u', -- 123456
        '000',
        true
    );


INSERT INTO users (email, name, surname, password, is_volunteer)
VALUES
    (
        'dobrovolny@test.test',
        'Dan',
        'Dobrovolný',
        '$2b$10$hI5Yxn33SOQpaAKq0JrcNe', -- another
        true
    ),
    (
        'dobrovolna@test.test',
        'Dora',
        'Dobrovolná',
        '$2b$10$Bm3GBVbfcwic.KZKahTS6O', -- another
        true
    );


INSERT INTO users (email, name, surname, password, bank_account, is_veterinarian)
VALUES
    (
        'doctor1@veterinar-test.test',
        'Václav',
        'Veterinář',
        '$2b$10$PKSEMh0GjycDvgfReeAw4u', -- doktor123
        '001',
        true
    ),
    (
        'doctor2@veterinar-test.test',
        'Zdeněk',
        'Zvěrolékař',
        '$2b$10$YAzTa63qSWdkkzalfCJVue', -- 123doktro
        '002',
        true
    );


INSERT INTO users (email, name, surname, password, bank_account, is_admin, is_veterinarian)
VALUES
    (
        'adam.admin@test.test',
        'Adam',
        'Ajťákovič',
        '$2b$10$zq96t797FUjNRmBGe8S7hu', -- random
        '003',
        true,
        true
    );


INSERT INTO animals (name, type, age)
VALUES
    ('Žofie', 'Leguán', '3'),
    ('Alík', 'Aligátor', '12'),
    ('Adam', 'Pes', '5'),
    ('Izidora', 'Kočka', '1'),
    ('Akuma', 'Kočka', '3');


INSERT INTO events (date, commentary, type, start, stop, user_id, animal_id)
VALUES
    (
        DATE_ADD(CURDATE(), INTERVAL 1 DAY),
        'vaccination against rabies',
        'appointment',
        CONCAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), ' 11:00:00'),
        CONCAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), ' 12:00:00'),
        (SELECT user_id FROM users as u WHERE u.name = 'Petr'),
        (SELECT animal_id FROM animals as a WHERE a.name = 'Adam')
    ),
    (
        CURDATE(),
        '',
        'walk',
        CONCAT(CURDATE(), ' 9:00:00'),
        CONCAT(CURDATE(), ' 10:00:00'),
        (SELECT user_id FROM users as u WHERE u.name = 'Dan'),
        (SELECT animal_id FROM animals as a WHERE a.name = 'Alík')
    );
