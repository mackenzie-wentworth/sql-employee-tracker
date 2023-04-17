// TODO: WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const DeptPrompt = [
    {
        type:"input",
        name:"",
        message:""
    }
]


// TODO:WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const RolePrompt = [
    {
        type:"input",
        name:"",
        message:""
    },
    {
        type:"input",
        name:"",
        message:""
    },
    {
        type:"input",
        name:"",
        message:""
    }
]


// TODO: WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const EmployeePrompt = [
    {
        type:"input",
        name:"",
        message:""
    },
    {
        type:"input",
        name:"",
        message:""
    },
    {
        type:"input",
        name:"",
        message:""
    },
    {
        type:"input",
        name:"",
        message:""
    }
]

// Export prompts
module.exports = {DeptPrompt, RolePrompt, EmployeePrompt};
