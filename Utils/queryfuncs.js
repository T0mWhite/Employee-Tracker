const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = require("../config/connection");

// Shows a table of the departments and department IDs
let showDepartments = async (startProgram) => {
  const [rows] = await db.execute(
    "SELECT department_id AS ID, dept_name AS Department FROM department"
  );
  console.table(rows);
  setTimeout(startProgram, 1500);
};

// Shows a table of the roles, their ID, salary, and department ID
let showRoles = async (startProgram) => {
  const [rows] = await db.execute(
    "SELECT role_id AS ID, title AS Title, salary AS Salary, department_ID AS Department FROM roles;"
  );
  console.table(rows);
  setTimeout(startProgram, 1500);
};

// Shows a table of employees by ID, with their names, roles, and the manager they report to
let showEmployees = async (startProgram) => {
  const [rows] = await db.execute(
    "SELECT employee_id AS ID, first_name AS FirstName, last_name AS LastName, role_id AS Role, manager_id AS ReportsTo FROM employees;"
  );
  console.table(rows);
  setTimeout(startProgram, 1500);
};

// Function for adding a department
let addDepartment = async (startProgram) => {
  const { deptName } = await inquirer.prompt([
    {
      name: "deptName",
      type: "input",
      message: "What is the name of the department?",
    },
  ]);
  console.log([deptName]);
  const deptNameArray = [deptName];
  await db.execute(`INSERT INTO department (dept_name) VALUES (?)`, [deptName]);
  console.log(`${deptName} has been added as a department.`);
  setTimeout(startProgram, 1500);
};

// Function for adding a role
let addRole = async (startProgram) => {
  const { rolesTitle, rolesSalary, deptID } = await inquirer.prompt([
    {
      name: "rolesTitle",
      type: "input",
      message: "What is the name of the role?",
    },
    {
      name: "rolesSalary",
      type: "input",
      message: "What is the salary of the role?",
    },
    {
      name: "deptID",
      type: "input",
      message: "What is the department ID of the role?",
    },
  ]);
  const [rows, fields] = await (
    await db
  ).execute(
    `
INSERT INTO roles (title, salary, department_id)
VALUES (?, ?, ?);
`,
    [rolesTitle, rolesSalary, deptID]
  );
  console.log(`${rolesTitle} has been added as a role.`);
  setTimeout(startProgram, 1500);
};

// Function for adding an employee
let addEmployee = async (startProgram) => {
  // const position = [
  //   { role: "Head of Human Resources", role_id: 1 },
  //   { role: "Accountant", role_id: 2 },
  //   { role: "Spin Team", role_id: 3 },
  //   { role: "Pen Tester", role_id: 4 },
  //   { role: "Network Monitor", role_id: 5 },
  // ];

  const [roles] = await (await db).execute("SELECT * FROM roles;");

  const positionsArray = roles.map((role) => ({
    name: role.title,
    value: role,
  }));

  const { firstName, lastName, role, managerID } = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employees last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: positionsArray,
    },
    {
      name: "managerID",
      type: "input",
      message: "What is the department ID of the role?",
    },
  ]);

  const [rows, fields] = await (
    await db
  ).execute(
    `
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);
`,
    [firstName, lastName, role.role_id, managerID]
  );
  console.log(`${firstName} ${lastName} has been added as an employee.`);
  setTimeout(startProgram, 1500);
};

let updateEmployee = async (startProgram) => {
  const [employees, fields] = await (
    await db
  ).execute(`
  select * from employees
`);
  const employeeArray = employees.map((employee) => ({
    name: employee.first_name,
    value: employee.employee_id,
  }));

  const chosenEmp = await inquirer.prompt([
    {
      name: "employeeID",
      type: "list",
      message: "Which employee would you like to update?",
      choices: employeeArray,
    },
  ]);

  console.log(chosenEmp);

  const [roles] = await (await db).execute("SELECT * FROM roles;");

  const positionsArray = roles.map((role) => ({
    name: role.title,
    value: role,
  }));

  console.log(positionsArray);

  const { firstName, lastName, role, managerID } = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employees last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: positionsArray,
    },
    {
      name: "managerID",
      type: "input",
      message: "What is the employee ID of this employee's manager?",
    },
  ]);

  console.log(
    firstName,
    lastName,
    role.role_id,
    managerID,
    chosenEmp.employeeID
  );

  await db.execute(
    `UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE employee_id = ?;`[
      (firstName, lastName, role.role_id, parseInt(managerID), chosenEmp.employeeID)
    ]
  );

  console.table(employees);
  // console.log(`Employee ${employeeID} has been selected for a role update.`);
  setTimeout(startProgram, 1500);
};

let updateEmployeeRole = async (startProgram) => {
  const [rows] = await (
    await db
  ).execute(`
  UPDATE employees
  SET role_id = ${roleID}
  WHERE employee_id = ${employeeID};
`);
  console.table(rows);
  console.log(
    `Employee ${employeeID} has had their role updated to role ID ${roleID}.`
  );
  setTimeout(startProgram, 2000);
};

const queryFuncs = {
  showDepartments,
  showRoles,
  showEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
  updateEmployeeRole,
};

module.exports = queryFuncs;
