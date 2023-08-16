import "./CreateEntry.css";

import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Spinner from "react-spinner-material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import stdImg from "../../assets/student.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateEntry = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentExist, setStudentExist] = useState(false);
  const [enter, setEnter] = useState(false);
  const [createStd, setCreateStd] = useState({
    stdNo: "",
    location: "",
  });
  const [student, setStudent] = useState({
    name: "",
    stdNo: "",
    year: "",
    branch: "",
    lateCount: "",
    fineCount: "",
    img: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchStudent = async (stdNo) => {
      const res = await axios
        .get(
          "https://akgec-late-entry-backend.onrender.com/api/admin/student/read?stdNo=" +
            stdNo,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 404) {
            toast.error("Unauthorized User", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.removeItem("token");
            localStorage.removeItem("results");
            navigate("/");
            document.getElementById("outlined-required").focus();
          } else {
            toast.error("Student Not Found!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            document.getElementById("outlined-required").focus();
          }
        });
      if (res) {
        setEnter(true);
        setStudentExist(true);
        console.log("Form Submitted");
        const obj = res.data.result;
        setStudent({
          ...student,
          name: obj.name,
          stdNo: obj.stdNo,
          year: obj.year,
          branch: obj.branch,
          lateCount: obj.lateCount,
          fineCount: obj.fineCount,
          img: obj.img,
        });
        setLoading(false);
        document.getElementById("confirmbtn").focus();
      }
    };
    fetchStudent(createStd.stdNo);
  };

  const confirmEntryHandler = () => {
    setLoading(true);
    const enterStudent = async (data) => {
      const res = await axios
        .post(
          "https://akgec-late-entry-backend.onrender.com/api/admin/entry/create",
          data,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .catch((err) => {
          setLoading(false);
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
            setStudentExist(false);
            setCreateStd({ ...createStd, stdNo: "" });
            document.getElementById("outlined-required").focus();
          } else {
            toast.error("Error Adding Entry! Try Again!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setStudentExist(false);
            setCreateStd({ ...createStd, stdNo: "" });
            document.getElementById("outlined-required").focus();
          }
        });
      if (res) {
        console.log("Form Submitted");
        setLoading(false);
        toast.success("Entry Added Successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setStudentExist(false);
        setCreateStd({ ...createStd, stdNo: "" });
        document.getElementById("outlined-required").focus();
        setStudent({
          ...student,
          name: "",
          stdNo: "",
          year: "",
          branch: "",
          lateCount: "",
          fineCount: "",
          img: "",
        });
        setEnter(false);
      }
    };
    enterStudent(createStd);
  };

  const resetHandler = () => {
    setCreateStd({ ...createStd, stdNo: "" });
    setLoading(false);
    setStudentExist(false);
    setEnter(false);
    setStudent({
      ...student,
      name: "",
      stdNo: "",
      year: "",
      branch: "",
      lateCount: "",
      fineCount: "",
      img: "",
    });
    document.getElementById("outlined-required").focus();
  };

  return (
    <div className="components">
      <div className="row" style={{ margin: "0" }}>
        <div className="col-sm-8">
          <div style={{ paddingLeft: "2.5%", paddingTop: "2.5%" }}>
            <div className="ce__card ce__card-profile">
              <div
                className="ce__card-header ce__card-header-image"
                style={{ height: "14vh" }}
              >
                <h1
                  className="ce__card-title"
                  style={{
                    fontSize: "xx-large",
                    paddingTop: "1%",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "500",
                    marginTop: "0",
                    marginLeft: "4%",
                  }}
                >
                  New Entry
                </h1>
                <div
                  className="field1"
                  style={{
                    float: "right",
                    marginRight: "5%",
                    marginTop: "-0.8%",
                  }}
                >
                  <FormControl required sx={{ m: 1, minWidth: 175 }}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      style={{ color: "white" }}
                    >
                      Location
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required"
                      value={createStd.location}
                      label="Location *"
                      onChange={(e) =>
                        setCreateStd({ ...createStd, location: e.target.value })
                      }
                      style={{
                        border: "1.9px solid white",
                        color: "white",
                        height: "8vh",
                      }}
                    >
                      <MenuItem value={"LT"}>Lecture Theatre</MenuItem>
                      <MenuItem value={"MG"}>Main Gate</MenuItem>
                      <MenuItem value={"CS/IT"}>CS/IT</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div
                className="ce__card-body"
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  height: "450px",
                  paddingTop: "88px",
                }}
              >
                <h1
                  style={{
                    fontSize: "xx-large",
                    fontFamily: "Poppins, sans-serif",
                    marginBottom: "15px",
                  }}
                >
                  Enter Manually
                </h1>
                <form onSubmit={submitHandler}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Student Number"
                    value={createStd.stdNo}
                    onChange={(e) =>
                      setCreateStd({ ...createStd, stdNo: e.target.value })
                    }
                  />
                  {!loading && (
                    <button
                      type="submit"
                      className="ce__logbtn"
                      style={{
                        marginTop: "3.5%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      disabled={
                        !(createStd.stdNo !== "" && createStd.location !== "")
                      }
                    >
                      Add Entry
                    </button>
                  )}
                  {loading && (
                    <button
                      type="submit"
                      className="ce__logbtn"
                      style={{
                        marginTop: "3.5%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
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
          </div>
        </div>
        <div className="col-sm-4">
          <div style={{ paddingRight: "5%", paddingTop: "2.5%" }}>
            <div
              className="ce__card ce__card-profile"
              style={{ marginTop: "38%" }}
            >
              <div className="ce__card-img-top">
                {!enter && (
                  <img
                    src={stdImg}
                    className="ce__card__image"
                    style={{ opacity: "0.5", backgroundColor: "#FFCA4F" }}
                    alt=""
                  />
                )}
                {enter && (
                  <img
                    src={student.img}
                    alt="User_Image"
                    className="ce__card__image"
                  />
                )}
              </div>
              <div
                className="ce__card-body"
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  height: "416px",
                }}
              >
                <h5> {student.name} </h5>
                <table
                  className="table-responsive"
                  style={{ marginTop: "30px" }}
                >
                  <tbody>
                    <tr
                      style={{
                        textAlign: "left",
                        fontSize: "18px",
                        lineHeight: "38px",
                        fontWeight: "400",
                        overflowWrap: "initial",
                      }}
                    >
                      <td className="text-primary">
                        Student No <span style={{ float: "right" }}>:</span>
                      </td>
                      <td style={{ paddingLeft: "10%" }}> {student.stdNo} </td>
                    </tr>
                    <tr
                      style={{
                        textAlign: "left",
                        fontSize: "18px",
                        lineHeight: "38px",
                        fontWeight: "400",
                        overflowWrap: "initial",
                      }}
                    >
                      <td className="text-primary">
                        Year <span style={{ float: "right" }}>:</span>
                      </td>
                      <td style={{ paddingLeft: "10%" }}>{student.year}</td>
                    </tr>
                    <tr
                      style={{
                        textAlign: "left",
                        fontSize: "18px",
                        lineHeight: "38px",
                        fontWeight: "400",
                        overflowWrap: "initial",
                      }}
                    >
                      <td className="text-primary">
                        Branch <span style={{ float: "right" }}>:</span>
                      </td>
                      <td style={{ paddingLeft: "10%" }}>{student.branch}</td>
                    </tr>
                    <tr
                      style={{
                        textAlign: "left",
                        fontSize: "18px",
                        lineHeight: "38px",
                        fontWeight: "400",
                        overflowWrap: "initial",
                      }}
                    >
                      <td className="text-primary">
                        Late Count <span style={{ float: "right" }}>:</span>
                      </td>
                      <td style={{ paddingLeft: "10%" }}>
                        {student.lateCount}
                      </td>
                    </tr>
                    <tr
                      style={{
                        textAlign: "left",
                        fontSize: "18px",
                        lineHeight: "38px",
                        fontWeight: "400",
                        overflowWrap: "initial",
                      }}
                    >
                      <td className="text-primary">
                        Fine Count <span style={{ float: "right" }}>:</span>
                      </td>
                      <td style={{ paddingLeft: "10%" }}>
                        {student.fineCount}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  className="row"
                  style={{
                    paddingTop: "0",
                    marginLeft: "5%",
                  }}
                >
                  <div className="col-sm-4">
                    <button
                      type="submit"
                      className="ce__logbtn"
                      style={{
                        marginTop: "3.5%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        fontSize: "13px",
                      }}
                      id="confirmbtn"
                      onClick={confirmEntryHandler}
                      disabled={
                        !(createStd.stdNo !== "" && createStd.location !== "")
                      }
                    >
                      Confirm
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button
                      type="button"
                      className="ce__logbtn"
                      style={{
                        marginTop: "3.5%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        fontSize: "13px",
                      }}
                      disabled={
                        !(createStd.stdNo !== "" && createStd.location !== "")
                      }
                      onClick={resetHandler}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEntry;
