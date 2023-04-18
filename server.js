// TODO: Import module dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { DeptPrompt, RolePrompt, EmployeePrompt} = require("./InsertPrompts");

const PORT = process.env.PORT || 3001;

// Connect to SQL database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '12345',
    database: 'employeesMgmtDB'
  },
  console.log(`Connected to the employeesMgmtDB database`)
);

db.connect(function (err) {
  if (err) {
    console.log("Error occurred while connecting!");
  }
  else {
    console.log("Connection created with MySQL successfully!");
  }
});


// Prompt options: (1)View all departments, (2)View all roles, (3)View all employees, (4)Add a department, (5)Add a role, (6)Add an employee, (7)Update an employee role

const viewDeptOption = "View All Departments";
const viewRolesOption = "View All Roles";
const viewEmployeeOption = "View All Employees";
const addDeptOption = "Add A Department";
const addRoleOption = "Add A Role";
const addEmployeeOption = "Add An Employee";
const updateEmployeeRoleOption = "Update An Employee Role";
const quitOption = "Quit";

// Queries 
const viewDeptQuery = "SELECT * FROM department";
const viewRolesQuery = "SELECT * FROM role";
const viewEmployeeQuery = "SELECT * FROM employee";

// function which prompts the user for what action they should take
function init() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "option",
      choices: [
        viewDeptOption,
        viewRolesOption,
        viewEmployeeOption,
        addDeptOption,
        addRoleOption,
        addEmployeeOption,
        updateEmployeeRoleOption,
        quitOption
      ]
    })
    .then(function ({ option }) {
      switch (option) {
        case viewDeptOption:
          viewQuery(viewDeptQuery);
          break;

        case viewRolesOption:
          viewQuery(viewRolesQuery);
          break;

        case viewEmployeeOption:
          viewQuery(viewEmployeeQuery);
          break;

        case addDeptOption:
          addDepartment();
          break;

        case addRoleOption:
          addRole();
          break;

        case addEmployeeOption:
          addEmployee();
          break;

        case updateEmployeeRoleOption:
          updateEmployeeRole();
          break;

        case quitOption:
          db.end();
          break;
      }
    });
}

function viewQuery(queryUsed) {
  db.query(queryUsed, function (err, rows) {
    if (err) throw err;
    console.log(`\n`);
    console.table(rows);
    init();
  });
}


  //   .then((response) =>
  //     response.option === response.quitOption
  //     ? console.log('Success! Please make your next selection.')
  //     : console.log('Exited Options menu, goodbye.')
  // );



// Prompt user for new department to add to the database
async function addDepartment() {
  var department_name = "";

  let insertQuery = `INSERT INTO department (department_name) VALUES (?);`;

  inquirer.prompt(DeptPrompt)
    .then((answers) => {
      department_name = answers["department_name"];

      db.query(insertQuery, [department_name], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
          + rows.insertId);
        init();
      });

    })
};

 // Prompt user for new role to add to database
async function addRole() {
  var title = "";
  var salary = "";
  var department_id = "";

  let insertQuery = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;

  inquirer.prompt(RolePrompt)
    .then((answers) => {
      roleTitle = answers["roleTitle"];
      salary = answers["salary"];
      department_id = answers["department_id"];

      db.query(insertQuery, [title, salary, department_id], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
          + rows.insertId);
        init();
      });

    })
};

// Prompt user for new employee to add to the database
async function addEmployee() {
  var firstName = "";
  var lastName = "";
  var role = "";
  var manager = "";

  let insertQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;

  inquirer.prompt(EmployeePrompt)
    .then((answers) => {
      firstName = answers["firstName"];
      lastName = answers["lastName"];
      role = answers["role"];
      manager = answers["manager"];

      connection.query(insertQuery, [firstName, lastName, role, manager], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
          + rows.insertId);
        init();
      });

    })

};
