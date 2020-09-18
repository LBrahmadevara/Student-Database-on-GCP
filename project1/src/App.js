import React from "react";
import "./App.css";
import AddStudent from "./pages/addStudent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Display from "./pages/display";

function App() {
  return (
    <div className="">
      {/* <AddStudent /> */}
      <Router>
        <div className='header'>
          <div className='d-flex justify-content-around w-50 pt-2'>
          <div className='pr-4'>
            <Link to="/" className='text-white'>Add a new Student</Link>
          </div>
          <div>
            <Link to="/database" className='text-white'>Existing Students</Link>
          </div>
          </div>
        </div>
        <Switch>
          <Route path="/database" component={Display} />
          <Route path="/" component={AddStudent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
