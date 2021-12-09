const { application } = require('express');
const inquirer = require('inquirer');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cTable = require('console.table');
const db = require('../../config/connection');

let departmentId;

function viewAllRoles() {
        const sql = `SELECT role.id, role.title, role.salary, department.name AS department
        FROM role LEFT JOIN department
        ON role.department_id = department.id;`;
        db.promise().query(sql)
        .then(([ data ]) => {
            console.table(data);
        });
}

function getId(answers) {
    const sql2 = `SELECT department.id FROM department WHERE name = '${answers.department}';`;
    db.promise().query(sql2)
    .then(([ response ])=> {
        departmentId = response[0].id;
        postRole(answers);
    })
}

function postRole(answers) {
                const sql3 = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
                const params = [answers.title, answers.salary, departmentId];

                db.promise().query(sql3, params)
                .then(([ data ]) => {
                    const message = 'Added '+ answers.title + ' to the database.'
                    console.log(message);
                })
}

function addRole() {
    let departments = [];
    const sql = `SELECT * FROM department;`;
    db.promise().query(sql)
        .then(([ data ]) => {
            for (i=0; i<data.length; i++) {
                departments.push(data[i].name);
            }
            return departments
        })
        .then(departments => {
        return inquirer.prompt([
            {
                type: 'text',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does this role belong to?',
                choices: departments
            }
        ])
        })
        .then(answers => {
            return getId(answers);
        })
}

function removeRole() {
    let roles = [];
    const sql = `SELECT * FROM role;`;
    db.promise().query(sql)
    .then(([ data ]) => {
        for (i=0; i<data.length; i++) {
            roles.push(data[i].title);
        }
        return roles;
    })
    .then(() => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'title',
                message: 'Which role do you want to remove?',
                choices: roles
            }
        ])
    })
    .then(answers => {
        const sql = `DELETE FROM role WHERE title = ?;`;
        const params = answers.title;
        db.promise().query(sql, params)
        .then(() => {
            const message = answers.title + ' has been removed.';
            console.log(message);
        });
    });
}

module.exports = {
    viewAllRoles,
    addRole,
    removeRole
};