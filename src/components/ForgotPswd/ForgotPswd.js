import "./ForgotPswd.css";

import OtpInput from "react-otp-input";
import Spinner from "react-spinner-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const ForgotPswd = () => {
  const [x, setX] = useState(true);
  // const [y, setY] = useState(false);
  // const [z, setZ] = useState(false);
  const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const emailChangeHandler = (e) => setEmail(e.target.value);

  const sendMail = async (email) => {
    const res = await axios
      .post("https://akgec-late-entry-backend.onrender.com/forgotPassword", {
        email: email,
      })
      .catch((err) => {
        console.log(err);
        toast.error("Can't send Email !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoader(false);
      });
    if (res) {
      toast.error("Email sent successfully, Check your Inbox !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoader(false);
      setEmail("");
      setX(!x);
      // setY(!y);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.warn("Please fill the email address", {
        position: "top-center",
        autoClose: 3000,
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
    sendMail(email);
  };
  // const handleVerify = (e) => {
  //   e.preventDefault();
  //   setY(!y);
  //   setZ(!z);
  // };

  return (
    <div className="panel-body">
      {x && (
        <div className="text-center">
          <h6 style={{ color: "#F35D5E" }}>
            <i className="fa fa-lock fa-4x"></i>
          </h6>
          <h5 className="text-center">Forgot Password?</h5>
          <p>You can reset your password here.</p>
          <div className="panel-body">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-envelope color-blue"></i>
                  </span>

                  <input
                    id="emailInput"
                    placeholder="email address"
                    className="form-control"
                    onChange={emailChangeHandler}
                    type="email"
                    value={email}
                  />
                </div>
              </div>
              <div className="form-group">
                {!loader && (
                  <button className="btn btn-lg btn-primary" type="submit">
                    Send Email
                  </button>
                )}
                {loader && (
                  <button className="btn btn-lg btn-primary">
                    <Spinner
                      radius={30}
                      color={"#FFFFFF"}
                      stroke={3}
                      visible={true}
                    />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {/* {y && (
        <div className="text-center">
          <h6 style={{ color: "#007BFF" }}>
            <i className="fas fa-key fa-4x"></i>
          </h6>
          <h5 className="text-center">Verification!!</h5>
          <p>Enter OTP</p>
          <div className="panel-body">
            <form className="form" onSubmit={handleVerify}>
              <div className="form-group">
                <OtpInput
                  separator={
                    <span>
                      <strong>.</strong>
                    </span>
                  }
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                  }}
                  numInputs={4}
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    margin: "0 1rem",
                    fontSize: "2rem",
                    borderRadius: 4,
                    border: "1px solid rgba(0,0,0,0.3)",
                  }}
                  isInputNum
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-lg btn-primary"
                  value="Send My Password"
                  type="submit"
                >
                  Submit OTP
                </button>
              </div>
              <a
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  sendMail(email);
                }}
              >
                Resend OTP
              </a>
            </form>
          </div>
        </div>
      )} */}
      {/* {z && (
        <div className="text-center">
          <h6 style={{ color: "#00bfa5" }}>
            <i className="fa fa-unlock fa-4x"></i>
          </h6>
          <h5 className="text-center">Set Password!!</h5>
          <p>Enter your new password.</p>
          <div className="panel-body">
            <form className="form">
              <div className="form-group">
                <div className="input-group">
                  <input
                    id="newpswd"
                    placeholder="New Password"
                    className="form-control"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    id="newpswdconfirm"
                    placeholder="Re-Enter Password"
                    className="form-control"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-lg btn-primary" type="submit">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ForgotPswd;
