const inquirer = require('inquirer'); // import 3rd-party module
const db = require('./db/connection'); // import utility module
// call once somewhere in the beginning of the app
const cTable = require('console.table');

const userOptions = [
    // Initial et of options for user
    {
        type: 'list',
        name: 'userInput',
        message: 'Welcome to the Content Management System. What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee\'s role', 'Leave/Exit the CMS'],
        default: 'View all departments'
    },
];

function initApp(options) {
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
        initApp(userOptions)
        .then( userSelectionObject => routeUserSelection(userSelectionObject.userInput))
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
        initApp(userOptions)
        .then( userSelectionObject => routeUserSelection(userSelectionObject.userInput))
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
        initApp(userOptions)
        .then( userSelectionObject => routeUserSelection(userSelectionObject.userInput))
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
    .then( answers => {
        const sql = `
        INSERT INTO 
        department (name) 
        VALUES (?)`;

        db.query(sql, answers.newDepartmentName, (err, department) => {
            if (err) {
                console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
                return;
            }

            console.log(`The ${answers.newDepartmentName} Department has been added.`);
            // run inquirer again
            initApp(userOptions)
            .then( userSelectionObject => routeUserSelection(userSelectionObject.userInput))
            .catch((error) => {
                console.log('Something didnt work out', error);
            });
        })    
    });
}

function addARole() {
    selectAllDepartments()
    .then( ([rows]) => {
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
                choices: rows.map( row => {
                    return { name: row.name, value: row.id };
                }),
                when: ( { newRoleTitle } ) => {
                    if (newRoleTitle) {
                        return true;
                    } else {
                        return false;
                    }
                }             
            }
        ])
        .then( answers => {
            const sql = `
            INSERT INTO 
            role (title, salary, department_id) 
            VALUES (?,?,?)`;
            
            const index = rows.findIndex( department => department.id === answers.newRoleDepartment);

            db.query(sql, [answers.newRoleTitle, answers.newRoleSalary, answers.newRoleDepartment], (err, role) => {
                if (err) {
                    console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
                    return;
                }
    
                console.log(`The role of ${answers.newRoleTitle} in the ${rows[index]['name']} Department with a salary of ${answers.newRoleSalary} has been created.`);
                // run inquirer again
                initApp(userOptions)
                .then( userSelectionObject => routeUserSelection(userSelectionObject.userInput))
                .catch((error) => {
                    console.log('Something didnt work out:', error);
                });
            });
        });
    })
    .catch(console.log);
    // .then( () => db.end());
}

function addAnEmployee() {
    selectAllEmployees()
    .then( ([employeeRows]) => {

        selectAllRoles()
        .then( ([roleRows]) => {
                 
            // Inquirer uses employeeRows and roleRows in
            // forming choice lists for certain prompts
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the new employee?',
                    validate: (input) => {
                        if (input.length == 0 || input.length < 4) {
                            console.log('The employee name must be minimum 4 characters.');
                            return false;
                        } else {
                            return true;
                        }
                    }            
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the new employee?',
                    validate: (input) => {
                        if (input.length == 0 || input.length < 4) {
                            console.log('The employee name must be minimum 4 characters.');
                            return false;
                        } else {
                            return true;
                        }
                    }           
                },
                {
                    type: 'list',
                    name: 'newEmployeeRole',
                    message: 'What role does the new employee have?',
                    choices: roleRows.map( row => {
                        return { name: row.title, value: row.id };
                    })            
                },
                {
                    type: 'confirm',
                    name: 'hasManager',
                    message: 'Does the employee have a manager?',
                    default: false
                },
                {
                    type: 'list',
                    name: 'newEmployeeManager',
                    message: 'Select the new employee\'s manager from the list below.',
                    choices: employeeRows.map( employee => {
                        let fullName = employee.first_name.concat(' ', employee.last_name);
                        return { name: fullName, value: employee.id };
                    }),
                    when: ({ hasManager }) => {
                      if (hasManager) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                }
            ])
            .then( answers => {
                const sql = `
                INSERT INTO 
                employee (first_name, last_name, role_id, manager_id) 
                VALUES (?,?,?,?)`;
                
                db.query(sql, [answers.firstName, answers.lastName, answers.newEmployeeRole, answers.newEmployeeManager], (err, role) => {
                    if (err) {
                        console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
                        return;
                    }
        
                    console.log(`The employee ${answers.firstName} ${answers.lastName} has been added to the employee table.`);
                    // run inquirer again
                    initApp(userOptions)
                    .then( userSelectionObject => routeUserSelection(userSelectionObject.userInput))
                    .catch((error) => {
                        console.log('Something didnt work out:', error);
                    });
                });
            }); 
        })
    });
}

function updateEmployeeRole() {
    selectAllEmployees()
    .then( ([employeeRows]) => {

        selectAllRoles()
        .then( ([roleRows]) => {

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'For which employee do you wish to update the role?',
                    choices: employeeRows.map( employee => {
                        let fullName = employee.first_name.concat(' ', employee.last_name);
                        return { name: fullName, value: employee.id };
                    })            
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'To what role do you wish to change?',
                    choices: roleRows.map( row => {
                        return { name: row.title, value: row.id };
                    })          
                }
            ])
            .then( answers => {
                const sql = `
                UPDATE employee
                SET role_id = ?
                WHERE  
                id = ?`;

                db.query(sql, [answers.newRole, answers.employeeId], (err, role) => {
                    if (err) {
                        console.log(`Error: ${err.sqlMessage} as it relates to ${err.sql}.`);
                        return;
                    }

                    const employeeIndex = employeeRows.findIndex( employee => employee.id === answers.employeeId);
                    const roleIndex = roleRows.findIndex( role => role.id === answers.newRole);
                    console.log(`The employee ${employeeRows[employeeIndex]['first_name']} ${employeeRows[employeeIndex]['last_name']} has had their role changed to ${roleRows[roleIndex]['title']}.`);
 
                    // run inquirer again
                    initApp(userOptions)
                    .then( userSelectionObject => routeUserSelection(userSelectionObject.userInput))
                    .catch((error) => {
                        console.log('Something didnt work out:', error);
                    });
                });
            });
        });
    });
}

function quitApp() {
    process.exit();
};

function selectAllDepartments() {
    const sql = `
    SELECT 
    *
    FROM department`;

    return db.promise().query(sql);
};

function selectAllRoles() {
    const sql = `
    SELECT 
    *
    FROM role`;

    return db.promise().query(sql);
};

function selectAllEmployees() {
    const sql = `
    SELECT 
    *
    FROM employee`;

    return db.promise().query(sql);
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
        case 'Leave/Exit the CMS':
            return quitApp();
        default:
            break;
    }
};

// run instance of initApp
initApp(userOptions)
.then( userSelectionObject => routeUserSelection(userSelectionObject.userInput))
.catch((error) => {
    console.log('Something didnt work out', error);
});

