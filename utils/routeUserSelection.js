

function routeUserSelection(input) {
    console.log('You\'re inside the routeUserSelection function! Congratulations!');
    switch (input) {
        case 'View all departments':
            // run function viewAllDepartments            
            break;
        case 'View all roles':
            // run function viewAllRoles
            break;
        case 'View all employees':
            // run function viewAllEmployees
            break;
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
