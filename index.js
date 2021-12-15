const inquirer = require("inquirer");
const mysql = require("mysql2");

startProgram();
async function startProgram() {
  const data = await inquirer.prompt([
    {
      name: "student",
      type: "list",
      message: "what do you want to do?",
      choices: ["show departments", "show employees"],
    },
  ]);

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
