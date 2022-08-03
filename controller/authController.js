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
module.exports = router;
