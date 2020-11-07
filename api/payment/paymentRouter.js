const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const PaymentController = require('./paymentController');

router.post(
  '/charge',
  authRequired,
  PaymentController.post.bind(PaymentController)
);

module.exports = router;
