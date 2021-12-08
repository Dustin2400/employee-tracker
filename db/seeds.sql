INSERT INTO department (name)
VALUES 
('Accounting'),
('Marketing'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES

('Payroll manager', 50000.00, 1),
('Manager', 50000.00, 1),
('Payroll', 30000.00, 1),
('Accountant', 32400.00, 1),
('Spreadsheets', 32400.00, 1),
('Digital manager', 54000.00, 2),
('Media manager', 53300.00, 2),
('Web developer', 34000.00, 2),
('Software developer', 34000.00, 2),
('Billboard finder', 43300.00, 2),
('Radio spots', 34400.00, 2),
('Sales manager', 67000.00, 3),
('Bulk sales manager', 67678.00, 3),
('Sales rep', 34344.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
Values
('Sleve', 'McDichael', 1, NULL),
('Onson', 'Sweemey', 2, NULL),
('Darryl', 'Archideld', 3, 1),
('Anatoli', 'Smorin', 3, 1),
('Rey', 'McScriff', 4, 2),
('Glenallen', 'Mixon', 5, 2),
('Mario', 'McWrolin', 5, 2),
('Raul', 'Changerlain', 6, Null),
('Kevin', 'Nogleeny', 7, Null),
('Tony', 'Smekirk', 8, 8),
('Bobson', 'Dugnutt', 8, 8),
('Willie', 'Dustice', 9, 8),
('Jeromy', 'Gride', 10, 9),
('Scott', 'Dourove', 11, 9),
('Shown', 'Furcotte', 11, 9),
('Dean', 'Wersky', 12, NULL),
('Mike', "Turk", 13, NULL),
('Dwight', 'Rortugal', 14, 16),
('Tim', 'Sandaele', 14, 16),
('Karl', 'Dandleton', 14 ,16),
('Mike', 'Sernandez', 14, 17),
('Todd', 'Bonzalez', 14, 17),
('Hingle', 'McKringleberry', 14, 17);
