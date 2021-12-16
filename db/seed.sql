INSERT INTO department (dept_name)
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
VALUES ("Priya", "M", 1, NULL),
       ("Electric", "Boogaloo", 3, NULL),
       ("Rupert", "Grant", 3, 2),
       ("Gabe", "L'Herault", 4, 1),
       ("Gabe", "Newell", 5, 1),
       ("Dane", "Edwards", 4, 1),
       ("John", "Smith", 2, 2),
       ("Tess", "Rose", 4, 1),
       ("Diana", "Ross", 5, 1);