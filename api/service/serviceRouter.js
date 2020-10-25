const express = require('express');
const authRequired = require('./../middleware/authRequired');
const ServiceController = require('./serviceController');

const router = express.Router();

router.get('/', authRequired, ServiceController.index.bind(ServiceController));
router.get('/:id', authRequired, ServiceController.get.bind(ServiceController));
router.post('/', authRequired, ServiceController.post.bind(ServiceController));
router.put('/', authRequired, ServiceController.put.bind(ServiceController));
router.delete('/', authRequired, ServiceController.del.bind(ServiceController));

module.exports = router;
