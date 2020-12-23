const pool = require("../model/database");
const PublicationDB = require("../model/publicationDB");

/**
 * @swagger
 * components:
 *  schemas:
 *      Publication:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Identificator of the publication
 *              content:
 *                  type: string
 *                  description: Text that's inside the publication (written by the author)
 *              date:
 *                  type: string
 *                  description: Date of the day the publication was published
 *              user:
 *                  type: integer
 *                  description: Id of the author of the publication (Member)
 *      Report:
 *          type: object
 *          properties:
 *              userID:
 *                  type: string
 *                  description: Id(email) of the user who reported
 *              publiID:
 *                  type: integer
 *                  description: Id of the publication who has been reported
 *      Comment:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Identificator of the comment
 *              content:
 *                  type: string
 *                  description: Text content of the comment
 *              date:
 *                  type: string
 *                  description: Date when the publication was published
 *              user:
 *                  type: string
 *                  description: Id(email) of the user who commentend
 *              publication:
 *                  type: integer
 *                  description: Id of the publication where the comment was posted
 *
 */

/**
 * @swagger
 * components:
 *  responses:
 *      Publications:
 *           description: Return all publications from the database
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Publication'
 *  requestBodies:
 *      PublicationsByReports:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          orderByReports:
 *                              type: boolean
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      ReportsDeleted:
 *           description: Reports from the publication deleted
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Report'
 *
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      PublicationDeleted:
 *           description: Publication deleted
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Publication'
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      Comments:
 *           description: Return all comments from the targeted publication
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Comment'
 *  requestBodies:
 *      TargetPublication:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          publiID:
 *                              type: integer
 *                              description: ID of the targeted publication
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      DeletedComment:
 *           description: CommentDeleted
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Comment'
 */
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