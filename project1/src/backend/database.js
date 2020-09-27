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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

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
        // console.log(result);
        res.send({ values: result });
      }
    });
  });


app.post("/db/delete/results/allStudents", (req, res) => {
    const { sId } = req.body;
    let sqlQuery = `delete from students where sId="${sId}";`;
    con.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ valid: true });
      }
    });
  });

  app.post("/db/update/results/allStudents", (req, res) => {
    const { sId, x } = req.body;
    let sqlQuery = "update students set ";
    let commaFlag = false;
    Object.entries(x).map(([key, value]) => {
      if (commaFlag) {
        sqlQuery += `,`
      }
      sqlQuery += `${key}="${value}"`
      commaFlag = true;
    })
    sqlQuery += ` where sId="${sId}";`;
    con.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ valid: true });
      }
    });
  });

  app.post("/db/add/newStudent", (req, res) => {
    const { fn, ln, em, addr, gpa } = req.body;
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

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
