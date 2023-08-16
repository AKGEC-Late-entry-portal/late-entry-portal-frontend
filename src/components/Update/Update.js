import "./Update.css";

import { useEffect, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import ForgotPswd from "../ForgotPswd/ForgotPswd";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Spinner from "react-spinner-material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Update = (props) => {
  const navigate = useNavigate();
  const [isPswd, setIsPswd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cond, setCond] = useState("");
  const [disable, setDisable] = useState(false);
  const [disable2, setDisable2] = useState(true);
  const [data, setData] = useState({
    name: "",
    userName: "",
    mobile: "",
    email: "",
    dept: "",
    privilege: "",
  });
  const [updatePass, setUpdatePass] = useState({
    oldPassword: "",
    mobile: null,
    newPassword: "",
    confirmPassword: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const updateData = async (_id, data) => {
      const res = await axios
        .put(
          "https://akgec-late-entry-backend.onrender.com/api/admin/user/update/" +
            _id,
          data,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .catch((err) => {
          props.onSuccessfulUpdate(false);
          setLoading(false);
          setCond("updating");
          toast.error(
            `Error ${cond} User! Check Your Connection and Try Again!`,
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
          if (err.status === 404) {
            toast.error("Unauthorized User", {
              position: "bottom-right",
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
          } else {
            toast.error("Error Updating User", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
      if (res) {
        setLoading(false);
        props.onSuccessfulUpdate(true);
        toast.success("User Updated Successfully!!", {
          position: "bottom-right",
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
    updateData(props._id, data);
  };

  const fetchUser = async (id) => {
    const res = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/user/read/" +
          id,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        if (err.status === 404) {
          toast.error("Unauthorized User", {
            position: "bottom-right",
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
        } else {
          toast.error("Unable to access user information!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        setLoading(false);
        setCond("loading");
        toast.error(
          `Error ${cond} User! Check Your Connection and Try Again!`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
    if (res) {
      setLoading(false);
      setData(res.data.result);
    }
  };

  useEffect(() => {
    setIsPswd(false);
    fetchUser(props._id);
  }, []);

  const changePswd = () => {
    setIsPswd((isPswd) => !isPswd);
  };

  const forgotPswd = () => {
    props.onForgotPswd(true);
  };

  const submitHandler2 = (e) => {
    e.preventDefault();
    setLoading(true);
    if (updatePass.newPassword === updatePass.confirmPassword) {
      const updatePassword = async (_id, data) => {
        const res = await axios
          .put(
            "https://akgec-late-entry-backend.onrender.com/api/admin/user/password/" +
              _id,
            data,
            {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            }
          )
          .catch((err) => {
            if (err.response.status === 404) {
              toast.error("Unauthorized User", {
                position: "bottom-right",
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
            } else if (err.response.status === 404) {
              toast.error("User Not Found!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            } else if (err.response.status === 409) {
              toast.error("Old password did not match!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            } else {
              toast.error("Can't reset your password!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
            setLoading(false);
          });
        if (res) {
          toast.success("Password Changed Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
          props.onSuccessfulUpdate(true);
        }
      };
      updatePassword(props._id, updatePass);
    } else {
      toast.warn("New Password and Re-enter New Password must be same.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      {!isPswd && (
        <div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#63B967",
              color: "white",
              borderRadius: "5px",
              height: "68px",
              margin: "2% 2.5%",
              padding: "1.5%",
            }}
          >
            {loading && (
              <Spinner
                radius={30}
                color={"#FFFFFF"}
                stroke={3}
                visible={true}
                style={{ marginLeft: "2%" }}
              />
            )}

            <h5
              style={{
                marginLeft: "1%",
                marginTop: "1%",
                fontFamily: "Poppins, sans-serif",
                padding: "0 0.5%",
              }}
            >
              Modify User
            </h5>
          </div>

          <form
            className="loginform"
            onSubmit={submitHandler}
            style={{ top: "57%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <table>
                <tbody>
                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>Name:</label>
                    </td>
                    <td style={{ width: "100px" }}>
                      <div>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          sx={{
                            width: 175,
                          }}
                          value={data.name}
                          onChange={(e) => {
                            setData({ ...data, name: e.target.value });
                          }}
                          required
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>Mobile No:</label>
                    </td>
                    <td>
                      <div>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          sx={{
                            width: 175,
                          }}
                          value={data.mobile}
                          onChange={(e) => {
                            setDisable(
                              !(e.target.value.toString().length === 10)
                            );
                            setData({ ...data, mobile: e.target.value });
                          }}
                          required
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>Email:</label>
                    </td>
                    <td>
                      <div>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          sx={{
                            width: 175,
                          }}
                          value={data.email}
                          onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                          }}
                          required
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>Role:</label>
                    </td>
                    <td>
                      <div>
                        <FormControl variant="standard" sx={{ minWidth: 175 }}>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={(e) => {
                              setData({ ...data, privilege: e.target.value });
                            }}
                            value={data.privilege}
                            required
                          >
                            <MenuItem value={1}>Administrator</MenuItem>
                            <MenuItem value={2}>Co-ordinator</MenuItem>
                            <MenuItem value={3}>Volunteer</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>Department:</label>
                    </td>
                    <td>
                      <div>
                        <FormControl variant="standard" sx={{ minWidth: 175 }}>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            onChange={(e) => {
                              setData({ ...data, dept: e.target.value });
                            }}
                            value={data.dept}
                            required
                          >
                            <MenuItem value={"AS"}>Applied Science</MenuItem>
                            <MenuItem value={"CSE"}>Computer Science</MenuItem>
                            <MenuItem value={"IT"}>
                              Information Technology
                            </MenuItem>
                            <MenuItem value={"ECE"}>
                              Electronics and Communication
                            </MenuItem>
                            <MenuItem value={"EEE"}>
                              Electrical and Electronics
                            </MenuItem>
                            <MenuItem value={"ME"}>Mechanical</MenuItem>
                            <MenuItem value={"CE"}>Civil</MenuItem>
                            <MenuItem value={"MCA"}>MCA</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="2"
                      style={{
                        justifyContent: "center",
                        justifyItems: "center",
                        alignItems: "center",
                        paddingLeft: "15%",
                      }}
                    >
                      <button id="btn1" type="submit" disabled={disable}>
                        Update
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="2"
                      style={{ textAlign: "center", padding: "0" }}
                    >
                      <a
                        className="text-primary"
                        style={{
                          cursor: "pointer",
                          fontFamily: "Poppins, sans-serif",
                        }}
                        onClick={changePswd}
                      >
                        Change/ Forgot Password
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      )}

      {isPswd && (
        <div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#63B967",
              color: "white",
              borderRadius: "5px",
              height: "68px",
              margin: "2% 2.5%",
              padding: "1.5%",
            }}
          >
            <h5
              style={{
                marginLeft: "1%",
                marginTop: "1%",
                fontFamily: "Poppins, sans-serif",
                padding: "0 0.5%",
              }}
            >
              Change
            </h5>
            <h5
              style={{
                marginTop: "1%",
                fontFamily: "Poppins, sans-serif",
                padding: "0 0.3%",
              }}
            >
              Password
            </h5>
            <button id="btn3" onClick={changePswd}>
              <i className="fas fa-arrow-circle-left"></i>
            </button>
          </div>
          <form
            className="loginform"
            onSubmit={submitHandler2}
            style={{ top: "57%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <table>
                <tbody>
                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>Old Password:</label>
                    </td>
                    <td>
                      <div>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          sx={{
                            width: 175,
                          }}
                          required
                          onChange={(e) =>
                            setUpdatePass({
                              ...updatePass,
                              oldPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>Mobile No:</label>
                    </td>
                    <td>
                      <div>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          sx={{
                            width: 175,
                          }}
                          onChange={(e) => {
                            setDisable2(
                              !(e.target.value.toString().length === 10)
                            );
                            setUpdatePass({
                              ...updatePass,
                              mobile: e.target.value,
                            });
                          }}
                          required
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>New Password:</label>
                    </td>
                    <td>
                      <div>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          sx={{
                            width: 175,
                          }}
                          onChange={(e) =>
                            setUpdatePass({
                              ...updatePass,
                              newPassword: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "15px" }}>
                      <label>Re-Enter New Password:</label>
                    </td>
                    <td>
                      <div>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          sx={{
                            width: 175,
                          }}
                          onChange={(e) =>
                            setUpdatePass({
                              ...updatePass,
                              confirmPassword: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan="2"
                      style={{
                        justifyContent: "center",
                        justifyItems: "center",
                        alignItems: "center",
                        paddingLeft: "19%",
                      }}
                    >
                      {!loading && (
                        <button type="submit" id="btn2" disabled={disable2}>
                          Change Password
                        </button>
                      )}
                      {loading && (
                        <button
                          type="btn"
                          id="btn2"
                          style={{
                            paddingLeft: "29%",
                            paddingTop: "9px",
                            paddingBottom: "9px",
                          }}
                        >
                          <Spinner
                            radius={30}
                            color={"#FFFFFF"}
                            stroke={3}
                            visible={true}
                            style={{ marginLeft: "2%" }}
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      <a
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={forgotPswd}
                      >
                        Forgot Password
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Update;
