import "./App.css";

import { Route, Routes } from "react-router";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="" element={<Login />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="dashboard/dash" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
