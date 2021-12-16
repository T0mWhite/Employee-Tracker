const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");

const { showDepartments } = require("./helpers/funcs");

const dbConnection = {
  host: "localhost",
  user: "root",
  password: "",
  database: "super_company_db",
};

// db();
// async function db() {
//   const data = await inquirer.prompt
// }

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
        "Exit"
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
      updateRole();
      break;
    case "Exit":
      process.exit();
  }
}

// Wrap up the exports in an object
const funcMeUp = {
startProgram
};

// Export it
module.exports = funcMeUp;