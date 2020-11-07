const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const permissions = require('./../middleware/permissions');
const PaymentController = require('./paymentController');

router.post(
  '/charge',
  authRequired,
  permissions.canMakePayment,
  PaymentController.post.bind(PaymentController)
);

module.exports = router;
