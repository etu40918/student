const Router = require("express-promise-router");
const router = new Router;

const LoginController = require("../controller/loginDB");

router.post('/', LoginController.getUser);

module.exports = router;