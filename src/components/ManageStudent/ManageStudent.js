import "./ManageStudent.css";

import { Button, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import UpdateStudent from "../UpdateStudent/UpdateStudent";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Year = ["-", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"];

const ManageStudent = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nxt, setNxt] = useState(true);
  const [prv, setPrv] = useState(true);
  const [d, setD] = useState(0);
  const [isData, setIsData] = useState(false);
  const [j, setJ] = useState("");
  const [message, setMessage] = useState("");
  const [student, setStudent] = useState("");
  const [studentData, setStudentData] = useState({});
  const [createStd, setCreateStd] = useState({
    year: "",
    branch: "",
  });
  const [isStoring, setIsStoring] = useState(false);
  const [searchedStd, setSearchedStd] = useState("");
  const [searchStd, setSearchStd] = useState({ stdno: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openUpdateAll, setOpenUpdateAll] = useState(false);
  const [update, setUpdate] = useState({
    id: arr,
    branch: createStd.branch,
    year: createStd.year,
  });
  const next = () => {
    setPage((prevPage) => prevPage + 1);
    if (d === 0) return fetchStudents(page + 1);
    else if (d === 1) return func2(page + 1);
  };

  const prev = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    } else {
      toast.warn("Already on First Page !!", {
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
    if (d === 0) return fetchStudents(page - 1);
    else if (d === 1) return func2(page - 1);
  };

  const fetchStudents = async (pg) => {
    setResults([]);
    setLoading(true);
    const response = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/student/filter?page=" +
          pg +
          "&limit=10",
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        setLoading(false);
        setIsData(false);
        if (err.response.status === 403) {
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
          toast.error("No Data Found", {
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
    if (response) {
      setLoading(false);
      setIsData(true);
      if (pg === 1) {
        storeALL();
      }
      const users = response.data.results;
      setResults(users);
      // console.log(users);
      setStudent(users.length);
      if (users.length === 0) {
        toast.error("You have reached the end of the document!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        if (page > 1) {
          prev();
        }
      }
      if (response.data.next == null) {
        setNxt(false);
      } else {
        setNxt(true);
      }
      if (response.data.previous == null) {
        setPrv(false);
      } else {
        setPrv(true);
      }
    }
  };

  const func2 = async (page) => {
    setResults([]);
    setPage(page);
    setD(1);
    setLoading(true);
    var branch = createStd.branch;
    var year = createStd.year;
    if (createStd.branch === null) {
      branch = "";
      setCreateStd({ ...createStd, branch: "" });
    }
    if (createStd.year === null) {
      year = "";
      setCreateStd({ ...createStd, year: "" });
    }
    const res = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/student/filter?page=" +
          page +
          "&limit=10&year=" +
          year +
          "&branch=" +
          branch +
          "&name=" +
          searchedStd,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        setLoading(false);
        setIsData(false);
        if (err.response.status === 403) {
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
          toast.error("No Data Found", {
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
      setIsData(true);
      const users = res.data.results;
      setResults(users);
      setStudent(users.length);
      if (page === 1) {
        storeALL();
      }
      if (users.length === 0) {
        toast.error("You have reached the end of the document!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        if (page > 1) {
          prev();
        }
      }
      if (res.data.next == null) {
        setNxt(false);
      } else {
        setNxt(true);
      }
      if (res.data.previous == null) {
        setPrv(false);
      } else {
        setPrv(true);
      }
    }
  };

  useEffect(() => {
    setResults([]);
    setPage(1);
    setD(0);
    setSearchStd({ stdno: "" });
    setSearchedStd("");
    fetchStudents(page);
  }, []);

  const handleDeleteAll = async () => {
    let len = arr.length;
    if (len === 0) {
      toast.warn("No students to delete!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      // console.log(arr);
      const res = await axios
        .patch(
          "https://akgec-late-entry-backend.onrender.com/api/admin/student/delete",
          arr,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
        .catch((err) => {
          if (err.response.status === 403) {
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
            return;
          } else {
            toast.error("Error Deleting Students! Try Again!", {
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
          if (d === 0) return fetchStudents(page);
          else if (d === 1) return func2(page);
        });
      if (res) {
        toast.success("Delete Action Successful !", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setArr([]);
        setUpdate({
          id: [],
          year: "",
          branch: "",
        });
        setCreateStd({
          year: "",
          branch: "",
        });
        setPage(1);
        if (d === 0) return fetchStudents(1);
        else if (d === 1) return func2(1);
      }
    }
  };

  const reset = () => {
    setArr([]);
    setUpdate({
      id: [],
      year: "",
      branch: "",
    });
    setCreateStd({
      year: "",
      branch: "",
    });
    setD(0);
    setPage(1);
    setSearchedStd("");
    setSearchStd({ ...searchStd, stdno: "" });
    fetchStudents(1);
  };

  const search = async () => {
    // console.log(searchStd);
    if (searchStd.stdno === "" || searchStd.stdno === null) {
      toast.warn("Search field cannot be empty !", {
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
      if (isNaN(searchStd.stdno.substring(0, 1))) {
        setSearchedStd(searchStd.stdno.split(" ").join("_").toLowerCase());
        setPage(1);
        func2(1);
      } else {
        var _res = [];
        setLoading(true);
        const res = await axios
          .get(
            "https://akgec-late-entry-backend.onrender.com/api/admin/student/read?stdNo=" +
              searchStd.stdno,
            {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            }
          )
          .catch((err) => {
            setLoading(false);
            setIsData(false);
            if (err.response.status === 403) {
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
              return;
            } else {
              toast.error("Student Not Found!", {
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
            if (d === 0) return fetchStudents(page);
            else if (d === 1) return func2(page);
          });
        if (res) {
          // console.log(res.data);
          setLoading(false);
          setIsData(true);
          _res[0] = res.data.result;
          setResults(_res);
          if (res.data.next == null) {
            setNxt(false);
          } else {
            setNxt(true);
          }
          if (res.data.previous == null) {
            setPrv(false);
          } else {
            setPrv(true);
          }
        }
      }
    }
  };

  const storeALL = async () => {
    setIsStoring(true);
    var branch = createStd.branch;
    var year = createStd.year;
    if (createStd.branch === null) {
      branch = "";
      setCreateStd({ ...createStd, branch: "" });
    }
    if (createStd.year === null) {
      year = "";
      setCreateStd({ ...createStd, year: "" });
    }
    const res = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/student/filter?page=1&limit=5000&year=" +
          year +
          "&branch=" +
          branch +
          "&name=" +
          searchedStd,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      // console.log(res.data.results);
      localStorage.removeItem("results");
      localStorage.setItem("results", JSON.stringify(res.data.results));
      setIsStoring(false);
    }
  };

  const confirmDialog = (id, a) => {
    if (student === 1) {
      toast.error("Can't Delete All Students!!", {
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
      setJ(id);
      setMessage(`Are you sure you want to delete student ` + a + ` ?`);
      setOpenConfirmDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenConfirmDialog(false);
    setOpenUpdateAll(false);
  };

  const deleteItem = async (_id) => {
    const arr = [];
    arr.push(_id);
    console.log(arr);
    const res = await axios
      .patch(
        "https://akgec-late-entry-backend.onrender.com/api/admin/student/delete",
        arr,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((e) => console.log(e));
    if (res) {
      toast.success("Student deleted successfully", {
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
    setResults(
      results.filter((item) => {
        return item._id !== _id;
      })
    );
  };

  const responseHandler = (remove) => {
    setOpenConfirmDialog(false);
    if (remove) {
      deleteItem(j);
    }
  };

  const openDialogBox = (_id) => {
    setJ(_id);
    setStudentData(results.filter((item) => item._id === _id));
    setOpenDialog(true);
  };

  const successfulUpdateHandler = (res) => {
    if (res) {
      setOpenDialog(false);
      fetchStudents(page);
    }
  };

  const storeIDs = (year, branch) => {
    console.log(year);
    const arr = [];
    if (year === "" && branch === "") {
      toast.warn("Please select Branch / Year to delete", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else {
      const res = JSON.parse(localStorage.getItem("results"));
      if (res === null) {
        return;
      }
      if (year !== "" && branch !== "") {
        for (let i = 0; i < res.length; i++) {
          if (res[i].year === year && res[i].branch === branch) {
            arr.push(res[i]._id);
          }
        }
      } else if (year === "") {
        const res = JSON.parse(localStorage.getItem("results"));
        for (let i = 0; i < res.length; i++) {
          if (res[i].branch === branch) {
            arr.push(res[i]._id);
          }
        }
      } else if (branch === "") {
        const res = JSON.parse(localStorage.getItem("results"));
        for (let i = 0; i < res.length; i++) {
          if (res[i].year === year) {
            arr.push(res[i]._id);
          }
        }
      }
    }
    setArr(arr);
    setUpdate({
      id: arr,
      year: year,
      branch: branch,
    });
  };

  const handleUpdateAll = () => {
    setOpenUpdateAll(true);
  };

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    let len = arr.length;
    if (len === 0) {
      toast.warn("No students to Update!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const updateFunc = async (data) => {
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
            if (err.response.status === 403) {
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
              return;
            } else {
              toast.error("Error Updating Students! Try Again!", {
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
            if (d === 0) return fetchStudents(page);
            else if (d === 1) return func2(page);
          });
        if (res) {
          toast.success("Successfully Updated Year / Branch !", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setArr([]);
          setUpdate({
            id: [],
            year: "",
            branch: "",
          });
          setCreateStd({
            year: "",
            branch: "",
          });
          setPage(1);
          return fetchStudents(1);
        }
      };
      updateFunc(update);
    }
    setOpenUpdateAll(false);
  };

  return (
    <div className="components">
      <Dialog open={openConfirmDialog} onClose={handleClose} fullWidth={true}>
        <ConfirmDialog
          title="Delete Student"
          message={message}
          onResponse={responseHandler}
        />
      </Dialog>
      <Dialog
        fullWidth={true}
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          style: {
            minHeight: "90%",
            maxHeight: "100%",
            overflowX: "hidden",
          },
        }}
      >
        <DialogContent>
          <UpdateStudent
            onSuccessfulUpdate={successfulUpdateHandler}
            _id={j}
            data={studentData}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openUpdateAll} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          Select New Year / Branch
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={submitUpdateHandler}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{ m: 1, minWidth: 200, maxWidth: 200 }}
              variant="standard"
            >
              <InputLabel>New Year: &nbsp;</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={(e) => {
                  setUpdate({ ...update, year: e.target.value });
                }}
                value={update.year}
              >
                <MenuItem value={"1"}>First</MenuItem>
                <MenuItem value={"2"}>Second</MenuItem>
                <MenuItem value={"3"}>Third</MenuItem>
                <MenuItem value={"4"}>Fourth</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1, minWidth: 200, maxWidth: 200 }}
              variant="standard"
            >
              <InputLabel>New Branch: &nbsp;</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={(e) => {
                  setUpdate({ ...update, branch: e.target.value });
                }}
                value={update.branch}
              >
                <MenuItem value={"CSE"}>
                  Computer Science & Engineering
                </MenuItem>
                <MenuItem value={"CS"}>Computer Science</MenuItem>
                <MenuItem value={"CSIT"}>
                  Computer Science & Information Technology
                </MenuItem>
                <MenuItem value={"IT"}>Information Technology</MenuItem>
                <MenuItem value={"ECE"}>Electronics And Communication</MenuItem>
                <MenuItem value={"EN"}>Electrical And Electronics</MenuItem>
                <MenuItem value={"EI"}>Electronics & Instrumentation</MenuItem>
                <MenuItem value={"ME"}>Mechanical</MenuItem>
                <MenuItem value={"CE"}>Civil</MenuItem>
                <MenuItem value={"MCA"}>MCA</MenuItem>
              </Select>
            </FormControl>
            <br />
            <Button
              variant="contained"
              type="submit"
              disabled={update.year === "" && update.branch === ""}
            >
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <div
        style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "4.5%" }}
      >
        <div
          className="ms__card ms__card-profile"
          style={{ minHeight: "100vh" }}
        >
          <div
            className="ms__card-header ms__card-header-image"
            style={{ height: "12vh", position: "relative", top: "-30px" }}
          >
            <h4
              className="ms__card-title"
              style={{
                fontSize: "xx-large",
                paddingTop: "1%",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                position: "absolute",
                bottom: "9%",
                left: "3%",
              }}
            >
              Manage Students
            </h4>
            <div style={{ float: "right" }}>
              <div className="ms__container">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    search();
                  }}
                  style={{ marginRight: " 45px", marginTop: "4%" }}
                >
                  <input
                    id="searchBar"
                    className="searchbar"
                    type="text"
                    placeholder="Search..."
                    value={searchedStd}
                    onChange={(e) => {
                      setSearchedStd(e.target.value);
                      setSearchStd({ ...searchStd, stdno: e.target.value });
                    }}
                  />
                  <button
                    type="submit"
                    id="btnSearch"
                    className="btn-search ms__button"
                    style={{ border: "none", backgroundColor: "#ff783d" }}
                  >
                    <i className="fa fa-search" style={{ color: "white" }}></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="ms__card-body">
            <div className="row" style={{ position: "relative", top: "-29px" }}>
              <div className="col-md-8" id="ms__ta-col">
                <div className="table-responsive" style={{ paddingTop: "2%" }}>
                  <div
                    className="row"
                    style={{ width: "100%", minHeight: "79vh" }}
                  >
                    <table className="table ms__table">
                      <thead className="text-primary">
                        <tr>
                          <th style={{ width: "15%" }} className="ms__th">
                            &nbsp; &nbsp; S.No.
                          </th>
                          <th style={{ width: "28%" }} className="ms__th">
                            Name
                          </th>
                          <th style={{ width: "18%" }} className="ms__th">
                            Student No.
                          </th>
                          <th style={{ width: "13%" }} className="ms__th">
                            Branch
                          </th>
                          <th style={{ width: "13%" }} className="ms__th">
                            Year
                          </th>
                          <th style={{ width: "15%" }} className="ms__th">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr className="ms__tr">
                            <td
                              className="ms__td"
                              colSpan="5"
                              style={{
                                paddingTop: "22%",
                              }}
                            >
                              <div className="ms__lds-ellipsis">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                            </td>
                          </tr>
                        )}
                        {results.map((com, index) => {
                          return (
                            <tr key={com._id}>
                              <td
                                style={{ width: "15%", fontWeight: "bold" }}
                                className="ms__td"
                              >
                                {10 * (page - 1) + index + 1}
                              </td>
                              <td
                                style={{ width: "28%", fontWeight: "bold" }}
                                className="ms__td"
                              >
                                {com.name}
                              </td>
                              <td
                                style={{ width: "18%", fontWeight: "bold" }}
                                className="ms__td"
                              >
                                {com.stdNo}
                              </td>
                              <td
                                style={{ width: "13%", fontWeight: "bold" }}
                                className="ms__td"
                              >
                                {com.branch}
                              </td>
                              <td
                                style={{ width: "13%", fontWeight: "bold" }}
                                className="ms__td"
                              >
                                {Year[com.year]}
                              </td>
                              <td
                                style={{ width: "15%", fontWeight: "bold" }}
                                className="ms__td"
                              >
                                <button
                                  style={{
                                    outlineStyle: "none",
                                    marginTop: "-15%",
                                    width: "30px",
                                    height: "30px",
                                    border: "none",
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "100%",
                                  }}
                                  onClick={() =>
                                    confirmDialog(com._id, com.name)
                                  }
                                >
                                  <i
                                    className="fa fa-trash"
                                    style={{ color: "red" }}
                                  ></i>
                                </button>
                                <button
                                  style={{
                                    outlineStyle: "none",
                                    marginTop: "-15%",
                                    width: "30px",
                                    height: "30px",
                                    border: "none",
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "100%",
                                  }}
                                  onClick={() => openDialogBox(com._id)}
                                >
                                  <i
                                    className="fa fa-edit"
                                    style={{ color: "#0000b3" }}
                                  ></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div style={{ float: "left" }}>
                  <button
                    className="btn mat-flat-button ms__button"
                    type="submit"
                    style={{
                      color: "white",
                      borderColor: "#ff783d",
                      backgroundColor: "#ff783d",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={() => {
                      setPage(1);
                      setSearchedStd("");
                      setUpdate({
                        id: [],
                        branch: "",
                        year: "",
                      });
                      setCreateStd({
                        year: "",
                        branch: "",
                      });
                      setArr([]);
                      fetchStudents(1);
                    }}
                  >
                    Refresh
                  </button>
                </div>
                <nav
                  aria-label="Page navigation example"
                  style={{ float: "right" }}
                >
                  <ul className="pagination">
                    <button
                      className="btn mat-stroked-button ms__button"
                      type="submit"
                      onClick={prev}
                      style={{
                        color: "#ff783d",
                        borderColor: "#ff783d",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      disabled={!prv}
                    >
                      <i className="fas fa-angle-left"></i> Previous
                    </button>
                    &nbsp;
                    {isData && (
                      <li
                        className="mat-stroked-button"
                        style={{
                          color: "#ff783d",
                          borderColor: "#ff783d",
                          fontFamily: "Poppins, sans-serif",
                          border: "1.2px solid",
                          borderRadius: "3px",
                          width: "59px",
                          height: "33px",
                        }}
                      >
                        {page}
                      </li>
                    )}
                    &nbsp;
                    <button
                      className="btn mat-stroked-button ms__button"
                      type="submit"
                      onClick={next}
                      style={{
                        color: "#ff783d",
                        borderColor: "#ff783d",
                        fontFamily: "Poppins, sans-serif",
                      }}
                      disabled={!nxt}
                    >
                      Next <i className="fas fa-angle-right"></i>
                    </button>
                  </ul>
                </nav>
              </div>
              <div className="col-md-3" id="ms__col-sel">
                <h5 style={{ marginBottom: "2px", marginTop: "9px" }}>
                  Filter
                </h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    func2(1);
                    storeIDs(createStd.year, createStd.branch);
                  }}
                >
                  <div
                    className="ms__options"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormControl sx={{ m: 1, minWidth: 130, maxWidth: 130 }}>
                      <InputLabel
                        id="demo-simple-select-required-label"
                        style={{ color: "white" }}
                      >
                        YEAR *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={createStd.year}
                        label="YEAR *"
                        onChange={(e) => {
                          setCreateStd({
                            ...createStd,
                            year: e.target.value,
                          });
                          storeIDs(e.target.value, createStd.branch);
                        }}
                        style={{
                          color: "white",
                          border: "1px solid white",
                        }}
                      >
                        <MenuItem value={1}>I</MenuItem>
                        <MenuItem value={2}>II</MenuItem>
                        <MenuItem value={3}>III</MenuItem>
                        <MenuItem value={4}>IV</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 130, maxWidth: 130 }}>
                      <InputLabel
                        id="demo-simple-select-required-label"
                        style={{ color: "white" }}
                      >
                        BRANCH *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={createStd.branch}
                        label="BRANCH *"
                        onChange={(e) => {
                          setCreateStd({
                            ...createStd,
                            branch: e.target.value,
                          });
                          storeIDs(createStd.year, e.target.value);
                          // console.log(e.target.value);
                        }}
                        style={{
                          color: "white",
                          border: "1px solid white",
                        }}
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
                        <MenuItem value={"CSE(HINDI)"}>
                          Computer Science and Engineering - HINDI
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
                    <button
                      className="btn mat-flat-button ms__button"
                      type="submit"
                    >
                      Apply
                    </button>
                    <button
                      className="btn mat-flat-button ms__button"
                      type="submit"
                      onClick={reset}
                      disabled={d === 0}
                    >
                      Reset Filters
                    </button>
                    <p className="ms__term">
                      *Can apply only year or branch filters.
                    </p>
                  </div>
                </form>
                <h5 className="ms__opt" style={{ margin: "4.5%" }}>
                  Options
                </h5>
                <div className="ms__options">
                  <button
                    className="btn mat-flat-button ms__button"
                    type="submit"
                    onClick={handleUpdateAll}
                    style={{ fontSize: "18px" }}
                    disabled={createStd.branch === "" && createStd.year === ""}
                  >
                    Update all
                  </button>
                  <button
                    className="btn mat-flat-button ms__button"
                    type="submit"
                    onClick={handleDeleteAll}
                    style={{ fontSize: "18px" }}
                    disabled={createStd.branch === "" && createStd.year === ""}
                  >
                    Delete all
                  </button>
                  <p className="ms__term">
                    *Use Update All to Update the filtered students of selected
                    Year / Branch.
                  </p>
                  <p className="ms__term">
                    *Use Delete All to Delete all filtered students of selected
                    Year / Branch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
