-- TODO: Create 'INSERT' data with 'VALUES' for tables in schema.sql file

INSERT INTO department (id, name)
VALUES  (1, "Engineering"),
        (2, "Finance"),
        (3, "Legal"),
        (4, "Sales")

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Sales Lead", 100000, 4),
        (2, "Salesperson", 80000, 4),
        (3, "Lead Engineer", 150000, 1),
        (4, "Software Engineer", 120000, 1),
        (5, "Account Manager", 160000, 2),
        (6, "Accountant", 125000, 2),
        (7, "Legal Team Lead" 250000, 3),
        (8, "Lawyer", 190000, 3)

INSERT INTO employee (id, role_id, first_name, last_name, manager_id)
VALUES  (1, 1, "John", "Doe",),
        (2, 2, "Mike", "Chan",),
        (3, 3, "Ashley", "Rodriguez",),
        (4, 4, "Kevin", "Tupik",),
        (5, 5, "Kunal", "Singh",),
        (6, 6, "Malia", "Brown",),
        (7, 7, "Sarah", "Lourd",),
        (8, 8, "Tom", "Allen",)