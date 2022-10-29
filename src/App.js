import "./App.css";

import { Route, Routes } from "react-router";

import CreateEntry from "./components/CreateEntry/CreateEntry";
import CreateStudent from "./components/CreateStudent/CreateStudent";
import CreateUser from "./components/CreateUser/CreateUser";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import ManageUser from "./components/ManageUser/ManageUser";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="" element={<Login />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/dash" element={<Dashboard />} />
        <Route path="dashboard/manage-users" element={<ManageUser />} />
        <Route path="dashboard/create-users" element={<CreateUser />} />
        <Route path="dashboard/student" element={<CreateStudent />} />
        <Route path="dashboard/create-entry" element={<CreateEntry />} />
      </Routes>
    </>
  );
}

export default App;
