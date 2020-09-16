import React from "react";
import { TextField, Button, Paper } from "@material-ui/core";
import "../App.css";
import axios from "axios";

const AddStudent = () => {
  var [fn, setFn] = React.useState("");
  var [ln, setLn] = React.useState("");
  var [em, setEm] = React.useState("");
  var [stn, setStn] = React.useState("");
  var [city, setCity] = React.useState("");
  var [zip, setZip] = React.useState("");
  var [gpa, setGpa] = React.useState("");

  const handleSubmit = () => {
    const space = ', '
    var addr = stn+space+city+space+zip;
    const body = {
      fn: fn,
      ln: ln,
      em: em,
      addr: addr,
      gpa: gpa,
    };
    console.log(body);
    axios.post("/db/add/newStudent", body)
    .then(res => console.log(res.data));
  };

  return (
    <div>
      <Paper className="m-3">
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
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={em}
                onChange={(e) => setEm(e.target.value)}
              ></TextField>
            </div>
            <div className="d-flex width-text">
              <TextField
                id="stn"
                label="Street Name"
                variant="outlined"
                value={stn}
                onChange={(e) => setStn(e.target.value)}
              ></TextField>
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
                  id="zip"
                  label="Zipcode"
                  variant="outlined"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                ></TextField>
              </div>
            </div>
            <div className="d-flex">
              <TextField
                id="gpa"
                label="GPA"
                variant="outlined"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
              ></TextField>
            </div>
            <div className="d-flex mt-3 mb-3">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
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
