const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const PaymentController = require('./paymentController');

router.post(
  '/charge',
  authRequired,
  PaymentController.post.bind(PaymentController)
);

router.get(
  '/:appointmentId/total-price',
  authRequired,
  PaymentController.getTotalPrice.bind(PaymentController)
);

module.exports = router;
