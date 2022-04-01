/*
const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    host: process.env.MY_HOST,
    port: process.env.MY_PORT,
    database: process.env.MY_DATABASE,
    user: process.env.MY_USER,
    password: process.env.MY_PASSWORD
})

module.exports = pool*/
const Pool = require("pg").Pool;
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;