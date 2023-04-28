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
const viewRolesQuery = "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;";
const viewEmployeeQuery = "SELECT emp.id AS id, emp.first_name, emp.last_name, rol.title AS title, dept.name AS department, rol.salary, CONCAT(mgmt.first_name, ' ', mgmt.last_name) AS manager FROM employee emp LEFT JOIN role rol ON emp.role_id = rol.id LEFT JOIN department dept ON dept.id = rol.department_id LEFT JOIN employee mgmt ON emp.manager_id = mgmt.id";

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

// Prompt user for new employee to add to the database
async function addEmployee() {
  db.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    let roles = res.map(role => ({ name: role.title, value: role.role_id }));
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the new employee\'s first name?'
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the new employee\'s last name?'
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is the new employee\'s title?',
          choices: roles
        },
        {
          type: 'list',
          name: 'manager',
          message: 'Who is the new employee\'s manager?',
          choices: employees
        }
      ]).then((response) => {
        db.query(`INSERT INTO employee SET ?`,
          {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: response.role,
            manager_id: response.manager,
          },
          (err, res) => {
            if (err) throw err;
          })
        db.query(`INSERT INTO role SET ?`,
          {
            department_id: response.dept,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.firstName} ${response.lastName} successfully added to database! \n`);
            init();
          })
      })
    })
  })

};

// Update an employee role
function updateEmployeeRole() {
  db.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    let roles = res.map(role => ({ name: role.title, value: role.role_id }));
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which employee would you like to update the role for?',
          choices: employees
        },
        {
          type: 'list',
          name: 'newRole',
          message: 'What should the employee\'s new role be?',
          choices: roles
        },
      ]).then((response) => {
        db.query(`UPDATE employee SET ? WHERE ?`,
          [
            {
              role_id: response.newRole,
            },
            {
              employee_id: response.employee,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`\n Successfully updated employee's role in the database! \n`);
            init();
          })
      })
    })
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

