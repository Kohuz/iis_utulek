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
