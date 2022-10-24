import "./ForgotPswd.css";

import OtpInput from "react-otp-input";
import { useState } from "react";

const ForgotPswd = () => {
  const [x, setX] = useState(true);
  const [y, setY] = useState(false);
  const [z, setZ] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const emailChangeHandler = (e) => setEmail(e.target.value);

  const handleOTP = (e) => {
    e.preventDefault();
    setX(!x);
    setY(!y);
  };
  const handleVerify = (e) => {
    e.preventDefault();
    setY(!y);
    setZ(!z);
  };

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
            <form className="form" onSubmit={handleOTP}>
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
                <button className="btn btn-lg btn-primary" type="submit">
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {y && (
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
              <a className="text-primary" style={{ cursor: "pointer" }}>
                Resend OTP
              </a>
            </form>
          </div>
        </div>
      )}
      {z && (
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
      )}
    </div>
  );
};

export default ForgotPswd;
