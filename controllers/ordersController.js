const ordersCollection = require('../models/ordersModel');

class ordersController {

    /////////////////// TO DISPLAY ALL Orders /////////////////
    async findAllOrders(req, res) {
        console.log("findAll")
        try {
            const allOrders = await ordersCollection.find({});
            res.send(allOrders);
        }
        catch (e) {
            console.log(e.message)
            res.send({ error: e.message })
        }
    }

    /////////////////// TO ADD ONE PRODUCT /////////////////////
    async insertOrder(req, res) {
        console.log("add one order")
        let email = req.body.email
        let name = req.body.name
        let lastName = req.body.lastName
        let address = req.body.address
        let postCode = req.body.postCode
        let city = req.body.city
        let country = req.body.country
        let OrderProdQuantity = req.body.OrderProdQuantity
        try {
            const done = await ordersCollection.create({ email, name, lastName, address, postCode, city, country, OrderProdQuantity });
            console.log("done order", done)
            res.send(done)
        }
        catch (e) {
            console.log(e.message)
            res.send({ error: e.message })
        }
    }
}

module.exports = new ordersController();