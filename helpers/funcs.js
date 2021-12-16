const mysql = require("mysql2/promise");
const cTable = require("console.table");
// const { startProgram } = require("../index");

const funcMeUp = require("../index");
const startProgram = funcMeUp.startProgram;


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

let showDepartments = async () => {
  const [rows, fields] = await (await db).execute("SELECT * FROM department");
  console.table(rows);
  startProgram();
};

let showRoles = () => {
  db.query("select * from roles", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
};

let showEmployees = () => {
  db.query("select * from employees", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.tables(result);
  });
};

let addDepartment = () => {
  db.query(
    `
  insert into department (name)
  values (${deptName});
  `,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.tables(result);
    }
  );
};

let addRoles = () => {
  db.query(
    `
  insert into roles (title, salary)
  values (${rolesTitle}, ${rolesSalary});
  `,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.tables(result);
    }
  );
};

let addRole = () => {
  db.query(
    `
  insert into role (title, salary)
  values (${roleTitle}, ${roleSalary});
  `,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.tables(result);
    }
  );
};

module.exports = {showDepartments};
