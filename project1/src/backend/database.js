const express = require("express");
const mysql = require("mysql");
const app = express();
const axios = require("axios");
const port = 5000;

app.use(express.json());

var con = mysql.createConnection({
  host: "35.222.94.186",
  user: "root",
  password: "root",
  database: "student_database",
});

con.connect(function (err) {
  if (err) throw err;

  app.get("/db/search/results/allStudents", (req, res) => {
    let mysqlQuery = "select * from students";
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
    let x = "insert into students (first_name, last_name, email, address, GPA) values ('as','aa','aa','aa','3');"
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
