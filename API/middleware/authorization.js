/**
 *@swagger
 * components:
 *  responses:
 *      mustBeAdmin:
 *          description: This feature can only be used by an admin
 */
module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session !== undefined && req.session.authLevel === "admin"){
        next();
    } else {
        res.sendStatus(403);
    }
}
