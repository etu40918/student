const Router = require("express-promise-router");
const router = new Router;

const PublicationController = require("../controller/PublicationDB");

const Identification = require("../middleware/identification");
const Authorization = require("../middleware/authorization");

/* PUBLICATION */

/**
 * @swagger
 * /publication:
 *  post:
 *      tags:
 *         - Publication
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/PublicationsByReports'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Publications'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 *
 */
router.post('/', Identification.identification, Authorization.mustBeAdmin, PublicationController.getPublications);
/**
 * @swagger
 * /publication:
 *  delete:
 *      tags:
 *          - Publication
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ReportsDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 *
 */
router.delete('/', Identification.identification, Authorization.mustBeAdmin, PublicationController.deletePublication);

/* COMMENTS */

/**
 * @swagger
 * /comments:
 *  post:
 *      tags:
 *          - Publication
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/TargetPublication'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ReportsDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 *
 */
router.post('/comments/', Identification.identification, Authorization.mustBeAdmin, PublicationController.getComments);
/**
 * @swagger
 * /reports:
 *  delete:
 *      tags:
 *          - Publication
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ReportsDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 */
router.delete('/reports/', Identification.identification, Authorization.mustBeAdmin, PublicationController.deleteReportsFromPublication);

/* REPORTS */

/**
 * @swagger
 * /comments:
 *  delete:
 *      tags:
 *          - Publication
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ReportsDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Server error
 */
router.delete('/comments/', Identification.identification, Authorization.mustBeAdmin, PublicationController. deleteComment);


module.exports = router;