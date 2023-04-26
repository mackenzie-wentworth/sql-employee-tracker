// TODO: Import module dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { DeptPrompt, RolePrompt, EmployeePrompt } = require("./InsertPrompts");

const PORT = process.env.PORT || 3001;

// Connect to SQL database
const db = mysql.createConnection(
  {
    // host: 'localhost',
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
    displayAppTitle();
    init();
  }
});

function displayAppTitle() {
  console.log(`
.----------------------.
|   Employee Manager   |
'----------------------'
`);
}


// Prompt options: (1)View all departments, (2)View all roles, (3)View all employees, (4)Add a department, (5)Add a role, (6)Add an employee, (7)Update an employee role
const viewEmployeeOption = "View All Employees";
const addEmployeeOption = "Add Employee";
const updateEmployeeRoleOption = "Update Employee Role";
const viewRolesOption = "View All Roles";
const addRoleOption = "Add Role";
const viewDeptOption = "View All Departments";
const addDeptOption = "Add Department";
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
        viewEmployeeOption,
        addEmployeeOption,
        updateEmployeeRoleOption,
        viewRolesOption,
        addRoleOption,
        viewDeptOption,
        addDeptOption,
        quitOption
      ]
    })
    .then(function ({ option }) {
      switch (option) {
        case viewEmployeeOption:
          viewQuery(viewEmployeeQuery);
          break;

        case addEmployeeOption:
          addEmployee();
          break;
        
        case updateEmployeeRoleOption:
          updateEmployeeRole();
          break;

        case viewRolesOption:
          viewQuery(viewRolesQuery);
          break;

        case addRoleOption:
          addRole();
          break;

        case viewDeptOption:
          viewQuery(viewDeptQuery);
          break;

        case addDeptOption:
          addDepartment();
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

// Prompt user for new role to add to database
async function addRole() {
  var title = "";
  var salary = "";
  var department_id = "";

  let insertQuery = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;

  inquirer.prompt(RolePrompt)
    .then((answers) => {
      title = answers["title"];
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
  var first_name = "";
  var last_name = "";
  var role_id = "";
  var manager_id = "";

  let insertQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;

  inquirer.prompt(EmployeePrompt)
    .then((answers) => {
      first_name = answers["first_name"];
      last_name = answers["last_name"];
      role_id = answers["role_id"];
      manager_id = answers["manager_id"];

      db.query(insertQuery, [first_name, last_name, role_id, manager_id], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id = "
          + rows.insertId);
        init();
      });

    })
};

// Update an employee role
function updateEmployeeRole() {
  var employeeList = [];
  var roleList = [];

  db.query(viewEmployeeQuery, function (err, result) {
    if (err) throw (err);
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",

          message: "Which employee's role is changing?",
          choices: function () {

            result.forEach(result => {
              employeeList.push(
                result.last_name
              );
            })
            return employeeList;
          }
        }
      ])

      .then(function (answer) {
        console.log(answer);
        const name = answer.employeeName;

        db.query(viewRolesQuery, function (err, res) {
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: function () {
                  res.forEach(res => {
                    roleList.push(
                      res.title)
                  })
                  return roleList;
                }
              }
            ])
            .then(function (roleAnswer) {
              const role = roleAnswer.role_id;
              console.log(role);
              db.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                if (err) throw (err);
                let newRole = res[0].id;

                let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
                let values = [parseInt(newRole), name]

                db.query(query, values,
                  function (err, res, fields) {
                    console.log(`\n`);
                    console.log(`You have updated ${name}'s role to ${role}.`);
                    console.log(`\n`);
                    init();
                  })
              })
            })
        })
      })
  })
};