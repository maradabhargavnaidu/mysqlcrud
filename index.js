const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const routes = require("./Routes/route");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

//Parsing middleware application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
//Parse application/json
// app.use(bodyParser.json());

//Static Files
// app.use(express.static("public"));

// RenderingHello all
app.get("/:id", (req, res) => {
  pool.query(
    "SELECT * FROM myfirsttable WHERE sno=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
        res.send(rows);
      }
    }
  );
});

// Template Engine
app.engine("hbs", exhbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// CONNECTION POOL
const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Hosting
app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
  pool.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });
});
