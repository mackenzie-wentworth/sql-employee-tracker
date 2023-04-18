// TODO: WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const DeptPrompt = [
    {
        type:"input",
        name:"department_name",
        message:"What is the name of the department?"
    }
]


// TODO:WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const RolePrompt = [
    {
        type:"input",
        name:"role_title",
        message:"What is the name of the role?"
    },
    {
        type:"input",
        name:"salary",
        message:"What is the salary of the role?"
    },
    {
        type:"input",
        name:"department",
        message:"Which department does the role belong to?"
    }
]


// TODO: WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const EmployeePrompt = [
    {
        type:"input",
        name:"firstname",
        message:"What is the employee's first name?"
    },
    {
        type:"input",
        name:"lastname",
        message:"What is the employee's last name?"
    },
    {
        type:"input",
        name:"emplyee_role",
        message:"What is the employee's role?"
    },
    {
        type:"input",
        name:"manager",
        message:"Who is the employee's manager?"
    }
]

// Export prompts
module.exports = {DeptPrompt, RolePrompt, EmployeePrompt};
