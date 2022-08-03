const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const port = 4000;
app.use(cors());
const AuthController = require('./controller/authController');
app.use("/api/auth",AuthController);
app.listen(port,() => {
    console.log(`listening to port ${port}`);
});

