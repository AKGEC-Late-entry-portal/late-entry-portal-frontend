import React from "react";
import MainNav from "./components/MainNav/MainNav";
import { Outlet } from "react-router";

const WithNav = () => {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
};

export default WithNav;
