const router = require('express').Router();
const authRequired = require("./../middleware/authRequired");
const AppointController = require("./appointmentController");

router.post('/schedule', authRequired, AppointController.post.bind(AppointController));
router.put('/', authRequired, AppointController.put.bind(AppointController));
router.delete('/:id/cancel', authRequired, AppointController.del.bind(AppointController))

module.exports = router