const pool = require("../model/database");

const UserDB = require("../model/userDB");
const PublicationDB = require("../model/publicationDB");

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: Email of the user (used as id)
 *              password:
 *                  type: string
 *                  description: Crypted password of the user
 *              lastname:
 *                  type: string
 *                  description: Last name of the user
 *              firstname:
 *                  type: string
 *                  description: First name of the user
 *              birthday:
 *                  type: string
 *                  description: Birthdate of the user
 *              bloc:
 *                  type: integer
 *                  description: Represents the actual year of study of the user in his option
 *              role:
 *                  type: string
 *                  description: Describe the statut of the user
 *              optionname:
 *                  type: string
 *                  description: Name of the option followed by the student
 *              optionschool:
 *                  type: integer
 *                  description: Id of the school where the user is studying at
 */


/**
 * @swagger
 * components:
 *  responses:
 *      Role:
 *           description: Return the role of user
 *           content:
 *               application/json:
 *                   schema:
 *                       properties:
 *                          role:
 *                              type: string
 *                              description: Role of user
 */
module.exports.getUserRole = (req, res) => {
    const userInfos = {"user": req.session.email, "role": req.session.authLevel};

    res.status(200).json(userInfos)

}

/**
 * @swagger
 * components:
 *  responses:
 *      Users:
 *           description: Return all users
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      RemovedUser:
 *           description: User deleted
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      EditedUser:
 *          description: User updated
 *  requestBodies:
 *      UserToEdit:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Email of the user, also used as ID
 *                          lastname:
 *                              type: string
 *                              description: Last name of the user
 *                          firstname:
 *                              type: string
 *                              description: First name of the user
 *                          bloc:
 *                              type: integer
 *                              description: Actual year of study
 *                          optionname:
 *                              type: string
 *                              description: Name of the option the user is studying
 *                          schoolid:
 *                              type: integer
 *                              description: Identificator of the school the user is studying at
 */
module.exports.editUser = async(req, res) => {
    const client = await pool.connect();
    const{email, lastName, firstName, bloc, optionName, schoolId} = req.body;

    try {
        const response = await UserDB.editUser(client, email, firstName, lastName, schoolId, optionName, bloc);
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
