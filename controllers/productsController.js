const prodList = require('../models/productModel');
const Mongoose = require("mongoose");

class productsController {

    /////////////////// TO DISPLAY ALL PRODUCTS /////////////////
    async findAll(req, res) {
        console.log("findAll")
        try {
            const allProducts = await prodList.find({});
            res.send(allProducts);
        }
        catch (e) {
            console.log(e.message)
            res.send({ error: e.message })
        }
    }

    //////////////////// TO FIND ONE PRODUCT ////////////////////
    async findOne(req, res) {
        console.log("findOne")
        let name = req.params.name;
        console.log(req.params.name)
        try {
            const oneProduct = await prodList.findOne({ name: name });
            console.log(oneProduct)
            res.send(oneProduct);
        }
        catch (e) {
            res.send({ error: e.message })
        }
    }

    /////////////////// TO ADD ONE PRODUCT /////////////////////
    async insert(req, res) {
        console.log("add one")
        let name = req.body.name
        let price = req.body.price
        let category = req.body.category
        let onSale = req.body.onSale
        let quantity = req.body.quantity
        let image = req.body.image
        let stock = req.body.stock
        try {
            const found = await prodList.findOne({ name: name });
            if (found) {
                res.send(false);
            }
            else {
                const done = await prodList.create({ name, price, category, onSale, quantity, image, stock });
                res.send(done)
            }
        }
        catch (e) {
            res.send({ error: e.message })
        }
    }

    /////////////////////// TO DELETE ONE PRODUCT //////////////////////
    async delete(req, res) {
        console.log("delete")
        let id = req.body.id;
        try {
            const removed = await prodList.findByIdAndDelete(id);
            res.send({ removed });
        }
        catch (error) {
            res.send({ error: error.message })
        };
    }

    //////////////////// TO UPDATE ONE PRODUCT /////////////////////////
    async update(req, res) {
        console.log("update")
        let id = req.body.id
        let newName = req.body.name
        let newPrice = req.body.price
        let newCategory = req.body.category
        let newOnSale = req.body.onSale
        let newStock = req.body.stock
        let newImage = req.body.image
        try {
            const updated = await prodList.findOneAndUpdate(
                { _id: id }, { name: newName, price: newPrice, category: newCategory, onSale: newOnSale, stock: newStock, image: newImage }, { new: true }
            );
            res.send({ updated });
        }
        catch (error) {
            res.send({ error: error.message })
        };
    }

    //////////////////// CHECKOUT FIND AND UPDATE STOCK/////////////////////////

    async updateStock(req, res) {
        let input = req.body
        let bulkArr = [];
        try {
            input.map((product) => {
                console.log("product of input", product)
                bulkArr.push({
                    updateOne: {
                        "filter": { "_id": Mongoose.Types.ObjectId(product.id) },
                        "update": { $inc: { "stock": - product.quantity } }
                    }
                })
                console.log("Array for bulking", bulkArr)
            })
            const response = await prodList.bulkWrite(bulkArr)
            console.log("Succesfull bulking!")
            res.send({ response })
        }
        catch (error) {
            console.log("NoT working")
            console.log(error)
            res.send({ error: error.message })
        };
    }

    //////////////////// RESET STOCK DUE TOO CARD FAILUR/////////////////////////

    async resetStock(req, res) {
        let input = req.body
        let bulkArr = [];
        try {
            input.map((product) => {
                console.log("product of input reset", product)
                bulkArr.push({
                    updateOne: {
                        "filter": { "_id": Mongoose.Types.ObjectId(product.id) },
                        "update": { $inc: { "stock": product.quantity } }
                    }
                })
                console.log("Array for bulking reset", bulkArr)
            })
            const response = await prodList.bulkWrite(bulkArr)
            console.log("Succesfull bulking reset!")
            res.send({ response })
        }
        catch (error) {
            console.log("NoT working reset")
            console.log(error)
            res.send({ error: error.message })
        };
    }
};
module.exports = new productsController();