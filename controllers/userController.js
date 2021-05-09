const userList = require('../models/userModel');

const { getToken } = require('../util')


class userController {

    /////////////////// TO DISPLAY ALL USERS /////////////////
    async findAll(req, res) {
        console.log("find all")
        try {
            const allUsers = await userList.find({});
            res.send(allUsers);
        }
        catch (e) {
            console.log(e.message)
            res.send({ error: e.message })
        }
    }

    /////////////////// SIGN IN /////////////////////
    async signIn(req, res) {
        console.log("sign in")
        let email = req.body.email
        let password = req.body.password
        try {
            const found = await userList.findOne({ email: email, password: password });
            if (found) {
                console.log("token:", found.token)
                res.send({
                    _id: found.id,
                    name: found.name,
                    lastName: found.lastName,
                    email: found.email,
                    isAdmin: found.isAdmin,
                    token: getToken(found)
                });
            }
            else {
                res.status(401).send({ msg: 'Invalid Email or Password.' })
            }
        }
        catch (e) {
            res.send({ error: e.message })
        }
    }

    /////////////////// REGISTER /////////////////////
    async insert(req, res) {
        console.log("register")
        let name = req.body.name
        let lastName = req.body.lastName
        let email = req.body.email
        let password = req.body.password
        let isAdmin = req.body.isAdmin
        try {
            const found = await userList.findOne({ email: email });
            const count = await userList.count({})
            if (found) {
                res.send(false);
            }
            else if (count === 0) {
                const done = await userList.create({ name: name, lastName: lastName, email: email, password: password, isAdmin: true });
                res.send(done)
            }
            else {
                const done = await userList.create({ name: name, lastName: lastName, email: email, password: password, isAdmin: isAdmin });
                res.send(done)
            }
        }
        catch (e) {
            res.send({ error: e.message })
        }
    }

    /////////////////// FIND USER /////////////////////
    async findUser(req, res) {
        console.log("find user")
        let email = req.body.email
        console.log("from back", email)
        console.log("from back", req.body)
        try {
            const found = await userList.findOne({ email: email });
            console.log("from back, found", found)
            if (found) {
                res.send({
                    name: found.name,
                    lastName: found.lastName,
                    email: found.email,
                    isAdmin: found.isAdmin,
                    id: found._id,
                });
            }
            else {
                res.status(401).send({ msg: 'Invalid Email or Password.' })
            }
        }
        catch (e) {
            res.send({ error: e.message })
        }
    }

    /////////////////////// TO DELETE ONE USER //////////////////////
    async delete(req, res) {
        console.log("delete")
        let id = req.body.id;
        try {
            const removed = await userList.findByIdAndDelete(id);
            res.send({ removed });
        }
        catch (error) {
            res.send({ error: e.message })
        };
    }

    //////////////////// TO UPDATE USER /////////////////////////
    async update(req, res) {
        console.log("update")
        let id = req.body.id
        let isAdmin = req.body.isAdmin
        try {
            const updated = await userList.findOneAndUpdate(
                { _id: id }, { isAdmin: isAdmin }, { new: true }
            );
            res.send({ updated });
        }
        catch (error) {
            res.send({ error: e.message })
        };
    }
};

module.exports = new userController();
