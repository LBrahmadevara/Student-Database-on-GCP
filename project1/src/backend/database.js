const express = require("express");
const mysql = require("mysql");
const app = express();
const axios = require("axios");
const port = 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

var con = mysql.createConnection({
  // host: "35.222.94.186",
  host: "localhost",
  user: "root",
  password: "Login@12345",
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
        // console.log(result);
        res.send({ values: result });
      }
    });
  });

  app.post("/db/add/newStudent", (req, res) => {
    const { fn, ln, em, addr, gpa } = req.body;
    // let x =
    // "insert into students (first_name, last_name, email, address, GPA) values ('as','aa','aa','aa','3');";
    let mysqlQuery = `insert into students (first_name, last_name, email, address, GPA) values ('${fn}','${ln}','${em}','${addr}','${gpa}');`;
    con.query(mysqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let sqlQuery = `select sId from students order by sId desc limit 1;`;
        con.query(sqlQuery, (err, response) => {
          if (err) {
            console.log(err);
          } else {
            console.log(response);
            res.send({ valid: true, sId: response });
          }
        });
      }
    });
  });

  app.post("/db/searchById", (req, res) => {
    const { id, value } = req.body;
    let sqlQuery = `select * from students where `;
    if (id === "id") {
      sqlQuery = sqlQuery + `sId = '${value}';`;
    } else if (id === "fn") {
      sqlQuery = sqlQuery + `first_name = '${value}';`;
    } else {
      sqlQuery = sqlQuery + `last_name = '${value}';`;
    }
    con.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send({ valid: true, values: result });
      }
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
