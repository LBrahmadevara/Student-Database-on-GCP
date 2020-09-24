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
  EditingState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  TableHeaderRow,
  TableColumnResizing,
  PagingPanel,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";

const getRowId = row => row.sId;

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
    APICall();
    // axios
    //   .get("http://localhost:5000/db/search/results/allStudents")
    //   .then((res) => {
    //     setStudent(res.data.values);
    //     //   console.log(res.data)
    //   });
  }, [render]);

  const APICall = () => {
    axios
      .get("http://localhost:5000/db/search/results/allStudents")
      .then((res) => {
        setStudent(res.data.values);
        //   console.log(res.data)
      });
  }

  const [columnWidths, setColumnWidths] = React.useState([
    { columnName: "sId", width: 130 },
    { columnName: "first_name", width: 180 },
    { columnName: "last_name", width: 180 },
    { columnName: "email", width: 230 },
    { columnName: "address", width: 320 },
    { columnName: "GPA", width: 60 },
  ]);

  const [editingStateColumnExtensions] = React.useState([
    { columnName: 'sId', editingEnabled: false },
  ]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = student.length > 0 ? student[student.length - 1].sId + 1 : 0;
      changedRows = [
        ...student,
        ...added.map((row, index) => ({
          sId: startingAddedId + index,
          ...student,
        })),
      ];
      setStudent(changedRows);
    }
    if (changed) {
      const sId = Object.keys(changed)[0];
      const body = {
        sId: sId,
        x : changed[sId]
      }
      // console.log(body)
      axios.post("http://localhost:5000/db/update/results/allStudents", body)
      .then(res => {
        if(res.data.valid){
          APICall();
        }
      })
    }
    if (deleted) {
      const body = {
        sId: deleted[0]
      }
      axios.post("http://localhost:5000/db/delete/results/allStudents", body)
      .then(res => {
        // console.log(res.data.valid);
        if (res.data.valid){
          APICall();
        }
      })
    }
  };

  return (
    // <div className="paper-border">
    <Paper className="m-4 border">
      <Grid rows={student} columns={headings} getRowId={getRowId}>
      <EditingState
          columnExtensions={editingStateColumnExtensions}
          onCommitChanges={commitChanges}
        />
        <PagingState defaultCurrentPage={0} pageSize={10} />
        <IntegratedPaging />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />
        <TableColumnResizing columnWidths={columnWidths} onColumnWidthsChange={setColumnWidths} />
        <TableHeaderRow />
        <TableEditRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        <Toolbar />
        <TableFilterRow />
        <PagingPanel />
      </Grid>
    </Paper>
    // </div>
  );
};
export default Display;
