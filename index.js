const inquirer = require('inquirer');
const { viewAllDepartments, addDepartment, removeDepartment }= require('./assets/js/department');
const { viewAllRoles, addRole, removeRole }= require('./assets/js/role');
const { viewAllEmployees, addEmployee, removeEmployee, updateRol }= require('./assets/js/employee');

function employerPrompt() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments', 
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Remove a department',
                'Remove a role',
                'Remove an employee',
            ]
        }
    ])
    .then(answers => {
        switch (answers.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Remove a department':
                removeDepartment();
                break;
            case 'Remove a role':
                removeRole();
                break;
            case 'Remove an employee':
                removeEmployee();
                break;
        }
    })
}


employerPrompt()