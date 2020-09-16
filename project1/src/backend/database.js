const express = require("express");
const mysql = require("mysql");
const app = express();
const axios = require("axios");
const port = 5000;

app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Login@12345",
  database: "StudentDB",
});

con.connect(function (err) {
  if (err) throw err;

  app.get("/db/search/results/allStudents", (req, res) => {
    let mysqlQuery = "select * from StudentDB";
    con.query(mysqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send({ values: result });
      }
    });
  });

  app.post("/db/add/newStudent", (req, res) => {
    const { fn, ln, em, addr, gpa } = req.body;
    let x = "insert into StudentDB (First Name, Last Name, Email, Address, GPA) values ('as','aa','aa','aa','3');"
    // let mysqlQuery = `insert into StudentDB.StudentDB (First Name, Last Name, Email, Address, GPA) values ('${fn}','${ln}','${em}','${addr}','${gpa}');`;
    con.query(x, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send({ valid: true });
      }
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
