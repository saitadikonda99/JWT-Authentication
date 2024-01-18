const mysql2 = require('mysql2')

const pool = mysql2.createPool({
    host : process.env.dbhostname,
    user : process.env.dbuser,
    password: process.env.dbpasscode,
    database: process.env.dbname,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

pool.getConnection()
    .then(connection => {
        console.log(`Connected to MySQL database as ID: ${connection.threadId}`)
    })
    .catch(error => {
        console.log(`Unable to connect to MySQL database: ${error}`)
    })

module.exports = {
    pool
};



