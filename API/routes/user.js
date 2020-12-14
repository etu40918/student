const Router = require("express-promise-router");
const router = new Router;

const UserController = require("../controller/userDB");

const Identification = require("../middleware/identification");

router.get('/role/', Identification.identification, UserController.getUserRole);
router.get('/', UserController.getUsers);
router.delete('/', UserController.removeUser);

module.exports = router;