const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order-controller');
const authenticateJWT = require('../Middlewares/authenticateMiddleware');
const authorizeRole = require('../Middlewares/authorizationMiddleware');

router.post('/create-order', authenticateJWT, orderController.orderSubmit);
router.get('/get-orders', authenticateJWT, authorizeRole('admin'), (orderController.getOrders));
router.get('/get-single-order/:id', authenticateJWT, authorizeRole('admin'), (orderController.getSingleOrder));
router.put('/update-order-status/:id', authenticateJWT, authorizeRole('admin'),orderController.updateOrderStatus);
router.get('/get-customers', authenticateJWT, (orderController.getCustomers));
router.get('/get-user-orders', authenticateJWT, orderController.getUserOrders);
router.get('/imei', authenticateJWT, orderController.getIMEINumbers);
router.get('/fetch-data-by-unique-code/:code', authenticateJWT, orderController.getDataFromUniqueCode);
router.put('/update-order-notes/:id', authenticateJWT, orderController.updateOrderNotes);
router.put('/update-order/:id', authenticateJWT, orderController.updateOrder);

router.get('/tac-lookup/:tac', authenticateJWT, orderController.fetchTac);

module.exports = router;