import "./index.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import App from "./App";
import CreateEntry from "./components/CreateEntry/CreateEntry";
import CreateStudent from "./components/CreateStudent/CreateStudent";
import CreateUser from "./components/CreateUser/CreateUser";
import DailyReport from "./components/DailyReport/DailyReport";
import Dashboard from "./components/Dashboard/Dashboard";
import FullReport from "./components/FullReport/FullReport";
import Login from "./components/Login/Login";
import ManageEntry from "./components/ManageEntry/ManageEntry";
import ManageStudent from "./components/ManageStudent/ManageStudent";
import ManageUser from "./components/ManageUser/ManageUser";
import ProtectedRoute from "./util/ProtectedRoute";
import React from "react";
import ReactDOM from "react-dom/client";
import ResetPswd from "./components/ResetPswd/ResetPswd";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="setNewPassword/:id/:token" element={<ResetPswd />} />
        <Route path="/" element={<App />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/dash"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/manage-users"
            element={
              <ProtectedRoute>
                <ManageUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/create-users"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/student"
            element={
              <ProtectedRoute>
                <CreateStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/create-entry"
            element={
              <ProtectedRoute>
                <CreateEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/manage-entry"
            element={
              <ProtectedRoute>
                <ManageEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/manage-student"
            element={
              <ProtectedRoute>
                <ManageStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/daily-report"
            element={
              <ProtectedRoute>
                <DailyReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard/report"
            element={
              <ProtectedRoute>
                <FullReport />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  </>
);
