const inquirer = require("inquirer");
const mysql = require("mysql2");

const { showDepartments } = require("./helpers/funcs");

startProgram();
async function startProgram() {
  const { menuChoices } = await inquirer.prompt([
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
      ],
    },
  ]);
  console.log(menuChoices);

  switch (menuChoices) {
    case "Show department list":
      showDepartments();
      break;
    case "show role list":
      showRoles();
      break;
    case "show employees":
      showEmployees();
      break;
    case "add department":
      addDepartment();
      break;
    case "add role":
      addRole();
      break;
    case "add employee":
      addEmployee();
      break;
    case "update employee":
      updateEmployee();
      break;
    case "update employee role":
      updateRole();
      break;
    case "exit":
      process.exit();
  }

  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "classlist_db",
  });
  // query database
  const [rows, fields] = await connection.execute("select * from students;");

  console.table(rows);
}
