const router = require('express').Router();
const ClientController = require('./clientController');
const authRequired = require('./../middleware/authRequired');

router.get('/:id', authRequired, ClientController.get.bind(ClientController));

module.exports = router;
