const mysql = require("mysql2/promise");
require("dotenv").config();


console.log("Creating connection pool...")
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
})

module.exports = pool;


// const dbConnection = {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "super_company_db",
//   };
  
  // const dbConnection = {
  //   // host: process.env.HOST,

  // };

// let db;

// let connectFunc = async () => {
//   db = await mysql.createConnection(
//     dbConnection,
//     console.log(`Connected to the Super Company database.`)
//   );
//   // console.log(db);
// }

// connectFunc();

//   module.exports = db;