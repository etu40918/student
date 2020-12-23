const Router = require("express-promise-router");
const router = new Router;

const LoginController = require("../controller/loginDB");

/**
 * @swagger
 * /login:
 *  post:
 *      tags:
 *          - User
 *      requestBody:
 *          $ref: '#/components/requestBodies/LoginConnection'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Token'
 *          400:
 *              description: Uncomplete informations
 *          404:
 *              description: Login or password incorrect
 *          500:
 *              description: Server error
 *
 */
router.post('/', LoginController.getUser);

module.exports = router;