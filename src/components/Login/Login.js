import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";

import AKGEC_logo from "../../assets/AKGEC_1_0.png";
import Api from "../../Api";
import Dialog from "@material-ui/core/Dialog";
import ForgotPswd from "../ForgotPswd/ForgotPswd";
import Spinner from "react-spinner-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);

  const userNameChangeHandler = (e) => setUserName(e.target.value);
  const passwordChangeHandler = (e) => setPassword(e.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName === "" || password === "") {
      toast.warn("Please fill all fields first!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setLoader(true);
    try {
      await axios.post(Api.login, { userName, password }).then(function (res) {
        if (res.data.privilege === 1) {
          toast.success("Login Successful!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          localStorage.setItem("token", res.data.token);
          setLoader(false);
          navigate("/dashboard/dash");
        } else {
          toast.error("Only admins are allowed!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          localStorage.removeItem("token");
          localStorage.removeItem("results");
          navigate("/");
          setLoader(false);
        }
      });
    } catch (e) {
      setLoader(false);
      toast.error("Invalid Login Credentials!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("token")) {
        setLoader(true);
        try {
          await axios
            .get(Api.dash, {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            })
            .then(function (data) {
              navigate("/dashboard/dash");
              setLoader(false);
            });
        } catch (err) {
          if (err.response.status === 404) {
            console.log("invalid-token");
            localStorage.removeItem("token");
            localStorage.removeItem("results");
            navigate("/");
          }
          setLoader(false);
        }
      }
    }
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  });

  return (
    <div className="back">
      <div className="log-body">
        <Dialog open={open} onClose={handleClose}>
          <ForgotPswd />
        </Dialog>
        <form className="login-form" onSubmit={handleSubmit}>
          <img className="logo" src={AKGEC_logo} alt="" />

          <h4 className="head">AKGEC LATE ENTRY SYSTEM</h4>
          <div className="box">
            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                value={userName}
                onChange={userNameChangeHandler}
                placeholder="Username"
                id="userName"
              />
              <label htmlFor="userName" className="form__label">
                Username
              </label>
            </div>
            <div className="form__group field" style={{ marginBottom: "10px" }}>
              <input
                type="password"
                className="form__field"
                value={password}
                onChange={passwordChangeHandler}
                onCut={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                placeholder="Password"
                id="password"
              />
              <label htmlFor="password" className="form__label">
                Password
              </label>
            </div>
            <a className="text-primary" onClick={handleClickOpen}>
              <small style={{ cursor: "pointer" }}>
                Forgot Password? Click Here!
              </small>
            </a>
          </div>

          {!loader && (
            <button className="logbtn" type="submit">
              Submit
            </button>
          )}
          {loader && (
            <button className="logbtn spin" onClick={handleSubmit}>
              <Spinner
                radius={30}
                color={"#FFFFFF"}
                stroke={3}
                visible={true}
              />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
