-- TODO: Create 'ALL departments' table (INCLUDES: id, name)
DROP DATABASE IF EXISTS employeesMgmtDB;

CREATE DATABASE employeesMgmtDB;

USE employeesMgmtDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (30) NOT NULL,
);


-- TODO: Create 'ALL roles' table (INCLUDES: id, title, salary, department_id)
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL(10.3) NULL,
    department_id INT NOT NULL
);


-- TODO: Create 'ALL employees' table (INCLUDES: id, first_name, last_name, role_id, manager_id)
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
);
