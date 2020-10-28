const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const permissions = require('./../middleware/permissions');
const AnimalController = require('./animalController');

router.get('/', authRequired, AnimalController.index.bind(AnimalController));
router.get('/:id', authRequired, AnimalController.get.bind(AnimalController));
router.post('/', authRequired, AnimalController.post.bind(AnimalController));
router.put('/', authRequired, AnimalController.put.bind(AnimalController));
router.delete('/:id', authRequired, AnimalController.del.bind(AnimalController));

module.exports = router;