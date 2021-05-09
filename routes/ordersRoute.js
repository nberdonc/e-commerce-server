
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/ordersController');

//  == This route will give us back all orders: ==  //

router.get('/', controller.findAllOrders);

//  == This route allow us to add an extra order: ==  //

router.post('/add', controller.insertOrder);



module.exports = router;
