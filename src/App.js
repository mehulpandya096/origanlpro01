import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Routing pages Imports
import LoginForm from "./Components/Login/LoginForm";
import Dashboard from "./Components/Login/DashBord/Dashboard";
import { AddUser } from "./Components/Login/DashBord/AddUser";
import { EditUser } from "./Components/Login/DashBord/EditUser";

function App() {
  return (  
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/AddUser" component={AddUser} />
        <Route exact path="/EditUser/:id" component={EditUser} />
      </Switch>
    </Router>
  );  
}

export default App;
