const { Router } = require('express');
const { placeOrder } = require('../controllers/order-controller');
const { isAuth } = require('../middlewares/is-auth');

const router = Router();

router.route('/').post(isAuth, placeOrder);

module.exports = router;
