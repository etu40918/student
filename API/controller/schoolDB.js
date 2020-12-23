const pool = require("../model/database");
const SchoolDB = require("../model/schoolDB");

/**
 * @swagger
 * components:
 *  schemas:
 *      School:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *                  description: School name
 *              phonenumber:
 *                  type: string
 *                  description: School phone number
 *              address:
 *                  type: string
 *                  description: School address
 *      Option:
 *          type: object
 *          properties:
 *               name:
 *                   type: string
 *                   description: Option name
 *               nbYears:
 *                   type: integer
 *                   description: Amount of years for the option
 *               school:
 *                   type: integer
 *                   description: Id of school
 */

/**
 * @swagger
 * components:
 *  responses:
 *      Schools:
 *           description: Return schools
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/School'
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      Options:
 *           description: Return options of selected school
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Option'
 *
 *  requestBodies:
 *      OptionsOfSchool:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          schoolId:
 *                              type: integer
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      SchoolDeleted:
 *           description: School deleted
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/School'
 *
 *
 */
module.exports.deleteSchool = async(req, res) => {
    const client = await pool.connect();
    const {id} = req.body;
    
    try {
        await client.query("BEGIN;");
        await SchoolDB.patchSchoolFromUsers(client, id);
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

/**
 * @swagger
 * components:
 *  responses:
 *      OptionDeleted:
 *           description: Option deleted
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Option'
 *
 */
module.exports.deleteOption = async(req, res) => {
    const client = await pool.connect();
    const {name, school} = req.body;

    try {
        await SchoolDB.patchOptionFromUsers(client, school, name);
        await SchoolDB.deleteOption(client, name, school);
        res.sendStatus(204);
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
*      SchoolAdded:
*          description: School added
*  requestBodies:
*      SchoolToAdd:
*          content:
*              application/json:
*                  schema:
*                      type: object
*                      properties:
*                          name:
*                              type: string
*                          address:
*                              type: string
*                          phonenumber:
*                              type: string
*/
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

/**
 * @swagger
 * components:
 *  responses:
 *      SchoolUpdated:
 *          description: School updated
 *  requestBodies:
 *      SchoolToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          schoolId:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          address:
 *                              type: string
 *                          phoneNumber:
 *                              type: string
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      OptionAdded:
 *          description: Option added
 *  requestBodies:
 *      OptionToAdd:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          nbyears:
 *                              type: string
 *                          school:
 *                              type: integer
 */
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

/**
 * @swagger
 * components:
 *  responses:
 *      OptionUpdated:
 *          description: Option updated
 *  requestBodies:
 *      OptionToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          lastName:
 *                              type: string
 *                          schoolId:
 *                              type: integer
 *                          name:
 *                              type: string
 *                          nbYears:
 *                              type: integer
 */
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
