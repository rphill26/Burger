var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

// Import routes and give the server access to them.
var burgersController = require("./controllers/burgers_controller.js");
// Import the model (burger.js) to use its database functions.
var burger = require("./models/burger.js");

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(methodOverride("X-HTTP-Method-Override"));

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

app.use("/api/burgers", burgersController);

app.listen(port);
