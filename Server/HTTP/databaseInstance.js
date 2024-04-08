const mysql = require("mysql");

// Export the connection object
exports.con = mysql.createConnection({
    host: '194.110.173.106',
    user:'sust_matthew',
    password:'qwe',
    database: "sust_main",
});
