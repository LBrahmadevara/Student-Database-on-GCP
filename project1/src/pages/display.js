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
    }
    if (changed) {
      changedRows = student.map(row => (changed[row.sId] ? { ...row, ...changed[row.sId] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = student.filter(row => !deletedSet.has(row.sId));
    }
    setStudent(changedRows);
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
