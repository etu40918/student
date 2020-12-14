const pool = require("../model/database");

const UserDB = require("../model/userDB");
const PublicationDB = require("../model/publicationDB");

module.exports.getUserRole = (req, res) => {
    const userInfos = {"user": req.session.email, "role": req.session.authLevel};

    res.json(userInfos);
}

module.exports.getUsers = async (req, res) => {
    const client = await pool.connect();

    try {
        const results = await UserDB.getUsers(client);

        res.status(200).json(results.rows);
    } catch(e){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.userExist = async (req, res) => {
    const client = await pool.connect();

    const {email} = req.body;

    try {
        return await UserDB.userExist(client, email);
    } catch(e){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.removeUser = async (req, res) => {
    const client = await pool.connect();

    const {email} = req.body;

    try {
        await client.query("BEGIN;");
        const userExist = await UserDB.userExist(client, email);

        if(userExist) {
            let publications = await PublicationDB.getPublicationsFromUser(client, email);
            publications = publications.rows;

            for(let publication of publications){
                await PublicationDB.deleteReportsFromPublication(client, publication.id);
                await PublicationDB.deleteLikesFromPublication(client, publication.id);
                await PublicationDB.deleteCommentsFromPublication(client, publication.id);

                await PublicationDB.deletePublication(client, publication.id);
            }

            await PublicationDB.deleteCommentsFromUser(client, email);
            await PublicationDB.deleteLikesFromUser(client, email);
            await PublicationDB.deleteReportsFromUser(client, email);

            await UserDB.deleteUser(client, email);

            await client.query("COMMIT;");
            res.sendStatus(204);
        } else {
            await client.query("ROLLBACK;");
            res.status(404).send("User doesn't exist");
        }
    } catch(e){
        await client.query("ROLLBACK;");
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
