const Order = require('../models/Order');
const { errorHandler, HTTP_STATUS } = require('../utils/error-handler');

// @route   POST api/v1/order/
// @desc    Places new order
// @access  Private
exports.placeOrder = (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    totalPrice
  } = req.body;

  Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.userId
  })
    .then(order => {
      res.status(HTTP_STATUS.CREATED).json({
        message: 'Successfully placed the order',
        order
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not place order currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
