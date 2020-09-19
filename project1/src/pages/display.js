import React from "react";
import "../App.css";
import axios from "axios";
import { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  FilteringState,
  
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  TableHeaderRow,
  TableColumnResizing,
  PagingPanel,
  TableFilterRow
} from "@devexpress/dx-react-grid-material-ui";

const Display = () => {
  const headings = [
    { name: "sId", title: "Student ID" },
    { name: "first_name", title: "First Name" },
    { name: "last_name", title: "Last Name" },
    { name: "email", title: "Email" },
    { name: "address", title: "Address" },
    { name: "GPA", title: "GPA" },
  ];
  let [student, setStudent] = React.useState([]);
  let [render, setRender] = React.useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/db/search/results/allStudents")
      .then((res) => {
        setStudent(res.data.values);
        //   console.log(res.data)
      });
  }, [render]);

  const [columnWidths, setColumnWidths] = React.useState([
    { columnName: "sId", width: 130 },
    { columnName: "first_name", width: 180 },
    { columnName: "last_name", width: 180 },
    { columnName: "email", width: 230 },
    { columnName: "address", width: 320 },
    { columnName: "GPA", width: 60 },
  ]);

  return (
    // <div className="paper-border">
    <Paper className="m-4 border">
      <Grid rows={student} columns={headings}>
        <PagingState defaultCurrentPage={0} pageSize={10} />
        <IntegratedPaging />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />
        <TableColumnResizing columnWidths={columnWidths} onColumnWidthsChange={setColumnWidths} />
        <TableHeaderRow />
        <Toolbar />
        <TableFilterRow />
        <PagingPanel />
      </Grid>
    </Paper>
    // </div>
  );
};
export default Display;
