const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    host: process.env.MY_HOST,
    port: process.env.MY_PORT,
    database: process.env.MY_DATABASE,
    user: process.env.MY_USER,
    password: process.env.MY_PASSWORD
})

module.exports = pool