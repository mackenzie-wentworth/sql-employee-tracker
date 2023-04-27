-- TODO: Create 'INSERT' data with 'VALUES' for tables in schema.sql file
USE employeesMgmtDB;

-- department data to pre-populate department table
INSERT INTO department (id, name)
VALUES  (1, "Engineering"),
        (2, "Finance"),
        (3, "Legal"),
        (4, "Sales");

-- role data to pre-populate role table
INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Sales Lead", 100000, 4),
        (2, "Salesperson", 80000, 4),
        (3, "Lead Engineer", 150000, 1),
        (4, "Software Engineer", 120000, 1),
        (5, "Account Manager", 160000, 2),
        (6, "Accountant", 125000, 2),
        (7, "Legal Team Lead", 250000, 3),
        (8, "Lawyer", 190000, 3);      

-- employee data to pre-populate employee table
INSERT INTO employee (id, role_id, first_name, last_name, manager_id)
VALUES  (1, 1, "John", "Doe", null),
        (2, 2, "Mike", "Chan", 1),
        (3, 3, "Ashley", "Rodriguez", null),
        (4, 4, "Kevin", "Tupik", 3),
        (5, 5, "Kunal", "Singh", null),
        (6, 6, "Malia", "Brown", 5),
        (7, 7, "Sarah", "Lourd", null),
        (8, 8, "Tom", "Allen", 7);