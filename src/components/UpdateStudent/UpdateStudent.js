import { FormControl, Input, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Spinner from "react-spinner-material";
import "./UpdateStudent.css";

const UpdateStudent = ({ selectedStd, boolArr, editVal }) => {
  console.log(selectedStd, boolArr, editVal);
  const [loading, setLoading] = useState(false);
  const [editArr, setEditArr] = useState(editVal);

  const [createStd, setCreateStd] = useState({
    id: [],
    stdNo: "",
    name: "",
    branch: "",
    mobile: "",
    email: "",
    year: "",
    lateCount: "",
    fineCount: "",
  });
  const [boolObj, setBoolObj] = useState({
    stdno: false,
    name: false,
    branch: false,
    mobile: false,
    email: false,
    year: false,
    lateCount: false,
    fineCount: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!boolObj.name) {
      createStd.name = "";
    }
    if (!boolObj.mobile) {
      createStd.mobile = "";
    }
    if (!boolObj.email) {
      createStd.email = "";
    }
    if (!boolObj.branch) {
      createStd.branch = "";
    }
    if (!boolObj.year) {
      createStd.year = "";
    }
    if (!boolObj.stdNo) {
      createStd.stdNo = "";
    }
    if (!boolObj.lateCount) {
      createStd.lateCount = "";
    }
    if (!boolObj.fineCount) {
      createStd.fineCount = "";
    }
  };

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
              {boolObj.name && (
                <tr>
                  <td>
                    <label>Name:</label>
                  </td>
                  <td style={{ width: "100px" }}>
                    <div>
                      <FormControl variant="standard" sx={{ minWidth: 180 }}>
                        <Input
                          id="component-helper"
                          // value={user.name}
                          // onChange={(e) => {
                          //   setIsEmpty({
                          //     ...isEmpty,
                          //     name: e.target.value === "" ? true : false,
                          //   });
                          //   setUser({ ...user, name: e.target.value });
                          // }}
                          aria-describedby="component-helper-text"
                        />
                      </FormControl>
                    </div>
                  </td>
                </tr>
              )}
              {boolObj.mobile && (
                <tr>
                  <td>
                    <label>Mobile No:</label>
                  </td>
                  <td>
                    <div>
                      <FormControl variant="standard" sx={{ minWidth: 180 }}>
                        <Input
                          id="component-helper"
                          // value={user.name}
                          // onChange={(e) => {
                          //   setIsEmpty({
                          //     ...isEmpty,
                          //     name: e.target.value === "" ? true : false,
                          //   });
                          //   setUser({ ...user, name: e.target.value });
                          // }}
                          aria-describedby="component-helper-text"
                        />
                      </FormControl>
                    </div>
                  </td>
                </tr>
              )}
              {boolObj.email && (
                <tr>
                  <td>
                    <label>Email:</label>
                  </td>
                  <td>
                    <div>
                      <FormControl variant="standard" sx={{ minWidth: 180 }}>
                        <Input
                          id="component-helper"
                          // value={user.name}
                          // onChange={(e) => {
                          //   setIsEmpty({
                          //     ...isEmpty,
                          //     name: e.target.value === "" ? true : false,
                          //   });
                          //   setUser({ ...user, name: e.target.value });
                          // }}
                          aria-describedby="component-helper-text"
                        />
                      </FormControl>
                    </div>
                  </td>
                </tr>
              )}
              {boolObj.branch && (
                <tr>
                  <td>
                    <label>Branch:</label>
                  </td>
                  <td>
                    <div>
                      <FormControl sx={{ minWidth: 180 }} variant="standard">
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          // value={user.privilege}
                          // onChange={(e) => {
                          //   setIsEmpty({
                          //     ...isEmpty,
                          //     privilege: e.target.value === "" ? true : false,
                          //   });
                          //   setUser({ ...user, privilege: e.target.value });
                          // }}
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
                    </div>
                  </td>
                </tr>
              )}
              {boolObj.year && (
                <tr>
                  <td>
                    <label>Year</label>
                  </td>
                  <td>
                    <div>
                      <FormControl sx={{ minWidth: 180 }} variant="standard">
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          // value={user.privilege}
                          // onChange={(e) => {
                          //   setIsEmpty({
                          //     ...isEmpty,
                          //     privilege: e.target.value === "" ? true : false,
                          //   });
                          //   setUser({ ...user, privilege: e.target.value });
                          // }}
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
              )}
              {boolObj.stdNo && (
                <tr>
                  <td>
                    <label>Student No:</label>
                  </td>
                  <td>
                    <div>
                      <FormControl variant="standard" sx={{ minWidth: 180 }}>
                        <Input
                          id="component-helper"
                          // value={user.name}
                          // onChange={(e) => {
                          //   setIsEmpty({
                          //     ...isEmpty,
                          //     name: e.target.value === "" ? true : false,
                          //   });
                          //   setUser({ ...user, name: e.target.value });
                          // }}
                          aria-describedby="component-helper-text"
                        />
                      </FormControl>
                    </div>
                  </td>
                </tr>
              )}
              {boolObj.lateCount && (
                <tr>
                  <td>
                    <label>Late Count:</label>
                  </td>
                  <td>
                    <div>
                      <FormControl variant="standard" sx={{ minWidth: 180 }}>
                        <Input
                          id="component-helper"
                          // value={user.name}
                          // onChange={(e) => {
                          //   setIsEmpty({
                          //     ...isEmpty,
                          //     name: e.target.value === "" ? true : false,
                          //   });
                          //   setUser({ ...user, name: e.target.value });
                          // }}
                          aria-describedby="component-helper-text"
                        />
                      </FormControl>
                    </div>
                  </td>
                </tr>
              )}
              {boolObj.fineCount && (
                <tr>
                  <td>
                    <label>Fine Count:</label>
                  </td>
                  <td>
                    <div>
                      <FormControl variant="standard" sx={{ minWidth: 180 }}>
                        <Input
                          id="component-helper"
                          // value={user.name}
                          // onChange={(e) => {
                          //   setIsEmpty({
                          //     ...isEmpty,
                          //     name: e.target.value === "" ? true : false,
                          //   });
                          //   setUser({ ...user, name: e.target.value });
                          // }}
                          aria-describedby="component-helper-text"
                        />
                      </FormControl>
                    </div>
                  </td>
                </tr>
              )}
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
