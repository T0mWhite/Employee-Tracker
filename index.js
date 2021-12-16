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
  const [rows, fields] = await (
    await db
  ).execute(
    "SELECT department_id AS ID, dept_name AS Department FROM department"
  );
  console.table(rows);
  await setTimeout(startProgram, 2000);
};

let showRoles = async () => {
  const [rows, fields] = await (
    await db
  ).execute(
    "SELECT role_id AS ID, title AS Title, salary AS Salary, department_ID AS Department FROM roles;"
  );
  console.table(rows);
  await setTimeout(startProgram, 2000);
};

let showEmployees = async () => {
  const [rows, fields] = await (
    await db
  ).execute(
    "SELECT employee_id AS ID, first_name AS FirstName, last_name AS LastName, role_id AS Role, manager_id AS ReportsTo FROM employees;"
  );
  console.table(rows);
  await setTimeout(startProgram, 2000);
};

// Function for adding a department
let addDepartment = async () => {
  const { deptName } = await inquirer.prompt([
    {
      name: "deptName",
      type: "input",
      message: "What is the name of the department?",
    },
  ]);
  const [rows, fields] = await (
    await db
  ).execute(`
  INSERT INTO department (dept_name)
  VALUES ("${deptName}")
  `);

  console.log(`${deptName} has been added as a department.`);
  await setTimeout(startProgram, 2000);
};

// Function for adding a role
let addRole = async () => {
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
  ).execute(`
INSERT INTO roles (title, salary, department_id)
VALUES ("${rolesTitle}", "${rolesSalary}", "${deptID}");
`);
  console.log(`${rolesTitle} has been added as a role.`);
  await setTimeout(startProgram, 2000);
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
  await setTimeout(startProgram, 2000);
};

let updateEmployee = async () => {
  const [rows, fields] = await (
    await db
  ).execute(`
  select * from employees where employee_id = ${employeeID}
`);
  console.table(rows);
  console.log(`Employee ${employeeID} has been selected for a role update.`);
  await setTimeout(startProgram, 2000);
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
  console.log(
    `Employee ${employeeID} has had their role updated to role ID ${roleID}.`
  );
  await setTimeout(startProgram, 2000);
};
