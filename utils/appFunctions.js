const inquirer = require('inquirer'); // import 3rd-party module
const db = require('../db/connection'); // import utility module
// call once somewhere in the beginning of the app
const cTable = require('console.table');


const userOptions = [
    // Initial et of options for user
    {
        type: 'list',
        name: 'userInput',
        message: 'Welcome to the Content Management System. What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee\'s role',],
        default: 'View all departments'
    },

];

function initInquirer(options) {
    // initInquirer returns a Promise object, to which we chain a .then() method
    return inquirer.prompt(options);
};

function viewAllDepartments() {
    const sql = `
    SELECT 
    id, 
    name AS 'Department' 
    FROM department`;

    db.query(sql, (err, departments) => {
        if (err) {
            console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
            return;
        }

        // show the departments in tabular form
        console.table(departments);

        // run inquirer again
        initInquirer(userOptions)
        .then( userSelectionObject => {
            let { userInput } = userSelectionObject;
            routeUserSelection(userInput);
        })
        .catch((error) => {
            console.log('Something didnt work out', error);
        });
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

    db.query(sql, (err, employees) => {
        if (err) {
            console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
            return;
        }

        // show the employees in tabular form
        console.table(employees);

        // run inquirer again
        initInquirer(userOptions)
        .then( userSelectionObject => {
            let { userInput } = userSelectionObject;
            routeUserSelection(userInput);
        })
        .catch((error) => {
            console.log('Something didnt work out', error);
        });
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

    db.query(sql, (err, roles) => {
        if (err) {
            console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
            return;
        }

        // show the roles in tabular form
        console.table(roles);

        // run inquirer again
        initInquirer(userOptions)
        .then( userSelectionObject => {
            let { userInput } = userSelectionObject;
            routeUserSelection(userInput);
        })
        .catch((error) => {
            console.log('Something didnt work out', error);
        });
    });

};

function addADepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'What is the name of the new department?',
            validate: (input) => {
                // const regex = new RegExp(/\d\s/); // \d is equilavent to [0-9] and \s matches 
                // //a single white space character, including space, tab, form feed, line feed,
                // //and other Unicode spaces 
                // if (regex.test(input)) {
                //     console.log('Numbers and spaces are not allowed in the department name.');
                //     return false;
                // }
                if (input.length == 0 || input.length < 5) {
                    console.log('The department name must be minimum 5 characters.');
                    return false;
                } else {
                    return true;
                }
            }            
        }
    ])
    .then( (departmentObject) => {
        let { newDepartmentName } = departmentObject;
        const sql = `
        INSERT INTO 
        department (name) 
        VALUES (?)`;

        db.query(sql, newDepartmentName, (err, department) => {
            if (err) {
                console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
                return;
            }

            console.log(`The ${newDepartmentName} Department has been added.`);

            // run inquirer again
            initInquirer(userOptions)
            .then( userSelectionObject => {
                let { userInput } = userSelectionObject;
                routeUserSelection(userInput);
            })
            .catch((error) => {
                console.log('Something didnt work out', error);
            });
        })
        
    });
}

function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRoleTitle',
            message: 'What is the name of the new role?',
            validate: (input) => {
                if (input.length == 0 || input.length < 5) {
                    console.log('The role name must be minimum 5 characters.');
                    return false;
                } else {
                    return true;
                }
            }            
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: 'What is the salary for the new role?',
            validate: (input) => {
                if (input.length == 0 || input.length < 5) {
                    console.log('The role salary must be minimum 5 characters.');
                    return false;
                } else {
                    return true;
                }
            },
            when: ( { newRoleTitle } ) => {
                if (newRoleTitle) {
                    return true;
                } else {
                    return false;
                }
            }             
        },
        {
            type: 'list',
            name: 'newRoleDepartment',
            message: 'To which department does this role belong?',
            choices: getCurrentDepartmentNames(),
            when: ( { newRoleTitle } ) => {
                if (newRoleTitle) {
                    return true;
                } else {
                    return false;
                }
            }             
        }
    ])
    .then( (roleObject) => {
        let { newRoleTitle, newRoleSalary, newRoleDepartment } = roleObject;
        const sql = `
        INSERT INTO 
        role (title, salary, department_id) 
        VALUES (?,?,?)`;

        db.query(sql, [newRoleTitle, newRoleSalary, newRoleDepartment], (err, department) => {
            if (err) {
                console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
                return;
            }

            console.log(`The role of ${newRoleTitle} in the ${newRoleDepartment} Department with a salary of ${newRoleSalary} has been created.`);

            // run inquirer again
            initInquirer(userOptions)
            .then( userSelectionObject => {
                let { userInput } = userSelectionObject;
                routeUserSelection(userInput);
            })
            .catch((error) => {
                console.log('Something didnt work out', error);
            });
        })
    });
}

function getCurrentDepartmentNames() {
    const sql = `
    SELECT 
    name
    FROM department`;

    db.query(sql, (err, choices) => {
        if (err) {
            console.log(`${err.sqlMessage} as it relates to ${err.sql}.`);
            return;
        }

        // show the current departments
        // console.log(choices);
        
        return choices;
    });
};

function routeUserSelection(input) {
    switch (input) {
        case 'View all departments':
            return viewAllDepartments();
        case 'View all roles':
            return viewAllRoles();
        case 'View all employees':
            return viewAllEmployees();
        case 'Add a department':
            return addADepartment();
        case 'Add a role':
            return addARole();
        case 'Add an employee':
            return addAnEmployee();
        case 'Update an employee\'s role':
            return updateEmployeeRole();
        default:
            break;
    }
};

module.exports = {
    userOptions,
    initInquirer,
    routeUserSelection
};
