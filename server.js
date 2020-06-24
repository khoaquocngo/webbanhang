const express = require("express");
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const db = require("./services/db");
const app = express();


const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views','./views')


//Session
app.use(
  cookieSession({
    name: "session",
    keys: ["123456"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
//Middleware
app.use(require("./middlewares/auth"));

//Route
app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));


app.use("/logout", require("./routes/logout"));
app.use("/register", require("./routes/register"));
app.use("/profile", require("./routes/profile"));
app.use("/ChangePassword", require("./routes/ChangePassword"));
app.use("/reply", require("./routes/reply"));
app.use("/cart", require("./routes/cart"));
app.use("/order", require("./routes/order"));
app.use("/OrderDetail", require("./routes/OrderDetail"));
app.use("/ProductManagement", require("./routes/ProductManagement"));
app.use("/OrderManagement", require("./routes/OrderManagement"));
app.use("/AccountAdmin", require("./routes/AccountAdmin"));
app.use("/AccountGuest", require("./routes/AccountGuest"));

app.use(express.static(__dirname + '/public'));

db.sync()
  .then(function () {
    app.listen(port);
    console.log(`Server is listening port: ${port}`);
  })
  .catch(function (err) {
    console.error(err);
  });
