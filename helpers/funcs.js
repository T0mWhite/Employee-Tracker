let showDepartments = () => {
  db.query("select * from departments", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.table(result);
  });
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





module.exports = { showDepartments };