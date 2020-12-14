const pool = require("../model/database");
const PublicationDB = require("../model/publicationDB");

module.exports.getPublications = async(req, res) => {
    const client = await pool.connect();

    const {orderByReports} = req.body;

    try {
        const results = await PublicationDB.getPublications(client, orderByReports);
        res.status(200).json(results.rows);
    } catch(e) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteReportsFromPublication = async(req, res) => {
    const client = await pool.connect();

    const {publiID} = req.body;

    try {
        await PublicationDB.deleteReportsFromPublication(client, publiID);
        res.sendStatus(200);
    } catch(e) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deletePublication = async(req, res) => {
    const client = await pool.connect();
    const {id} = req.body;

    try {
        await client.query("BEGIN;");
        await PublicationDB.deleteReportsFromPublication(client, id);
        await PublicationDB.deleteLikesFromPublication(client, id);
        await PublicationDB.deleteCommentsFromPublication(client, id);

        await PublicationDB.deletePublication(client, id);

        await client.query("COMMIT;");
        res.sendStatus(200);
    } catch(e) {
        await client.query("ROLLBACK;");
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getComments = async(req, res) => {
    const client = await pool.connect();
    const {publiID} = req.body;

    try {
        const results = await PublicationDB.getComments(client, publiID);
        res.status(200).json(results.rows);
    } catch(e) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteComment = async(req, res) => {
    const client = await pool.connect();
    const {id} = req.body;

    try {
         await PublicationDB.deleteComment(client, id);
         res.sendStatus(204);
    } catch(e) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}