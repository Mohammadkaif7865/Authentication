const express = require('express');
const app = express();
const db = require('./db');
const port = 4000;
const cors = require('cors');
app.use(cors());
const AuthController = require('./controller/authController');
app.use("/api/auth", AuthController);
// # Now the route will be like /api/auth/authorization_controller_route
app.listen(port, () => {
    console.log(`listing to port : ${port}`);
});

