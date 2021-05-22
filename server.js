const express = require('express');
const port = process.env.PORT || 3010
const { SECRET_KEY } = require('./config')
const cors = require('cors')
const Stripe = require('stripe')
const stripe = new Stripe(SECRET_KEY);

app = express();
mongoose = require('mongoose');
productsRoute = require('./routes/productsRoute');
userRoute = require('./routes/userRoute');
ordersRoute = require('./routes/ordersRoute')
bodyParser = require('body-parser');

// =================== initial settings ===================

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connecting to mongo and checking if DB is running
//async function connecting() {
//    try {
//        await mongoose.connect('mongodb://127.0.0.1/newdatabase', { useUnifiedTopology: true, useNewUrlParser: true })
//        console.log('Connected to the DB')
//    } catch (error) {
//        console.log('ERROR: Seems like your DB is not running, please start it up !!!', error.message);
//    }
//}

async function connecting() {
    try {
        console.log(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`)

        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log('Connected to the DB')
    } catch (error) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!', error.message);
    }
}
connecting()
// temp stuff to suppress internal warning of mongoose which would be updated by them soon
mongoose.set('useCreateIndex', true);
// end of connecting to mongo and checking if DB is running

// routes
app.use('/products', productsRoute);
app.use('/user', userRoute);
app.use('/orders', ordersRoute);
app.post("/checkout",

    /////////////////// CHECK OUT USER /////////////////////
    async (req, res) => {
        console.log("request", req.body)
        const { id, amount, email } = req.body;
        try {
            const payment = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: "eur",
                description: 'Purchased in NB.com',
                payment_method: id,
                receipt_email: email,
                confirm: true
            });
            console.log("payment success", payment)
            return res.status(200).json({
                confirm: "success", payment
            });
        } catch (error) {
            console.error("error:", error)
            return res.status(400).json({
                message: error.raw.message
            })
        }
    })

// Set the server to listen on port 3010
app.listen(port, () => console.log(`listening on port `, port))