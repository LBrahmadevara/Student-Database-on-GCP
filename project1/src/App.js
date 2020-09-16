import React from "react";
import "./App.css";
import AddStudent from "./pages/addStudent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Display from "./pages/display";

function App() {
  return (
    <div className="">
      <Router>
        <div className='header'>
          <div className='d-flex justify-content-around w-50 pt-2'>
          <div className='pr-4'>
            <Link to="/add" className='text-white'>Add a new Student</Link>
          </div>
          <div>
            <Link to="/search" className='text-white'>Search</Link>
          </div>
          </div>
        </div>
        <Switch>
          <Route path="/add" component={AddStudent} />
          <Route path="/search" component={Display} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
