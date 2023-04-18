// TODO: Import module dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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