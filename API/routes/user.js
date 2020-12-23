const Router = require("express-promise-router");
const router = new Router;

const UserController = require("../controller/userDB");

const Identification = require("../middleware/identification");
const Authorization = require("../middleware/authorization");

/**
 * @swagger
 * /role:
 *  get:
 *      tags:
 *         - User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Role'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *
 */
router.get('/role/', Identification.identification, UserController.getUserRole);

/**
 * @swagger
 * /user:
 *  get:
 *      tags:
 *         - User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Users'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 */
router.get('/', Identification.identification, Authorization.mustBeAdmin, UserController.getUsers);

/**
 * @swagger
 * /user:
 *  delete:
 *      tags:
 *          - User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/RemovedUser'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 */
router.delete('/', Identification.identification, Authorization.mustBeAdmin, UserController.removeUser);

/**
 * @swagger
 * /user:
 *  patch:
 *      tags:
 *          - User
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/UserToEdit'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/EditedUser'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          404:
 *              description: School not found
 *          500:
 *              description: Erreur serveur
 *
 */
router.patch('/', UserController.editUser);

module.exports = router;