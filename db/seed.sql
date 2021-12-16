INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Accounting"),
       ("Public Relations"),
       ("Information Security");


INSERT INTO roles (title, salary, department_id)
VALUES ("Head of Human Resources", 190000, 1),
       ("Accountant", 30000, 2),
       ("Spin Team", 60000, 3),
       ("Pen Tester", 90000, 4),
       ("Network Monitor", 50000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Priya", "M", 1, 1),
       ("Electric", "Boogaloo", 3, 2),
       ("Rupert", "Grant", 3, NULL),
       ("Gabe", "L'Herault", 4, NULL),
       ("Gabe", "Newell", 5, NULL),
       ("Dane", "Edwards", 4, NULL),
       ("John", "Smith", 2, NULL),
       ("Tess", "Rose", 4, NULL),
       ("Diana", "Ross", 5, NULL);