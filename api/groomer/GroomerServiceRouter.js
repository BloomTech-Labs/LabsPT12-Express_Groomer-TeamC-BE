const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const permissions = require('../middleware/permissions');
const GSController = require('./GroomerServiceController');

router.get('/', authRequired, GSController.index.bind(GSController))
router.post('/', authRequired, permissions.isGroomer, GSController.post.bind(GSController));
router.put('/', authRequired, permissions.isGroomer, GSController.put.bind(GSController));
router.delete('/', authRequired, permissions.isGroomer, GSController.del.bind(GSController));

module.exports = router