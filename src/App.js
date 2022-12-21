import "./App.css";

import { Route, Routes } from "react-router";

import CreateEntry from "./components/CreateEntry/CreateEntry";
import CreateStudent from "./components/CreateStudent/CreateStudent";
import CreateUser from "./components/CreateUser/CreateUser";
import DailyReport from "./components/DailyReport/DailyReport";
import Dashboard from "./components/Dashboard/Dashboard";
import FullReport from "./components/FullReport/FullReport";
import Login from "./components/Login/Login";
import MainNav from "./components/MainNav/MainNav";
import ManageEntry from "./components/ManageEntry/ManageEntry";
import ManageStudent from "./components/ManageStudent/ManageStudent";
import ManageUser from "./components/ManageUser/ManageUser";
import ResetPswd from "./components/ResetPswd/ResetPswd";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";
import { useState } from "react";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="" element={<Login />} />
            <Route path="setNewPassword/:id/:token" element={<ResetPswd />} />
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
