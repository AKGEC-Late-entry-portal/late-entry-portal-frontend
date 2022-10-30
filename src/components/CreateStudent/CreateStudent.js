import "./CreateStudent.css";

import Dialog from "@material-ui/core/Dialog";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Spinner from "react-spinner-material";
import UploadStudentData from "../UploadStudentData/UploadStudentData";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openUploadStudentData, setOpenUploadStudentData] = useState(false);
  const [student, setStudent] = useState({
    stdNo: "",
    name: "",
    branch: "",
    mobile: "",
    email: "",
    year: "",
    img: "",
  });
  const [isEmpty, setIsEmpty] = useState({
    stdNo: false,
    name: false,
    branch: true,
    mobile: false,
    email: false,
    year: true,
    img: false,
  });
  const [isInvalid, setIsInvalid] = useState({
    stdNo: false,
    name: false,
    branch: false,
    mobile: false,
    email: false,
    year: false,
    img: false,
  });

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const resetForm = () => {
    setStudent({
      ...student,
      stdNo: "",
      name: "",
      branch: "",
      mobile: "",
      email: "",
      year: "",
      img: "",
    });
    setIsEmpty({
      ...isEmpty,
      stdNo: false,
      name: false,
      branch: true,
      mobile: false,
      email: false,
      year: true,
      img: false,
    });
    setIsInvalid({
      ...isInvalid,
      stdNo: false,
      name: false,
      branch: false,
      mobile: false,
      email: false,
      year: false,
      img: false,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(Object.values(isEmpty).every((value) => value === false));
    console.log(Object.values(isInvalid).every((value) => value === false));
    if (
      Object.values(isEmpty).every((value) => value === false) &&
      Object.values(isInvalid).every((value) => value === false)
    ) {
      setLoading(true);
      console.log(student);
      const createData = async (student) => {
        const res = await axios
          .post(
            "https://akgec-late-entry.herokuapp.com/api/admin/student/create",
            student,
            {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            }
          )
          .catch((err) => {
            setLoading(false);
            if (err.status === 403) {
              toast.error(`Unauthorized User`, {
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
              toast.error(`STUDENT ALREADY EXIST!`, {
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
          toast.success(`Student Added Succesfully!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          resetForm();
          setLoading(false);
        }
      };
      createData(student);
    } else {
      console.log(isEmpty);
      console.log(isInvalid);
      toast.error(`One or more form fields are invalid!`, {
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

  const handleClose = () => {
    setOpenUploadStudentData(false);
  };

  const successfulUpdateHandler = (res) => {
    if (res) setOpenUploadStudentData(false);
  };

  return (
    <div>
      <Dialog
        open={openUploadStudentData}
        onClose={handleClose}
        fullWidth={true}
      >
        <UploadStudentData onUploadStudentData={successfulUpdateHandler} />
      </Dialog>
      <div style={{ paddingTop: "8%" }}>
        <div className="logincard1">
          <div
            style={{
              backgroundColor: "#6586C9",
              position: "relative",
              top: "-35px",
              paddingTop: "2.4%",
              paddingBottom: "1.5%",
              zIndex: "1",
              height: "15%",
              marginLeft: "32px",
              marginRight: "32px",
              marginTop: "-45px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                color: "white",
                float: "left",
                fontSize: "xx-large",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                marginLeft: "4%",
              }}
            >
              Create Student
            </div>
            <div
              style={{
                position: "absolute",
                right: "0",
                height: "63px",
                verticalAlign: "middle",
                top: "0px",
                paddingTop: "12.5px",
              }}
            >
              <div className="container">
                <button
                  id="uploadbtn"
                  className="mat-stroked-button"
                  style={{
                    backgroundColor: "#6586C9",
                    color: "white",
                    padding: " 7px",
                    fontWeight: "bold",
                    border: "1.5px solid white",
                    borderRadius: "6px",
                    marginTop: "5.5%",
                  }}
                  onClick={() => setOpenUploadStudentData(true)}
                >
                  Upload File &nbsp;
                  <i
                    className="fa fa-upload"
                    style={{ color: "white", marginTop: "4px" }}
                  ></i>
                </button>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: "25px !important" }}>
            <form className="loginform" onSubmit={submitHandler}>
              <div
                style={{
                  marginTop: "5% !important",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <table
                  className="create__table1"
                  style={{ marginTop: "5% !important" }}
                >
                  <tbody>
                    <tr>
                      <td className="create__td">
                        <label>Name:</label>
                      </td>
                      <td className="create__td" style={{ width: "100px" }}>
                        <FormControl variant="standard" sx={{ minWidth: 180 }}>
                          <Input
                            id="component-helper"
                            value={student.name}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                name: e.target.value === "" ? true : false,
                              });
                              setStudent({ ...student, name: e.target.value });
                            }}
                            aria-describedby="component-helper-text"
                          />
                          {isEmpty.name && (
                            <FormHelperText id="component-helper-text">
                              Name is Required!
                            </FormHelperText>
                          )}
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td className="create__td">
                        <label>Mobile No:</label>
                      </td>
                      <td className="create__td">
                        <FormControl variant="standard" sx={{ minWidth: 180 }}>
                          <Input
                            id="component-helper"
                            value={student.mobile}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                mobile: e.target.value === "" ? true : false,
                              });
                              setIsInvalid({
                                ...isInvalid,
                                mobile: !isValidMobile(e.target.value),
                              });
                              setStudent({
                                ...student,
                                mobile: e.target.value,
                              });
                            }}
                            aria-describedby="component-helper-text"
                          />
                          {isEmpty.mobile && (
                            <FormHelperText id="component-helper-text">
                              Mobile Number is Required!
                            </FormHelperText>
                          )}
                          {!isEmpty.mobile && isInvalid.mobile && (
                            <FormHelperText id="component-helper-text">
                              Invalid Mobile Number!
                            </FormHelperText>
                          )}
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td className="create__td">
                        <label>Email:</label>
                      </td>
                      <td className="create__td">
                        <FormControl variant="standard" sx={{ minWidth: 180 }}>
                          <Input
                            id="component-helper"
                            value={student.email}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                email: e.target.value === "" ? true : false,
                              });
                              setIsInvalid({
                                ...isInvalid,
                                email: !isValidEmail(e.target.value),
                              });
                              setStudent({ ...student, email: e.target.value });
                            }}
                            aria-describedby="component-helper-text"
                          />
                          {isEmpty.email && (
                            <FormHelperText id="component-helper-text">
                              Email is Required!
                            </FormHelperText>
                          )}
                          {!isEmpty.email && isInvalid.email && (
                            <FormHelperText id="component-helper-text">
                              Invalid Email Address!
                            </FormHelperText>
                          )}
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td className="create__td">
                        <label>Branch</label>
                      </td>
                      <td className="create__td">
                        <FormControl sx={{ minWidth: 180 }} variant="standard">
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={student.branch}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                branch: e.target.value === "" ? true : false,
                              });
                              setStudent({
                                ...student,
                                branch: e.target.value,
                              });
                            }}
                          >
                            <MenuItem value={"CSE"}>
                              Computer Science & Engineering
                            </MenuItem>
                            <MenuItem value={"CS"}>Computer Science</MenuItem>
                            <MenuItem value={"CS/IT"}>
                              Computer Science & Information Technology
                            </MenuItem>
                            <MenuItem value={"IT"}>
                              Information Technology
                            </MenuItem>
                            <MenuItem value={"ECE"}>
                              Electronics And Communication
                            </MenuItem>
                            <MenuItem value={"EN"}>
                              Electrical And Electronics
                            </MenuItem>
                            <MenuItem value={"EI"}>
                              Electronics & Instrumentation
                            </MenuItem>
                            <MenuItem value={"ME"}>Mechanical</MenuItem>
                            <MenuItem value={"CE"}>Civil</MenuItem>
                            <MenuItem value={"MCA"}>MCA</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td className="create__td">
                        <label>Year:</label>
                      </td>
                      <td className="create__td">
                        <FormControl sx={{ minWidth: 180 }} variant="standard">
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={student.year}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                year: e.target.value === "" ? true : false,
                              });
                              setStudent({
                                ...student,
                                year: e.target.value,
                              });
                            }}
                          >
                            <MenuItem value={"1"}>First</MenuItem>
                            <MenuItem value={"2"}>Second</MenuItem>
                            <MenuItem value={"3"}>Third</MenuItem>
                            <MenuItem value={"4"}>Fourth</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td className="create__td">
                        <label>Student No:</label>
                      </td>
                      <td className="create__td">
                        <FormControl variant="standard" sx={{ minWidth: 180 }}>
                          <Input
                            id="component-helper"
                            value={student.stdNo}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                stdNo: e.target.value === "" ? true : false,
                              });
                              setStudent({ ...student, stdNo: e.target.value });
                            }}
                            aria-describedby="component-helper-text"
                          />
                          {isEmpty.stdNo && (
                            <FormHelperText id="component-helper-text">
                              Student Number is Required!
                            </FormHelperText>
                          )}
                        </FormControl>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                {!loading && (
                  <button
                    type="submit"
                    className="reg__btn"
                    disabled={
                      !(
                        Object.values(isEmpty).every(
                          (value) => value === false
                        ) &&
                        Object.values(isInvalid).every(
                          (value) => value === false
                        )
                      )
                    }
                  >
                    Add
                  </button>
                )}
                {loading && (
                  <button
                    type="submit"
                    className="reg__btn"
                    style={{
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
