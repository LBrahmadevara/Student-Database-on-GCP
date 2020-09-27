import React from "react";
import { TextField, Button, Paper } from "@material-ui/core";
import "../App.css";
import axios from "axios";

const AddStudent = () => {
  var [fn, setFn] = React.useState("");
  var [ln, setLn] = React.useState("");
  var [em, setEm] = React.useState("");
  var [stn, setStn] = React.useState("");
  var [stn2, setStn2] = React.useState("");
  var [city, setCity] = React.useState("");
  var [state, setState] = React.useState("");
  var [zip, setZip] = React.useState("");
  var [gpa, setGpa] = React.useState("");
  var [msg, setMsg] = React.useState("");
  let [sId, setSId] = React.useState("");

  const handleSubmit = () => {
    var addr;
    const space = ", ";
    if (stn2 === "") {
      addr = stn + space + city + space + state + space + zip;
    } else {
      addr = stn + space + stn2 + space + city + space + state + space + zip;
    }
    const body = {
      fn: fn,
      ln: ln,
      em: em,
      addr: addr,
      gpa: gpa,
    };
    console.log(body);
    axios.post("http://34.67.122.198:5000/db/add/newStudent", body).then((res) => {
      console.log(res.data);
      if (res.data.valid === true) {
        setEm("");
        setStn("");
        setStn2("");
        setZip("");
        setCity("");
        setState("");
        setGpa("");
        setMsg(`${fn} ${ln} is successfully added into the database.`);
        setFn("");
        setLn("");
        setSId(`with Student ID: ${res.data.sId[0].sId}.`);
      }
    });
  };

  return (
    <div>
      <Paper className="m-3 border">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column justify-content-center main-margin">
            <div className="d-flex">
              <div>
                <TextField
                  id="fn"
                  label="First Name"
                  variant="outlined"
                  value={fn}
                  onChange={(e) => setFn(e.target.value)}
                ></TextField>
              </div>
              <div className="pl-3 ml-3">
                <TextField
                  id="ln"
                  label="Last Name"
                  variant="outlined"
                  value={ln}
                  onChange={(e) => setLn(e.target.value)}
                ></TextField>
              </div>
            </div>
            <div className="d-flex mt-3 mb-3 width-text">
              <div>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={em}
                  onChange={(e) => setEm(e.target.value)}
                ></TextField>
              </div>
              <div className="pl-3 ml-3">
                <TextField
                  id="gpa"
                  label="GPA"
                  variant="outlined"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                ></TextField>
              </div>
            </div>
            <div className="mt-3 mb-2">
              <h4>Address:</h4>
            </div>
            <div className="d-flex width-text">
              <div>
                <TextField
                  id="stn"
                  label="Street Name 1"
                  variant="outlined"
                  value={stn}
                  onChange={(e) => setStn(e.target.value)}
                ></TextField>
              </div>
              <div className="pl-3 ml-3">
                <TextField
                  id="stn2"
                  label="Street Name 2"
                  variant="outlined"
                  value={stn2}
                  onChange={(e) => setStn2(e.target.value)}
                ></TextField>
              </div>
            </div>
            <div className="d-flex mt-3 mb-3">
              <div>
                <TextField
                  id="city"
                  label="City"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                ></TextField>
              </div>
              <div className="pl-3 ml-3">
                <TextField
                  id="state"
                  label="State"
                  variant="outlined"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                ></TextField>
              </div>
            </div>
            <div className="d-flex mb-3">
              <TextField
                id="zip"
                label="Zipcode"
                variant="outlined"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              ></TextField>
            </div>
            <div className="d-flex flex-column mt-3 mb-3">
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
              <div className="mt-2">
                <h6>{msg}</h6>
              </div>
              <div className="">
                <h6>{sId}</h6>
              </div>
            </div>
          </div>
          <div className="m-3 pr-3">
            <img
              src="https://images.squarespace-cdn.com/content/v1/55b21c72e4b09b5e3592ea96/1570538839979-GSBKFM9404FHTHY7NXEY/ke17ZwdGBToddI8pDm48kD2iWRQi3s1qWCCeE77O81dZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVE8uJ9rtqqzGvu8dya8varXRTyv_6gBU9_CP-35hVxG6mQ6l2WM7tn7mqHTODzkmeM/SDB-icon.png"
              alt="Image Not Found"
              className="img-thumbnail"
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default AddStudent;
