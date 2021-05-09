const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/userController');

const { authenticateJWT } = require('../auth')

router.get('/', controller.findAll);

router.post('/signin', controller.signIn);

router.post('/register', controller.insert);

router.post('/find', authenticateJWT, controller.findUser);

router.post('/delete', authenticateJWT, controller.delete);

router.post('/update', authenticateJWT, controller.update);

module.exports = router;

