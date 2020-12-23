const pool = require("../../model/database");
const fs = require('fs');
const path = require('path');

async function initDB(){
    const client = await pool.connect();
    try {
        let query = fs.readFileSync(path.join(__dirname, "../SQL/createDB.sql"), "utf-8");
        await client.query(query);
        query = fs.readFileSync(path.join(__dirname, "../SQL/fillDB.sql"), "utf-8");
        await client.query(query);
    } catch(e){
        console.log(e);
    } finally {
        client.release();
        await pool.end();
    }
}

initDB().then(() => console.log("DB done !"));