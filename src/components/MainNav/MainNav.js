import "./MainNav.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BRL_Image from "../../assets/Group 1.png";

const MainNav = () => {
  const navigate = useNavigate();
  const [isDisplay, setIsDisplay] = useState(true);
  const [isDisplay1, setIsDisplay1] = useState(true);
  const [isDisplay2, setIsDisplay2] = useState(true);
  const [isDisplay3, setIsDisplay3] = useState(true);

  const display = () => {
    setIsDisplay(!isDisplay);
    if (isDisplay1 === false) setIsDisplay1(!isDisplay1);
    if (isDisplay2 === false) setIsDisplay2(!isDisplay2);
    if (isDisplay3 === false) setIsDisplay3(!isDisplay3);
  };

  const display1 = () => {
    setIsDisplay1(!isDisplay1);
    if (isDisplay === false) setIsDisplay(!isDisplay);
    if (isDisplay2 === false) setIsDisplay2(!isDisplay2);
    if (isDisplay3 === false) setIsDisplay3(!isDisplay3);
  };

  const display2 = () => {
    setIsDisplay2(!isDisplay2);
    if (isDisplay1 === false) setIsDisplay1(!isDisplay1);
    if (isDisplay === false) setIsDisplay(!isDisplay);
    if (isDisplay3 === false) setIsDisplay3(!isDisplay3);
  };

  const display3 = () => {
    setIsDisplay3(!isDisplay3);
    if (isDisplay1 === false) setIsDisplay1(!isDisplay1);
    if (isDisplay2 === false) setIsDisplay2(!isDisplay2);
    if (isDisplay === false) setIsDisplay(!isDisplay);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("results");
    navigate("/");
  };
  return (
    <div className="mainNav">
      <div
        style={{
          color: "#455098",
          fontSize: "xx-large",
          paddingLeft: "45px",
          paddingTop: "10px",
          fontFamily: "Poppins, sans-serif",
          margin: "7% 0",
          fontWeight: "500",
        }}
      >
        WELCOME
      </div>
      <hr
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.171)",
          width: "90%",
          margin: "1em",
        }}
      />
      <div
        className="mn__left"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "8%",
        }}
      >
        <Link to="dashboard/dash">
          <Button
            className="mn__btn"
            variant="contained"
            style={{
              width: "210px",
              marginBottom: "4%",
              height: "48px",
              display: "flex",
              alignItems: "center",
              borderRadius: "50px",
              fontSize: "17px",
              backgroundImage: "linear-gradient(#63a1e2, #6883e6, #6f6ee9)",
            }}
          >
            <div className="icon_plus_name">
              <i
                className="fa fa-bars"
                style={{
                  float: "left",
                  marginTop: "5.37px",
                  position: "absolute",
                  left: "8%",
                }}
              ></i>
              Dashboard
            </div>
          </Button>
        </Link>
        <Button
          className="mn__btn"
          onClick={display}
          variant="contained"
          style={{
            width: "210px",
            marginBottom: "4%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            fontSize: "17px",
            backgroundImage: "linear-gradient(#63a1e2, #6883e6, #6f6ee9)",
          }}
        >
          <div className="icon_plus_name">
            <i
              className="fa fa-users"
              style={{
                float: "left",
                marginTop: "5.37px",
                position: "absolute",
                left: "8%",
              }}
            ></i>
            Users
            <i
              className="fa fa-caret-down"
              style={{
                float: "right",
                marginTop: "5.37px",
                position: "absolute",
                right: "9%",
              }}
            ></i>
          </div>
        </Button>
        <Link to="dashboard/create-users">
          <button id="mn__b2" hidden={isDisplay}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <i
                className="fa fa-user"
                style={{ position: "relative", right: "46px", bottom: "17%" }}
              ></i>
              Create
            </div>
          </button>
        </Link>
        <Link to="dashboard/manage-users">
          <button id="mn__b2" hidden={isDisplay}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <i
                className="fas fa-user-edit"
                style={{ position: "relative", right: "35px", bottom: "17%" }}
              ></i>
              Manage
            </div>
          </button>
        </Link>

        <Button
          className="mn__btn"
          onClick={display1}
          variant="contained"
          style={{
            width: "210px",
            marginBottom: "4%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            fontSize: "17px",
            backgroundImage: "linear-gradient(#63a1e2, #6883e6, #6f6ee9)",
          }}
        >
          <div className="icon_plus_name">
            <i
              className="fa fa-user-graduate"
              style={{
                float: "left",
                marginTop: "5.37px",
                position: "absolute",
                left: "8%",
              }}
            ></i>
            Students
            <i
              className="fa fa-caret-down"
              style={{
                float: "right",
                marginTop: "5.37px",
                position: "absolute",
                right: "9%",
              }}
            ></i>
          </div>
        </Button>
        <Link to="dashboard/student">
          <button id="mn__b2" hidden={isDisplay1}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <i
                className="fas fa-user"
                style={{ position: "relative", right: "46px", bottom: "17%" }}
              ></i>
              Create
            </div>
          </button>
        </Link>
        <Link to="dashboard/manage-student">
          <button id="mn__b2" hidden={isDisplay1}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <i
                className="fa fa-user-edit"
                style={{ position: "relative", right: "35px", bottom: "17%" }}
              ></i>
              Manage
            </div>
          </button>
        </Link>

        <Button
          className="mn__btn"
          onClick={display2}
          variant="contained"
          style={{
            width: "210px",
            marginBottom: "4%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            fontSize: "17px",
            backgroundImage: "linear-gradient(#63a1e2, #6883e6, #6f6ee9)",
          }}
        >
          <div className="icon_plus_name">
            <i
              className="fas fa-user-plus"
              style={{
                float: "left",
                marginTop: "5.37px",
                position: "absolute",
                left: "8%",
              }}
            ></i>
            Entry
            <i
              className="fa fa-caret-down"
              style={{
                float: "right",
                marginTop: "5.37px",
                position: "absolute",
                right: "9%",
              }}
            ></i>
          </div>
        </Button>
        <Link to="dashboard/create-entry">
          <button id="mn__b2" hidden={isDisplay2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <i
                className="fa fa-plus-circle"
                style={{ position: "relative", right: "46px", bottom: "17%" }}
              ></i>
              Create
            </div>
          </button>
        </Link>
        <Link to="dashboard/manage-entry">
          <button id="mn__b2" hidden={isDisplay2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <i
                className="fas fa-edit"
                style={{ position: "relative", right: "35px", bottom: "17%" }}
              ></i>
              Manage
            </div>
          </button>
        </Link>
        <Button
          className="mn__btn"
          onClick={display3}
          variant="contained"
          style={{
            width: "210px",
            marginBottom: "4%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            fontSize: "17px",
            backgroundImage: "linear-gradient(#63a1e2, #6883e6, #6f6ee9)",
          }}
        >
          <div className="icon_plus_name">
            <i
              className="fa fa-book"
              style={{
                float: "left",
                marginTop: "5.37px",
                position: "absolute",
                left: "8%",
              }}
            ></i>
            Report
            <i
              className="fa fa-caret-down"
              style={{
                float: "right",
                marginTop: "5.37px",
                position: "absolute",
                right: "9%",
              }}
            ></i>
          </div>
        </Button>
        <Link to="dashboard/daily-report">
          <button id="mn__b2" hidden={isDisplay3}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <i
                className="fas fa-th-list"
                style={{ position: "relative", right: "46px", bottom: "17%" }}
              ></i>
              Daily
            </div>
          </button>
        </Link>
        <Link to="dashboard/report">
          <button id="mn__b2" hidden={isDisplay3}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <i
                className="fas fa-file-alt"
                style={{ position: "relative", right: "46px", bottom: "17%" }}
              ></i>
              Final
            </div>
          </button>
        </Link>
        <Button
          className="mn__btn"
          onClick={logoutHandler}
          variant="contained"
          style={{
            width: "210px",
            marginBottom: "4%",
            height: "48px",
            display: "flex",
            alignItems: "center",
            borderRadius: "50px",
            fontSize: "17px",
            backgroundImage: "linear-gradient(#63a1e2, #6883e6, #6f6ee9)",
          }}
        >
          <div className="icon_plus_name">
            <i
              className="fa fa-sign-out"
              style={{
                float: "left",
                marginTop: "5.37px",
                position: "absolute",
                left: "8%",
              }}
            ></i>
            Logout
          </div>
        </Button>
      </div>
      <div
        style={{
          width: "200px",
          marginLeft: "25px",
          position: "fixed",
          bottom: "2%",
        }}
      >
        <small
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "block",
          }}
        >
          Powered By
        </small>
        <img
          src={BRL_Image}
          style={{ width: "180px", display: "block", alignItems: "center" }}
          alt=""
        />
      </div>
    </div>
  );
};

export default MainNav;
