const inquirer = require("inquirer");
// const mysql = require("mysql2/promise");
// const cTable = require("console.table");

// Import the connection to the database
const db = require("./config/connection");

// Import query functions
const queryFuncs = require("./Utils/queryfuncs");
const showDepartments = queryFuncs.showDepartments;
const showRoles = queryFuncs.showRoles;
const showEmployees = queryFuncs.showEmployees;
const addDepartment = queryFuncs.addDepartment;
const addRole = queryFuncs.addRole;
const addEmployee = queryFuncs.addEmployee;
const updateEmployee = queryFuncs.updateEmployee;
const updateEmployeeRole = queryFuncs.updateEmployeeRole;

// const dbConnection = {
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "super_company_db",
// };

// const db = mysql.createConnection(
//   dbConnection,
//   console.log(`Connected to the Super Company database.`)
// );

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
        "Exit",
      ],
    },
  ]);

  switch (mainChoices) {
    case "Show department list":
      showDepartments(startProgram);
      break;
    case "Show role list":
      showRoles(startProgram);
      break;
    case "Show employees":
      showEmployees(startProgram);
      break;
    case "Add department":
      addDepartment(startProgram);
      break;
    case "Add role":
      addRole(startProgram);
      break;
    case "Add employee":
      addEmployee(startProgram);
      break;
    case "Update employee":
      updateEmployee(startProgram);
      break;
    case "Update employee role":
      updateEmployeeRole(startProgram);
      break;
    case "Exit":
      process.exit(startProgram);
  }
}
