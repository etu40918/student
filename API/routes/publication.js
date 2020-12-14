const Router = require("express-promise-router");
const router = new Router;

const PublicationController = require("../controller/PublicationDB");

const Identification = require("../middleware/identification");
const Authorization = require("../middleware/authorization");

router.post('/', PublicationController.getPublications);
router.delete('/', PublicationController.deletePublication);

router.post('/comments/', PublicationController.getComments);

router.delete('/reports/', PublicationController.deleteReportsFromPublication);
router.delete('/comments/', PublicationController. deleteComment);


module.exports = router;