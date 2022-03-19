const mysql = require('mysql2');
require('dotenv').config();


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username, 
      user: process.env.DB_USER,
      // Your MySQL password
      password: process.env.DB_PW,
      database: process.env.DB_NAME
    },

    console.log(`Created a connection to the ${(process.env.DB_NAME)} database.`)
);

module.exports = db;