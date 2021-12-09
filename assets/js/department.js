const { application } = require('express');
const inquirer = require('inquirer');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cTable = require('console.table');
const db = require('../../config/connection');

function viewAllDepartments() {
    const sql = `SELECT * FROM department;`;
    db.promise().query(sql)
    .then(([ data ]) => {
        console.table(data);
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'input',
            message: 'What is the name of the department?'
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name) VALUES (?);`;
        const params = answer.input;

        db.promise().query(sql, params)
        .then(data => {
            const message = 'Added ' + answer.input + ' to the database';
            console.log(message);
        });
    });  
}

function removeDepartment() {
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
                type: 'list',
                name: 'name',
                message: 'Which department would you like to remove?',
                choices: departments
            }
        ])
        .then(answers => {
            const sql = `DELETE FROM department WHERE name = ?;`;
            const params = answers.name;

            db.promise().query(sql, params)
            .then(() => {
                const message = answers.name + ' has been deleted.';
                console.log(message);
            })
        });
    });
}

module.exports = {
    viewAllDepartments,
    addDepartment,
    removeDepartment
};