USE employees_db;


INSERT INTO departments (department)
VALUES ("Sales"),
("Finance"),
("Engineering"),
("Legal");


INSERT INTO positions (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1),
("Salesperson", 85000, 1),
("Accountant", 125000, 2),
("Lead Engineer", 175000, 3),
("Software Engineer", 115000, 3),
("Product Manager", 135000, 3),
("Legal Team Lead", 225000, 4),
("Lawyer", 205000, 4);


INSERT INTO employees (first_name, last_name, position_id, manager_id)
VALUES ("Kenneth", "Vaughn", 1, null),
("Kenneth", "Williams", 4, null),
("Micheal", "Barnes", 2, 1),
("Ricky", "Nero", 6, null),
("Adrian", "Jackson", 3, null),
("April", "Gobert", 7, null),
("Donovan", "Walker", 5, 4),
("Keyanna", "Golphin", 8, 7),
("Toni", "Jones", 6, null),
("Jennifer", "Garland", 8,7);