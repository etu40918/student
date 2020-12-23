const Router = require("express-promise-router");
const router = new Router;

const SchoolController = require("../controller/schoolDB");

const Identification = require("../middleware/identification");
const Authorization = require("../middleware/authorization");

/* SCHOOL */

/**
 * @swagger
 * /school:
 *  get:
 *      tags:
 *         - School
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Schools'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/', Identification.identification, Authorization.mustBeAdmin, SchoolController.getSchools);
/**
 * @swagger
 * /school:
 *  post:
 *      tags:
 *         - School
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/SchoolToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/SchoolAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 */
router.post('/', Identification.identification, Authorization.mustBeAdmin, SchoolController.insertSchool);
/**
 * @swagger
 * /school:
 *  patch:
 *      tags:
 *          - School
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/SchoolToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/SchoolUpdated'
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
router.patch('/', Identification.identification, Authorization.mustBeAdmin, SchoolController.editSchool);
/**
 * @swagger
 * /school:
 *  delete:
 *      tags:
 *          - School
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/SchoolDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.delete('/', Identification.identification, Authorization.mustBeAdmin, SchoolController.deleteSchool);

/* OPTION */

/**
 * @swagger
 * /option:
 *  post:
 *      tags:
 *         - Option
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/OptionToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/OptionAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 */
router.post('/option', SchoolController.insertOption);
/**
 * @swagger
 * /option:
 *  patch:
 *      tags:
 *          - Option
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/OptionToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/OptionUpdated'
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
router.patch('/option', Identification.identification, Authorization.mustBeAdmin, SchoolController.editOption);
/**
 * @swagger
 * /option:
 *  delete:
 *      tags:
 *          - Option
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/OptionDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.delete('/option', Identification.identification, Authorization.mustBeAdmin, SchoolController.deleteOption);
/**
 * @swagger
 * /options:
 *  post:
 *      tags:
 *         - Option
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/OptionsOfSchool'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Options'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 *
 */
router.post('/options', Identification.identification, Authorization.mustBeAdmin, SchoolController.getOptions);

module.exports = router;