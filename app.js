var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");

app.use("/public", express.static(path.join(__dirname, "/public")));

app.use((request, response, next) => {
  response.locals.moment = require("moment");
  response.locals.padding = require("./lib/math.js").padding;  
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", require("./routes/index.js"));
app.use("/search", require("./routes/search.js"));
app.use("/shop", require("./routes/shop.js"));
app.use("/account", require("./routes/account.js"));

app.listen(3000);