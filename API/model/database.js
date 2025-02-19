require("dotenv").config();

const pg = require("pg");
const Pool = pg.Pool;

const username = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDatabase = process.env.DB_DATABASE
const dbPort = process.env.DB_PORT;

const connectionString = `postgresql://${username}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}?ssl=true`

const pool = new Pool({
    connectionString
});

module.exports = pool;
