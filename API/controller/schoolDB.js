const pool = require("../model/database");
const SchoolDB = require("../model/schoolDB");

module.exports.getSchools = async (req, res) => {
    const client = await pool.connect();

    try {
        const results = await SchoolDB.getSchools(client);

        res.status(200).json(results.rows);
    } catch(e){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getOptions = async (req, res) => {
    const client = await pool.connect();
    const {schoolId} = req.body;

    try {
        const results = await SchoolDB.getOptions(client, schoolId);

        res.status(200).json(results.rows);
    } catch(e){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteSchool = async(req, res) => {
    const client = await pool.connect();
    const {id} = req.body;
    
    try {
        await client.query("BEGIN;");
        await SchoolDB.deleteOptions(client, id);
        await SchoolDB.deleteSchool(client, id);
        await client.query("COMMIT;");
        res.sendStatus(204);
    } catch(e) {
        await client.query("ROLLBACK;");
        res.sendStatus(500);
    } finally {
        client.release()
    }
}

module.exports.deleteOption = async(req, res) => {
    const client = await pool.connect();
    const {name, school} = req.body;

    try {
        await SchoolDB.deleteOption(client, name, school);
        res.sendStatus(204);
    } catch(e) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.insertSchool = async(req, res) => {
    const client = await pool.connect();
    const {name, address, phonenumber} = req.body;

    try {
        let result = await SchoolDB.insertSchool(client, name, address, phonenumber);
        if(result.rowCount > 0) {
            res.sendStatus(201);
        } else {
            res.sendStatus(500);
        }
    } catch(e) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.editSchool = async(req, res) => {
    const client = await pool.connect();
    const{schoolId, name, address, phoneNumber} = req.body;

    try {
        const response = await SchoolDB.editSchool(client, schoolId, name, address, phoneNumber);
        if(response !== undefined && response.rowCount !== 0)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    } catch(e){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.insertOption = async(req, res) => {
    const client = await pool.connect();
    const {name, nbyears, school} = req.body;

    let nbYearsInt = parseInt(nbyears);

    if(isNaN(nbYearsInt))
        res.sendStatus(400);

    try {
        let result = await SchoolDB.insertOption(client, name, nbYearsInt, school);
        if(result.rowCount > 0) {
            res.sendStatus(201);
        } else {
            res.sendStatus(500);
        }
    } catch(e) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.editOption = async(req, res) => {
    const client = await pool.connect();
    const{lastName, schoolId, name, nbYears} = req.body;

    let nbYearsInt = parseInt(nbYears);

    if(isNaN(nbYearsInt))
        res.sendStatus(400);

    try {
        const response = await SchoolDB.editOption(client, lastName, schoolId, name, nbYearsInt);
        if(response !== undefined && response.rowCount !== 0)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    } catch(e){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
