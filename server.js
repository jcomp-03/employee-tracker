/*
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database */

const { userOptions, initInquirer, routeUserSelection } = require('./utils/appFunctions'); // import utility module

initInquirer(userOptions)
.then( userSelectionObject => {
    let { userInput } = userSelectionObject;
    routeUserSelection(userInput);
})
.catch((error) => {
    console.log('Something didnt work out', error);
}); 
