const Router = require("express-promise-router");
const router = new Router;

const SchoolController = require("../controller/schoolDB");

const Identification = require("../middleware/identification");
const Authorization = require("../middleware/authorization");

router.get('/', SchoolController.getSchools);
router.post('/', SchoolController.insertSchool);
router.delete('/', SchoolController.deleteSchool);
router.patch('/', SchoolController.editSchool);

router.post('/option', SchoolController.insertOption);
router.delete('/option', SchoolController.deleteOption);
router.patch('/option', SchoolController.editOption);

router.post('/options', SchoolController.getOptions);

module.exports = router;