import React from "react";
import "../App.css";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputBase,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const Display = () => {
  const headings = [
    "Student ID",
    "First Name",
    "Last Name",
    "Email",
    "Address",
    "GPA",
  ];

  const y = [
    {
      id: 123,
      fn: "asd",
      ln: "asc",
      em: "ad",
      ad: "ad",
      gp: "asd",
    },
    {
      id: 123,
      fn: "asd",
      ln: "asc",
      em: "ad",
      ad: "ad",
      gp: "asd",
    },
    {
      id: 123,
      fn: "asd",
      ln: "asc",
      em: "ad",
      ad: "adzsdfagadf agsdfbvadv agadfgva sGVSDFV",
      gp: "asd",
    },
  ];
  const [filter, setFilter] = React.useState("");
  let [student, setStudent] = React.useState([]);
  let [searchId, setSearchId] = React.useState("");
  let [value, setValue] = React.useState("");
  let [records, setRecords] = React.useState(true);
  
  const filterChange = (event) => {
    setFilter(event.target.value);
    // console.log(event.target.value);
    setSearchId(event.target.value);
  };

  const allStudents = () => {
    axios
      .get("http://localhost:5000/db/search/results/allStudents")
      .then((res) => {
        setStudent(res.data.values);
        //   console.log(res.data)
      });
  };

  const search = () => {
    let body = {
      id: searchId,
      value: value,
    };
    axios.post("http://localhost:5000/db/searchByID", body).then((res) => {
      console.log(res.data);
      if (res.data.valid) {
        setStudent(res.data.values);
        console.log(res.data.values.length);
        if (res.data.values.length === 0) {
          setRecords(false);
          console.log("Database is Empty.");
        } else {
          setRecords(true);
        }
      }
    });
  };

  return (
    <div className="p-4">
      <div className="d-flex">
        <div className="d-flex search-bar w-25 m-2">
          <div className="m-1">
            <SearchIcon onClick={search} />
          </div>
          <div className="pl-2">
            <InputBase
              placeholder="Search..."
              className="text-white"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></InputBase>
          </div>
        </div>
        <div className="pl-4">
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={filterChange}>
            {/* <MenuItem value="">None</MenuItem> */}
            <MenuItem value="id">Student ID</MenuItem>
            <MenuItem value="fn">First Name</MenuItem>
            <MenuItem value="ln">Last Name</MenuItem>
          </Select>
        </div>
      </div>

      <TableContainer component={Paper}>
        {records ? (
          <Table>
            <TableHead className="table-heading">
              <TableRow>
                {headings.map((heading) => (
                  <TableCell>{heading}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {student.map((rows) => (
                <TableRow>
                  {Object.entries(rows).map(([key, value]) => (
                    <TableCell>{value}</TableCell>
                  ))}
                </TableRow>
              ))}

              <TableRow>
                {headings.map((heading) => (
                  <TableCell>{heading}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headings.map((heading) => (
                  <TableCell>{heading}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headings.map((heading) => (
                  <TableCell>{heading}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headings.map((heading) => (
                  <TableCell>{heading}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headings.map((heading) => (
                  <TableCell>{heading}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <p>No records Found</p>
        )}
      </TableContainer>
      <div>
        <Button onClick={allStudents}>Load</Button>
        {/* {console.log(student)} */}
      </div>
    </div>
  );
};
export default Display;
