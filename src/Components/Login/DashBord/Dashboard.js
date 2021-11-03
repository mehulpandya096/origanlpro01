import React from "react";
import ListData from "./ListData";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.min.css";

export const Dashboard = () => {
  return (
    <div>
      <Nav/>
      <ListData />
    </div>
  );
};

export default Dashboard;
