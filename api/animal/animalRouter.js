const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const AnimalController = require('./animalController');
const fileUploadHandler = require('./../middleware/multer-s3')

router.get('/', authRequired, AnimalController.index.bind(AnimalController));
router.get('/:id', authRequired, AnimalController.get.bind(AnimalController));
router.post('/', authRequired, fileUploadHandler.single('animal_picture'), AnimalController.post.bind(AnimalController));
router.put('/', authRequired, fileUploadHandler.single('animal_picture'), AnimalController.put.bind(AnimalController));
router.delete('/:id', authRequired, AnimalController.del.bind(AnimalController));

module.exports = router;