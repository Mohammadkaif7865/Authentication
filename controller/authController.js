const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// get all users from collection
router.get('/users', (req, res) => {
    User.find({}, (err, user) => {
        if (err) throw err;
        res.send(user);
    })
})
router.post('/register', (req, res) => {
    // password encryption
    let encryptedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
        phone: req.body.phone,
        role: req.body.role ? req.body.role : 'user'
    }, (err, data) => {
        if (err) return res.status(500).send("Error while register");
        res.status(200).send("Registered successfully!!")

    })

})
router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.send({ auth: false, token: "Error while connection" });
        if (!user) return res.send({ auth: false, token: "No user is found Register first" });
        else {
            const passIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passIsValid)
                return res.send({ auth: false, token: "Invalid password" });
            // password correct 
            let token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 })// 24 hours
            return res.send({ auth: true, token: token });
        }
    })
})
router.get('/getInfo', (req, res) => {
    let token = req.header("x-access-token");
    if(!token) res.send({auth: false, token: "No token is found" });
    // JWT verifying
    jwt.verify(token, config.secret, (err, user) => {
        if(err) return res.send({auth: false, token:"invalid token"})
        User.findById(user.id, (err, result) => {
            res.send(result);
        })
    })
})
module.exports = router;
