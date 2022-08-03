const express = require('express');
const router = express.router();
const bodyParser = require('body-parser');
const jwt = require('jwt');
const config = require('../config');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// get all users from collection
router.get('/users', (req, res) => {
    User.find({}), (err, user) => {
        if (err) throw err;
        res.send(user);
    }
})
module.exports = router;
