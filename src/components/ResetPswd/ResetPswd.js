import { useNavigate, useParams } from "react-router-dom";

import React from "react";
import Spinner from "react-spinner-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const ResetPswd = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id, token } = params;
  const url = `https://akgec-late-entry-backend.onrender.com/setNewPassword/${id}/${token}`;
  //   console.log(url);
  const [pswd, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [loader, setLoader] = useState(false);

  const setNewPassword = async (pass) => {
    const res = await axios.post(url, { password: pass }).catch((err) => {
      toast.error("Can't Reset Password !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setPswd("");
      setConfirmPswd("");
      setLoader(false);
    });
    if (res) {
      toast.error("Password Changed Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setPswd("");
      setConfirmPswd("");
      setLoader(false);
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pswd !== confirmPswd) {
      toast.error("Passwords do not match !", {
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
    setNewPassword(pswd);
  };
  return (
    <div
      className="text-center"
      style={{ margin: "auto", marginTop: "8%", border: "2px solid gray" }}
    >
      <h6 style={{ color: "#00bfa5" }}>
        <i className="fa fa-unlock fa-4x"></i>
      </h6>
      <h5 className="text-center">Set Password!!</h5>
      <p>Enter your new password.</p>
      <div className="panel-body">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <input
                id="newpswd"
                placeholder="New Password"
                className="form-control"
                type="password"
                onChange={(e) => setPswd(e.target.value)}
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
                onChange={(e) => setConfirmPswd(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            {!loader && (
              <button className="btn btn-lg btn-primary" type="submit">
                Confirm
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
  );
};

export default ResetPswd;
