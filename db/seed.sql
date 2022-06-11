USE employees_db;

--Department Seeding
INSERT INTO departments (department)
VALUES ("Sales"),
("Finance"),
("Engineering"),
("Legal");

-- Position SEEDING
INSERT INTO positions (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1),
("Salesperson", 85000, 1),
("Accountant", 125000, 2),
("Lead Engineer", 175000, 3),
("Software Engineer", 115000, 3),
("Product Manager", 135000, 3),
("Legal Team Lead", 225000, 4),
("Lawyer", 205000, 4);

-- EMPLOYEE SEEDING
INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ("Micheal", "Barnes", 2, 1),
("Ricky", "Nero", 6, null),
("Adrian", "Jackson", 3, null),
("April", "Gobert", 7, null),
("Donovan", "Walker", 5, 4),
("Keyanna", "Golphin", 8, 7),
("Toni", "Jones", 6, 7),
("Kenneth", "Williams", 4, null),
("Kenneth", "Vaughn", 1, null),
("Jennifer", "Garland", 8,7);