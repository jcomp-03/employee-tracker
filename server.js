/*
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database */

const inquirer = require('inquirer'); // import 3rd-party module
const db = require('./db/connection'); // import utility module
const routeUserSelection = require('./utils/routeUserSelection'); // import utility module


const optionsOnStart = [
    // initialInput
    {
        type: 'list',
        name: 'userInput',
        message: 'Welcome to the Content Management System. What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee\'s role',],
        default: 'View all employees'
    }
]

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

function startInquirer() {
    return inquirer.prompt(optionsOnStart);
}

/* startInquirer()
.then( userSelectionObject => {
    let { userInput } = userSelectionObject;
    console.log('userInput is:', userInput);
    routeUserSelection(userInput);
}); */


db.connect( err => {
    if (err) {
        console.error('There has been an error connecting: ', err);
        return;
    }
    console.log('Connected succesfully to database');
});


/* inquirer
  .prompt([

  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
});
 */