/*

WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database */

const { userOptions, initInquirer, routeUserSelection } = require('./utils/appFunctions'); // import utility module

const managerQuestions = [
    {
        type: 'list',
        name: 'initialInput',
        message: 'Welcome to the Content Management System. What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee\'s role',],
        default: 'View all employees'
    },
    //managerName
/*     {
        type: 'input',
        name: 'managerName',
        message: 'What is the manager\'s name (required)?',
        validate: input => {
            if (!isNaN(input)) {
                console.log('Please enter the manager\'s name!');
                return false;
            } else {
                return true;
            }
        }
    },
   //managerId
    {
        type: 'input',
        name: 'managerId',
        message: 'What is the manager\'s id (required)?',
        validate: input => {
            if (isNaN(input)) {
                console.log('Please enter the manager\'s id as a strict number!');
                return false;
            } else {
                return true;
            }
        }
    }, */
/*     //managerEmail
    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the manager\'s email (required)?',
        validate: input => {
            const email = input.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
            if (!email) {
                console.log('Please enter the manager\'s email!');
                return false;
            } else {
                return true;
            }
        }
    },
    //managerOfficeNumber
    {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'What is the manager\'s office number (required)?',
        validate: input => {
            if (isNaN(input)) {
                console.log('Please enter the manager\'s office number as a strict number!');
                return false;
            } else {
                return true;
            }
        }
    },
    //nextAction
    {
        type: 'list',
        name: 'nextAction',
        message: 'Select what you would like to do next:',
        choices: ['Add an engineer', 'Add an intern', new inquirer.Separator(), 'I am finished building my team'],
        default: 'I am finished building my team',
    },
    //engineerName
    {
        type: 'input',
        name: 'engineerName',
        message: 'What is the engineer\'s name (required)?',
        validate: input => {
            if (!input) {
                console.log('Please enter the engineer\'s name!');
                return false;
            } else {
                return true;
            }
        },
        when: ({nextAction}) => {
            if (nextAction === 'Add an engineer') {
                return true;
            } else {
                return false;
            }
        }
    },
    //engineerId
    {
        type: 'input',
        name: 'engineerId',
        message: 'What is the engineer\'s id (required)?',
        validate: input => {
            if (isNaN(input)) {
                console.log('Please enter the engineer\'s id as a strict number!');
                return false;
            } else {
                return true;
            }
        },
        when: ({nextAction}) => {
            if (nextAction === 'Add an engineer') {
                return true;
            } else {
                return false;
            }
        }
    },
    //engineerEmail
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is the engineer\'s email (required)?',
        validate: input => {
            const email = input.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
            if (!email) {
                console.log('Please enter the engineer\'s email!');
                return false;
            } else {
                return true;
            }
        },
        when: ({nextAction}) => {
            if (nextAction === 'Add an engineer') {
                return true;
            } else {
                return false;
            }
        }
    },
    //engineerGithub
    {
        type: 'input',
        name: 'engineerGithub',
        message: 'What is the engineer\'s Github (required)?',
        validate: input => {
            if (!input) {
                console.log('Please enter the engineer\'s Github!');
                return false;
            } else {
                return true;
            }
        },
        when: ({nextAction}) => {
            if (nextAction === 'Add an engineer') {
                return true;
            } else {
                return false;
            }
        }
    },
    //internName
    {
        type: 'input',
        name: 'internName',
        message: 'What is the intern\'s name (required)?',
        validate: input => {
            if (!input) {
                console.log('Please enter the intern\'s name!');
                return false;
            } else {
                return true;
            }
        },
        when: ({nextAction}) => {
            if (nextAction === 'Add an intern') {
                return true;
            } else {
                return false;
            }
        }
    },
    //internId
    {
        type: 'input',
        name: 'internId',
        message: 'What is the intern\'s id (required)?',
        validate: input => {
            if (isNaN(input)) {
                console.log('Please enter the intern\'s id as a strict number!');
                return false;
            } else {
                return true;
            }
        },
        when: ({nextAction}) => {
            if (nextAction === 'Add an intern') {
                return true;
            } else {
                return false;
            }
        }
    },
    //internEmail
    {
        type: 'input',
        name: 'internEmail',
        message: 'What is the intern\'s email (required)?',
        validate: input => {
            const email = input.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
            if (!email) {
                console.log('Please enter the intern\'s email!');
                return false;
            } else {
                return true;
            }
        },
        when: ({nextAction}) => {
            if (nextAction === 'Add an intern') {
                return true;
            } else {
                return false;
            }
        }
    },
    //internSchool
    {
        type: 'input',
        name: 'internSchool',
        message: 'What is the intern\'s school (required)?',
        validate: input => {
            if (!input) {
                console.log('Please enter the intern\'s school!');
                return false;
            } else {
                return true;
            }
        },
        when: ({nextAction}) => {
            if (nextAction === 'Add an intern') {
                return true;
            } else {
                return false;
            }
        }
    }  */  
];


initInquirer(userOptions)
.then( userSelectionObject => {
    let { userInput } = userSelectionObject;
    routeUserSelection(userInput);
})
.catch((error) => {
    console.log('Something didnt work out', error);
}); 
