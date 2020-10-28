const router = require('express').Router();
const authRequired = require("./../middleware/authRequired");
const AppointController = require("./appointmentController");

router.post('/make', authRequired, AppointController.post.bind(AppointController));
router.put('/reschedule', authRequired, AppointController.put.bind(AppointController));
router.delete('/:id', authRequired, AppointController.del.bind(AppointController))

module.exports = router