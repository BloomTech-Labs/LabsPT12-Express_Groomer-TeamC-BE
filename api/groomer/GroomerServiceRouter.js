const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const permissions = require('../middleware/permissions');
const GSController = require('./GroomerServiceController');

router.get('/', authRequired, GSController.index.bind(GSController))
router.post('/', authRequired, permissions.isGroomer, permissions.canPerform,  GSController.post.bind(GSController));
router.put('/', authRequired, permissions.isGroomer, permissions.canPerform,  GSController.put.bind(GSController));
router.delete('/', authRequired, permissions.isGroomer, permissions.canPerform,  GSController.del.bind(GSController));

module.exports = router