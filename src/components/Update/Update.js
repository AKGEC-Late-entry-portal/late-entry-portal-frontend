import "./Update.css";

import { useEffect, useState } from "react";

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
  const [data, setData] = useState({
    name: "",
    userName: "",
    mobile: null,
    email: "",
    dept: "",
    privilege: null,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const updateData = async (_id, data) => {
      const res = await axios
        .put(
          "https://akgec-late-entry.herokuapp.com/api/admin/user/update/" + _id,
          data
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
          if (err.status === 403) {
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
      .get("https://akgec-late-entry.herokuapp.com/api/admin/user/read/" + id)
      .catch((err) => {
        if (err.status === 403) {
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

  const forgotPswd = () => {};

  const submitHandler2 = () => {
    setLoading(true);
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

          <form className="loginform" onSubmit={submitHandler}>
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
                            <MenuItem value={"CS"}>Computer Science</MenuItem>
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
              backgroundColor: "#63B967",
              color: "white",
              borderRadius: "5px",
            }}
          >
            <h2 style={{ marginLeft: "2%" }}>Change Password</h2>
            <button id="btn3" onClick={changePswd}>
              <i className="fas fa-arrow-circle-left"></i>
            </button>
          </div>
          <form className="login-form" onSubmit={submitHandler2}>
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
                        <button type="submit" id="btn2">
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
                          {/* <mat-spinner
                          className="custom-spinner"
                          diameter="30"
                        ></mat-spinner> */}
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
