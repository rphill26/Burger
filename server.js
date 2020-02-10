const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 3307;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "Balebale123*",
  database: "burgers_db"
});

connection.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) throw err;

    res.render("/index", { burgers: data });
  });
});

app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
