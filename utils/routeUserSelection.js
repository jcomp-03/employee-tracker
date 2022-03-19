
const db = require('../db/connection'); // import utility module
// call once somewhere in the beginning of the app
const cTable = require('console.table');
const startInquirer = require('../server.js');


function viewAllDepartments() {
    const sql = `SELECT id, name AS 'Department' from department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(`${err.sqlMessage} as it relates to ${err.sql}.`);
            return;
        }
        console.table(rows);
        // run prompts again
        // startInquirer();
    });
};

function viewAllEmployees() {
    const sql = `
    SELECT 
    employee.id, 
    employee.first_name AS 'First Name', 
    employee.last_name AS 'Last Name',
    role.title AS 'Employee Title', 
    department.name AS 'Department',
    role.salary AS 'Base Salary',
    employee.manager_id AS 'Current Manager'
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
            return;
        }
        console.table(rows);
        // run prompts again
        // startInquirer();
    });
};

function viewAllRoles() {
    const sql = `
    SELECT 
    role.id, 
    role.title AS Title,
    department.name AS Department,
    role.salary AS Salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
            return;
        }
        console.table(rows);
        // run prompts again
        // startInquirer();
    });
};

function routeUserSelection(input) {
    console.log('You\'re inside the routeUserSelection function!');
    
    switch (input) {
        case 'View all departments':
            return viewAllDepartments();
        case 'View all roles':
            return viewAllRoles();
        case 'View all employees':
            return viewAllEmployees();
        case 'Add a department':
            // run function addADepartment
            break;
        case 'Add a role':
            // run function AddARole
            break;
        case 'Add an employee':
            // run function AddAnEmployee
            break;
        case 'Update an employee\'s role':
            // run function updateEmployeeRole
            break;
        default:
            break;
    }
};

module.exports = routeUserSelection;
