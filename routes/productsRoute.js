
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/productsController');

const { authenticateJWT } = require('../auth')

//  == This route will give us back all products: ==  //

router.get('/', controller.findAll);

//  == This route will give us back one product, it will be that with the id we are providing: ==  //

router.get('/find/:name', authenticateJWT, controller.findOne);

//  == This route allow us to add an extra product: ==  //

router.post('/add/', authenticateJWT, controller.insert);

//  == This route allow us to delete one product will be that with the id we are providing: ==  //

router.post('/delete', authenticateJWT, controller.delete);

//  == This route allow us to update one product will be that with the id we are providing ==  //

router.post('/update', authenticateJWT, controller.update);

//  == This route allow us to update product stock before payment so product is reserved for client at payment==  //

router.post('/update/stock', controller.updateStock);

//  == This route allow us to reset product stock to original if payment fails==  //

router.post('/reset/stock', controller.resetStock);

module.exports = router;



