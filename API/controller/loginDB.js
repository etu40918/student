const pool = require("../model/database");
const LoginDB = require("../model/loginDB");

const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components:
 *  responses:
 *      Token:
 *           description: Return token
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/User'
 *  requestBodies:
 *      LoginConnection:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Email of the user
 *                          password:
 *                              type: string
 *                              description: Password of the user
 *
 */
module.exports.getUser = async (req, res) => {
    const client = await pool.connect();
    const {email, password} = req.body;

    if(email === undefined || password === undefined){
        res.sendStatus(400);
    } else {
        try {
            const result = await LoginDB.getUser(client, email, password);
            const {userRole} = result;

            if(userRole === "unknown")
                res.status(404).send("Password isn't correct or user doesn't exist !");
            else {
                const payload = {status: userRole, value: {email}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '2h'}
                );
                res.status(200).json(token);
            }
        } catch (e) {
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}