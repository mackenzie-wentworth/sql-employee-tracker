// TODO: Import module dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { DeptPrompt, RolePrompt, EmployeePrompt, ManagerPrompt} = require("./InsertPrompts");

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
          connection.end();
          break;
      }
    });

function viewQuery(queryUsed) {
  db.query(queryUsed, function (err, rows) {
    if (err) throw err;
    console.log(`\n`);
    console.table(rows);
  });
}


  //   .then((response) =>
  //     response.option === response.quitOption
  //     ? console.log('Success! Please make your next selection.')
  //     : console.log('Exited Options menu, goodbye.')
  // );



// Prompt user for new department to add to the database
async function addDepartment() {
  var name = "";

  let insertQuery = `INSERT INTO department (name) VALUES (?);`;

  inquirer.prompt(DeptPrompt)
    .then((answers) => {
      name = answers["name"];

      db.query(insertQuery, [name], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
          + rows.insertId);
        init();
      });

    })

};
 