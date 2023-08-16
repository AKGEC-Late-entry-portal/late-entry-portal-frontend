import "./UpdateStudent.css";

import { FormControl, Input, MenuItem, Select } from "@mui/material";

import Spinner from "react-spinner-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UpdateStudent = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({
    id: "",
    name: "",
    mobile: "",
    email: "",
    branch: "",
    year: "",
    stdNo: "",
    lateCount: "",
    fineCount: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const updateData = async (data) => {
      console.log(data);
      const res = await axios
        .patch(
          "https://akgec-late-entry-backend.onrender.com/api/admin/student/update",
          data,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .catch((err) => {
          props.onSuccessfulUpdate(false);
          setLoading(false);
          toast.error(
            `Error updating Student! Check Your Connection and Try Again!`,
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
          } else {
            toast.error("Error Updating Student", {
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
        toast.success("Student Updated Successfully!!", {
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
    updateData(data);
  };

  const fetchStudent = async (id) => {
    const res = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/student/read/" +
          id,
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
        } else {
          toast.error("Unable to access student information!", {
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
        toast.error(
          `Error loading Student! Check Your Connection and Try Again!`,
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
      const x = res.data.result;
      console.log(x);
      setData({
        id: x._id,
        name: x.name,
        mobile: x.mobile,
        email: x.email,
        branch: x.branch,
        year: x.year,
        stdNo: x.stdNo,
        lateCount: x.lateCount,
        fineCount: x.fineCount,
      });
    }
  };

  useEffect(() => {
    fetchStudent(props._id);
  }, []);

  return (
    <div style={{ padding: "0", margin: "0" }}>
      <div
        style={{
          backgroundColor: "#ff783d",
          color: "white",
          borderRadius: "5px",
          height: "65px",
          paddingTop: "23px",
        }}
      >
        <div style={{ display: "flex", marginLeft: "2px" }}>
          {loading && (
            <Spinner radius={30} color={"#FFFFFF"} stroke={3} visible={true} />
          )}
          <h5
            style={{
              marginLeft: "2%",
              fontFamily: "Poppins, sans-serif",
              marginTop: "0",
            }}
          >
            Update Students
          </h5>
        </div>
      </div>
      <form
        className="login-form"
        style={{ background: "white", height: "71%" }}
        onSubmit={submitHandler}
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
                <td>
                  <label>Name:</label>
                </td>
                <td style={{ width: "100px" }}>
                  <div>
                    <FormControl variant="standard" sx={{ minWidth: 200 }}>
                      <Input
                        id="component-helper"
                        value={data.name}
                        onChange={(e) => {
                          setData({ ...data, name: e.target.value });
                        }}
                        required
                      />
                    </FormControl>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Mobile No:</label>
                </td>
                <td>
                  <div>
                    <FormControl variant="standard" sx={{ minWidth: 200 }}>
                      <Input
                        id="component-helper"
                        value={data.mobile}
                        onChange={(e) => {
                          setDisable(
                            !(e.target.value.toString().length === 10)
                          );
                          setData({ ...data, mobile: e.target.value });
                        }}
                        required
                      />
                    </FormControl>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Email:</label>
                </td>
                <td>
                  <div>
                    <FormControl variant="standard" sx={{ minWidth: 200 }}>
                      <Input
                        id="component-helper"
                        value={data.email}
                        onChange={(e) => {
                          setData({ ...data, email: e.target.value });
                        }}
                        required
                      />
                    </FormControl>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Branch:</label>
                </td>
                <td>
                  <div>
                    <FormControl
                      sx={{ minWidth: 200, maxWidth: 200 }}
                      variant="standard"
                    >
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => {
                          setData({ ...data, branch: e.target.value });
                        }}
                        value={data.branch}
                        required
                      >
                        <MenuItem value={"CSE"}>
                          Computer Science and Engineering
                        </MenuItem>
                        <MenuItem value={"CSE(AIML)"}>
                          Computer Science and Engineering - AIML
                        </MenuItem>
                        <MenuItem value={"CSE(DS)"}>
                          Computer Science and Engineering - DS
                        </MenuItem>
                        <MenuItem value={"CSIT"}>
                          Computer Science and Information Technology
                        </MenuItem>
                        <MenuItem value={"CS"}>Computer Science</MenuItem>
                        <MenuItem value={"IT"}>Information Technology</MenuItem>
                        <MenuItem value={"AIML"}>
                          Artificial Intelligence Machine Learning
                        </MenuItem>
                        <MenuItem value={"ECE"}>
                          Electronics And Communication
                        </MenuItem>
                        <MenuItem value={"EN"}>
                          Electrical And Electronics
                        </MenuItem>
                        <MenuItem value={"EI"}>
                          Electronics and Instrumentation
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
                <td>
                  <label>Year</label>
                </td>
                <td>
                  <div>
                    <FormControl sx={{ minWidth: 200 }} variant="standard">
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => {
                          setData({ ...data, year: e.target.value });
                        }}
                        value={data.year}
                        required
                      >
                        <MenuItem value={"1"}>First</MenuItem>
                        <MenuItem value={"2"}>Second</MenuItem>
                        <MenuItem value={"3"}>Third</MenuItem>
                        <MenuItem value={"4"}>Fourth</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Student No:</label>
                </td>
                <td>
                  <div>
                    <FormControl variant="standard" sx={{ minWidth: 200 }}>
                      <Input
                        id="component-helper"
                        onChange={(e) => {
                          setData({ ...data, stdNo: e.target.value });
                        }}
                        value={data.stdNo}
                        required
                      />
                    </FormControl>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Late Count:</label>
                </td>
                <td>
                  <div>
                    <FormControl variant="standard" sx={{ minWidth: 200 }}>
                      <Input
                        id="component-helper"
                        onChange={(e) => {
                          setData({ ...data, lateCount: e.target.value });
                        }}
                        value={data.lateCount}
                        required
                      />
                    </FormControl>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Fine Count:</label>
                </td>
                <td>
                  <div>
                    <FormControl variant="standard" sx={{ minWidth: 200 }}>
                      <Input
                        id="component-helper"
                        onChange={(e) => {
                          setData({ ...data, fineCount: e.target.value });
                        }}
                        value={data.fineCount}
                        required
                      />
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
                  <button
                    id="us__btn1"
                    type="submit"
                    style={{ height: "47px", marginTop: "10%" }}
                    disabled={disable}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;
