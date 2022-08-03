let mongoose = require('mongoose');
mongoose.connect("mongodb+srv://MohammadKaif:cyxXembixN43e0Es@cluster0.yatgbap.mongodb.net/User?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});