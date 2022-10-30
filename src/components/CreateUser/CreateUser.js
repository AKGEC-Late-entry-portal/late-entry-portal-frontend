import "./CreateUser.css";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Spinner from "react-spinner-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    privilege: "",
    password: "",
    dept: "",
  });
  const [isEmpty, setIsEmpty] = useState({
    name: false,
    mobile: false,
    email: false,
    privilege: true,
    password: false,
    dept: true,
  });
  const [isInvalid, setIsInvalid] = useState({
    name: false,
    mobile: false,
    email: false,
    privilege: false,
    password: false,
    dept: false,
  });

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidMobile = (mobile) => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const resetForm = () => {
    setUser({
      ...user,
      name: "",
      mobile: "",
      email: "",
      privilege: "",
      password: "",
      dept: "",
    });
    setIsEmpty({
      ...isEmpty,
      name: false,
      mobile: false,
      email: false,
      privilege: true,
      password: false,
      dept: true,
    });
    setIsInvalid({
      ...isInvalid,
      name: false,
      mobile: false,
      email: false,
      privilege: false,
      password: false,
      dept: false,
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
      console.log(user);
      const createData = async (user) => {
        const res = await axios
          .post(
            "https://akgec-late-entry.herokuapp.com/api/admin/user/create",
            user,
            {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            }
          )
          .catch((err) => {
            toast.error(`User Already Exists!!`, {
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
          });
        if (res) {
          console.log("Form Submitted");
          toast.success(`Hi ${user.name} ! You Are Successfully Registered!`, {
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
      createData(user);
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

  return (
    <div>
      <div style={{ paddingTop: "6%" }}>
        <div className="logincard2">
          <div
            style={{
              backgroundColor: "#ffab00",
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
              Create User
            </div>
          </div>
          <div style={{ paddingTop: "25px" }}>
            <form className="loginform" onSubmit={submitHandler}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <table
                  className="create__table"
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
                            value={user.name}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                name: e.target.value === "" ? true : false,
                              });
                              setUser({ ...user, name: e.target.value });
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
                            value={user.mobile}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                mobile: e.target.value === "" ? true : false,
                              });
                              setIsInvalid({
                                ...isInvalid,
                                mobile: !isValidMobile(e.target.value),
                              });
                              setUser({
                                ...user,
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
                            value={user.email}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                email: e.target.value === "" ? true : false,
                              });
                              setIsInvalid({
                                ...isInvalid,
                                email: !isValidEmail(e.target.value),
                              });
                              setUser({ ...user, email: e.target.value });
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
                        <label>Role</label>
                      </td>
                      <td className="create__td">
                        <FormControl sx={{ minWidth: 180 }} variant="standard">
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={user.privilege}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                privilege: e.target.value === "" ? true : false,
                              });
                              setUser({ ...user, privilege: e.target.value });
                            }}
                          >
                            <MenuItem value={"1"}>Administrator</MenuItem>
                            <MenuItem value={"2"}>Co-ordinator</MenuItem>
                            <MenuItem value={"3"}>Volunteer</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td className="create__td">
                        <label>Password:</label>
                      </td>
                      <td className="create__td">
                        <FormControl variant="standard" sx={{ minWidth: 180 }}>
                          <Input
                            id="component-helper"
                            value={user.password}
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                password: e.target.value === "" ? true : false,
                              });
                              setUser({ ...user, password: e.target.value });
                            }}
                            aria-describedby="component-helper-text"
                          />
                          {isEmpty.password && (
                            <FormHelperText id="component-helper-text">
                              Password is Required!
                            </FormHelperText>
                          )}
                        </FormControl>
                      </td>
                    </tr>
                    <tr>
                      <td className="create__td">
                        <label>Department:</label>
                      </td>
                      <td className="create__td">
                        <FormControl sx={{ minWidth: 180 }} variant="standard">
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            onChange={(e) => {
                              setIsEmpty({
                                ...isEmpty,
                                dept: e.target.value === "" ? true : false,
                              });
                              setUser({ ...user, dept: e.target.value });
                            }}
                            value={user.dept}
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                {!loading && (
                  <button
                    type="submit"
                    className="reg__btn1"
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
                    Register
                  </button>
                )}
                {loading && (
                  <button
                    type="submit"
                    className="reg__btn1"
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

export default CreateUser;
