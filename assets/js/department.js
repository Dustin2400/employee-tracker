const inquirer = require('inquirer');

function viewAllDepartments() {
    let queryUrl = '/api/department';
    fetch(queryUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => {
        console.log(data);
    });
}

module.exports = {
    viewAllDepartments,
    addDepartment,
    removeDepartment
};