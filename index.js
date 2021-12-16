const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");

const dbConnection = {
  host: "localhost",
  user: "root",
  password: "",
  database: "super_company_db",
};

const db = mysql.createConnection(
  dbConnection,
  console.log(`Connected to the Super Company database.`)
);

// // create the connection
// let dbConnect = async (dbConnection) => {
// const connection = await mysql.createConnection(dbConnection);
// // query database
// const [rows, fields] = await connection.execute("select * from students;");

// console.table(rows);
// }

startProgram();
async function startProgram() {
  const { mainChoices } = await inquirer.prompt([
    {
      name: "mainChoices",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Show department list",
        "Show role list",
        "Show employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee",
        "Update employee role",
        "Exit",
      ],
    },
  ]);

  console.log(mainChoices);

  switch (mainChoices) {
    case "Show department list":
      showDepartments();
      break;
    case "Show role list":
      showRoles();
      break;
    case "Show employees":
      showEmployees();
      break;
    case "Add department":
      addDepartment();
      break;
    case "Add role":
      addRole();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Update employee":
      updateEmployee();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
    case "Exit":
      process.exit();
  }
}

let showDepartments = async () => {
  const [rows, fields] = await (await db).execute("SELECT department_id AS ID, dept_name AS Department FROM department");
  console.table(rows);
};

let showRoles = async () => {
  const [rows, fields] = await (await db).execute("SELECT role_id AS ID, title AS Title, salary AS Salary, department_ID AS Department FROM roles;");
  console.table(rows);
};

let showEmployees = async () => {
  const [rows, fields] = await (await db).execute("SELECT employee_id AS ID, first_name AS FirstName, last_name AS LastName, role_id AS Role, manager_id AS ReportsTo FROM employees;");
  console.table(rows);
};

let addDepartment = async () => {
  const [rows, fields] = await (
    await db
  ).execute(`
INSERT INTO department (dept_name)
VALUES ("${deptName}")
`);
  console.table(rows);
  console.log(`${deptName} has been added as a department.`);
};

let addRole = async () => {
  const [rows, fields] = await (
    await db
  ).execute(`
INSERT INTO roles (title, salary, department_id)
VALUES ("${rolesTitle}, ${rolesSalary}, ${department_id}");
`);
  console.table(rows);
  console.log(`${rolesTitle} has been added as a role.`);
};

let addEmployee = async () => {
  const [rows, fields] = await (
    await db
  ).execute(`
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("${first_name}, ${last_name}, ${role_id}, ${manager_id}");
`);
  console.table(rows);
  console.log(`${first_name} ${last_name} has been added as an employee.`);
};

let updateEmployee = async () => {
  const [rows, fields] = await (
    await db
  ).execute(`
  select * from employees where employee_id = ${employeeID}
`);
  console.table(rows);
  console.log(`Employee ${employeeID} has been selected for a role update.`);
};

let updateEmployeeRole = async () => {
  const [rows, fields] = await (
    await db
  ).execute(`
  UPDATE employees
  SET role_id = ${roleID}
  WHERE employee_id = ${employeeID};
`);
  console.table(rows);
  console.log(`Employee ${employeeID} has had their role updated to role ID ${roleID}.`);
};
