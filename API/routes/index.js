const LoginRouter = require('./login');
const UserRouter = require('./user');
const SchoolRouter = require('./school');
const PublicationRouter = require('./publication');

const Router = require("express-promise-router");
const router = new Router;

const Hash = require("../utils/hashUtils");

router.use("/login", LoginRouter);
router.use("/user", UserRouter);
router.use("/school", SchoolRouter);
router.use("/publication", PublicationRouter);

router.get("/", (req, res) => {
    res.send("Hello world !");
});

router.get("/hash/:password", async (req, res) => {
    if(req.params.password !== undefined) {
        const hashPwd = await Hash.getHash(req.params.password);
        res.send(hashPwd);
    }
    else
        res.send("You need to enter a password !");
});

module.exports = router;