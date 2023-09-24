const express = require('express');
const adminController = require('../controllers/admin');
const { isAuthenticated }  = require('../middlewares/isAuth');

const router = express.Router();

router.get('/products', isAuthenticated, adminController.getAdminProducts);
router.get('/add-product', isAuthenticated, adminController.getAddProduct);
router.get('/edit-product/:prodId', isAuthenticated, adminController.getEditProduct);
router.post('/add-product', isAuthenticated, adminController.postAddProduct);
router.post('/edit-product', isAuthenticated, adminController.updateProduct);
router.post('/delete-product', isAuthenticated, adminController.deleteProduct);

module.exports = router;