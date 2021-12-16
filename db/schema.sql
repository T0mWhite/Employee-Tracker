drop database if exists super_company_db;
create database super_company_db;
use super_company_db;

create table department (
department_id INT AUTO_INCREMENT,
dept_name VARCHAR(30) NOT NULL,

PRIMARY KEY (department_id)
);


CREATE TABLE roles (
role_id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,

PRIMARY KEY (role_id),

department_id INT,
FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);


CREATE TABLE employees (
employee_id INT AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,

PRIMARY KEY (employee_id),

role_id INT,
FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,

manager_id INT,
FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);
