// TODO: WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const DeptPrompt = [
    {
        type:"input",
        name:"name",
        message:"What is the name of the department?"
    }
]

// TODO:WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const RolePrompt = [
    {
        type:"input",
        name:"title",
        message:"What is the name of the role?"
    },
    {
        type:"input",
        name:"salary",
        message:"What is the salary of the role?"
    },
    {
        type:"input",
        name:"deptName",
        message:"Which department does the role belong to? Please enter the department ID#:"
    }
]

// TODO: WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const EmployeePrompt = [
    {
        type:"input",
        name:"firstName",
        message:"What is the employee's first name?"
    },
    {
        type:"input",
        name:"lastName",
        message:"What is the employee's last name?"
    },
    {
        type:"input",
        name:"role",
        message:"What is the employee's role? Please enter the role ID#:"
    },
    {
        type:"input",
        name:"manager",
        message:"Who is the employee's manager? Please enter the manager's employee ID#:"
    }
]

// Export prompts
module.exports = {DeptPrompt, RolePrompt, EmployeePrompt};
