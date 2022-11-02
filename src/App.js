import "./App.css";

import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import CreateEntry from "./components/CreateEntry/CreateEntry";
import CreateStudent from "./components/CreateStudent/CreateStudent";
import CreateUser from "./components/CreateUser/CreateUser";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import ManageEntry from "./components/ManageEntry/ManageEntry";
import ManageUser from "./components/ManageUser/ManageUser";
import { ToastContainer } from "react-toastify";
import ManageStudent from "./components/ManageStudent/ManageStudent";
import DailyReport from "./components/DailyReport/DailyReport";
import FullReport from "./components/FullReport/FullReport";
import MainNav from "./components/MainNav/MainNav";
import { useState } from "react";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="" element={<Login />} />
          </Route>
          <Route element={<WithNav />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/dash" element={<Dashboard />} />
            <Route path="dashboard/manage-users" element={<ManageUser />} />
            <Route path="dashboard/create-users" element={<CreateUser />} />
            <Route path="dashboard/student" element={<CreateStudent />} />
            <Route path="dashboard/create-entry" element={<CreateEntry />} />
            <Route path="dashboard/manage-entry" element={<ManageEntry />} />
            <Route
              path="dashboard/manage-student"
              element={<ManageStudent />}
            />
            <Route path="dashboard/daily-report" element={<DailyReport />} />
            <Route path="dashboard/report" element={<FullReport />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
