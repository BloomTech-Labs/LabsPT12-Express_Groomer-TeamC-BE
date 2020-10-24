const express = require('express');
// const authRequired = require('./../middleware/authRequired');
const ServiceController = require('./serviceController');

const router = express.Router();

router.get('/', ServiceController.index.bind(ServiceController));
router.get('/:id', ServiceController.get.bind(ServiceController));
router.post('/', ServiceController.post.bind(ServiceController));
router.put('/', ServiceController.put.bind(ServiceController));
router.delete('/', ServiceController.del.bind(ServiceController));

module.exports = router;
