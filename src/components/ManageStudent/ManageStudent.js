import "./ManageStudent.css";

import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nxt, setNxt] = useState(true);
  const [prv, setPrv] = useState(true);
  const [d, setD] = useState(0);
  const [isData, setIsData] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isStoring, setIsStoring] = useState(false);
  const [check, setCheck] = useState(false);
  const [index, setIndex] = useState("");

  const [selected, setSelected] = useState({
    student: [],
    name: [],
    stdNo: [],
    branch: [],
    year: [],
    mobile: [],
    email: [],
    lateCount: [],
    fineCount: [],
  });
  const [editVal, setEditVal] = useState({
    name: "",
    mobile: "",
    email: "",
    branch: "",
    year: "",
    stdNo: "",
    lateCount: "",
    fineCount: "",
  });
  const [boolArr, setBoolArr] = useState([]);
  const [len, setLen] = useState(null);
  const [createStd, setCreateStd] = useState({
    year: "",
    branch: "",
  });
  const [searchedStd, setSearchedStd] = useState("");
  const [searchStd, setSearchStd] = useState({ stdno: "" });
  const [user_ID, setUser_ID] = useState({
    student: "",
    boolArr: [],
    editVal: {},
  });
  const [openDialog, setOpenDialog] = useState(false);

  const next = () => {
    setPage((prevPage) => prevPage + 1);
    if (check) {
      setCheck(false);
    }
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
    if (check) {
      setCheck(false);
    }
    if (d === 0) return fetchStudents(page - 1);
    else if (d === 1) return func2(page - 1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fetchStudents = async (pg) => {
    setResults([]);
    deselectAll();
    setLoading(true);
    const response = await axios
      .get(
        "http://akgec-late-entry.herokuapp.com/api/admin/student/filter?page=" +
          pg +
          "&limit=10",
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        setLoading(false);
        setIsData(false);
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
      if (check) {
        setCheck(false);
      }
      const users = response.data.results;
      setResults(users);
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
    deselectAll();
    setLoading(true);
    if (createStd.branch === null) {
      setCreateStd({ createStd, branch: "" });
    }
    if (createStd.year === null) {
      setCreateStd({ createStd, year: "" });
    }
    const res = await axios
      .get(
        "http://akgec-late-entry.herokuapp.com/api/admin/student/filter?page=" +
          page +
          "&limit=10&year=" +
          createStd.year +
          "&branch=" +
          createStd.branch +
          "&name=" +
          searchedStd,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        setLoading(false);
        setIsData(false);
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
      if (check) {
        setCheck(false);
      }
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
    setCheck(false);
    setIsDelete(false);
    setSelected({ ...selected, student: [] });
    deselectAll();
    setSearchStd({ stdno: "" });
    setSearchedStd("");
    fetchStudents(page);
  }, []);

  const handleDelete = async () => {
    setIsDelete(true);
    setLen(selected.student.length);
    if (len === 0) {
      toast.warn("Atleast one student must be selected!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsDelete(false);
    } else {
      const res = await axios
        .patch(
          "https://akgec-late-entry.herokuapp.com/api/admin/student/delete",
          selected.student,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        )
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
          setIsDelete(false);
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
        setIsDelete(false);
        if (d === 0) return fetchStudents(page);
        else if (d === 1) return func2(page);
      }
    }
  };

  const reset = () => {
    setCreateStd({
      year: "",
      branch: "",
    });
    setSelected({ ...selected, student: [] });
    setSearchedStd("");
    setSearchStd({ stdno: "" });
  };

  const Selected = (
    id,
    Name,
    Stdno,
    Branch,
    Mobile,
    Email,
    Year,
    lateCount,
    fineCount
  ) => {
    setIndex(selected.student.indexOf(id));
    if (index < 0) {
      selected.student.push(id);
      selected.name.push(Name);
      selected.stdNo.push(Stdno);
      selected.year.push(Year);
      selected.branch.push(Branch);
      selected.mobile.push(Mobile);
      selected.email.push(Email);
      selected.lateCount.push(lateCount);
      selected.fineCount.push(fineCount);
    } else {
      selected.student.splice(index, 1);
      selected.name.splice(index, 1);
      selected.stdNo.splice(index, 1);
      selected.year.splice(index, 1);
      selected.branch.splice(index, 1);
      selected.mobile.splice(index, 1);
      selected.email.splice(index, 1);
      selected.fineCount.splice(index, 1);
      selected.lateCount.splice(index, 1);
    }
  };

  const selectAll = () => {
    setCheck(true);
    var id = "";
    for (var i = 0; i < results.length; i++) {
      id = results[i]._id;
      setIndex(selected.student.indexOf(id));
      if (index < 0) {
        selected.student.push(id);
        selected.name.push(results[i].name);
        selected.stdNo.push(results[i].stdNo);
        selected.year.push(results[i].year);
        selected.branch.push(results[i].branch);
        selected.mobile.push(results[i].mobile);
        selected.email.push(results[i].email);
        selected.lateCount.push(results[i].lateCount);
        selected.fineCount.push(results[i].fineCount);
      }
    }
  };

  const deselectAll = () => {
    setCheck(false);
    setSelected({
      student: [],
      name: [],
      stdNo: [],
      branch: [],
      year: [],
      mobile: [],
      email: [],
      lateCount: [],
      fineCount: [],
    });
    setBoolArr([]);
  };

  const AllTheSame = (array) => {
    var first = array[0];
    return array.every(function (element) {
      return element === first;
    });
  };

  const AllFalse = (array) => {
    return array.every(function (element) {
      return element === false;
    });
  };

  const update = () => {
    setLen(selected.student.length);
    if (len === 0) {
      toast.warn("Atleast one student must be selected!", {
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
      setBoolArr([
        AllTheSame(selected.name),
        AllTheSame(selected.mobile),
        AllTheSame(selected.email),
        AllTheSame(selected.branch),
        AllTheSame(selected.year),
        AllTheSame(selected.stdNo),
        AllTheSame(selected.lateCount),
        AllTheSame(selected.fineCount),
      ]);
      if (AllFalse(boolArr)) {
        toast.error("No information can be changed for selected students!", {
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
        setEditVal({
          name: selected.name[0],
          mobile: selected.mobile[0],
          email: selected.email[0],
          branch: selected.branch[0],
          year: selected.year[0],
          stdNo: selected.stdNo[0],
          lateCount: selected.lateCount[0],
          fineCount: selected.fineCount[0],
        });
        setUser_ID({
          student: selected.student,
          boolArr: boolArr,
          editVal: editVal,
        });
        setOpenDialog(true);

        // dialogRef3.afterClosed().subscribe(dialog_result=>{
        //   if(dialog_result){
        //     if (d === 0) return fetchStudents(page);
        //     else if (d === 1) return func2(page);
        //   }
        // })
      }
    }
  };

  const search = async () => {
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
        setResults([]);
        setLoading(true);
        setSelected({ ...selected, student: [] });
        const res = await axios
          .get(
            "https://akgec-late-entry.herokuapp.com/api/admin/student/read?stdNo=" +
              searchStd.stdno,
            {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            }
          )
          .catch((err) => {
            setLoading(false);
            setIsData(false);
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
          setLoading(false);
          setIsData(true);
          setResults(res.data.result);
          if (check) {
            setCheck(false);
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
      }
    }
  };

  const storeALL = async () => {
    setIsStoring(true);
    if (createStd.branch === null) {
      setCreateStd({ ...createStd, branch: "" });
    }
    if (createStd.year === null) {
      setCreateStd({ ...createStd, year: "" });
    }
    const res = await axios
      .get(
        "http://akgec-late-entry.herokuapp.com/api/admin/student/filter?page=1&limit=5000&year=" +
          createStd.year +
          "&branch=" +
          createStd.branch +
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
      localStorage.removeItem("results");
      localStorage.setItem("results", JSON.stringify(res.data.results));
      setIsStoring(false);
    }
  };

  const showALL = () => {
    setIsStoring(true);
    setResults(JSON.parse(localStorage.getItem("results")));
    setNxt(false);
    setPrv(false);
    setCheck(true);
    selectAll();
    return selectedFunc();
  };

  const selectedFunc = () => {
    localStorage.removeItem("results");
    setIsStoring(false);
  };

  const handleClose = () => setOpenDialog(false);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={openDialog}
        onClose={handleClose}
      >
        <UpdateStudent />
      </Dialog>
      <div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "6%" }}>
        <div className="ms__card ms__card-profile">
          <div
            className="ms__card-header ms__card-header-image"
            style={{ height: "12vh", position: "relative", top: "-37px" }}
          >
            <h4
              className="ms__card-title"
              style={{
                fontSize: "xx-large",
                paddingTop: "1%",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                margin: "6px",
                marginLeft: "3%",
              }}
            >
              Manage Students
            </h4>
            <div style={{ float: "right" }}>
              <div className="ms__container">
                <form
                  onSubmit={submitHandler}
                  style={{ marginRight: " 45px", marginTop: "4%" }}
                >
                  <input
                    required
                    id="searchBar"
                    className="searchbar"
                    type="text"
                    placeholder="Search..."
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
            <div className="row" style={{ position: "relative", top: "-37px" }}>
              <div
                className="col-md-8"
                id="ms__ta-col"
                style={{ height: "90vh" }}
              >
                <div className="table-responsive" style={{ paddingTop: "2%" }}>
                  <div
                    className="row"
                    style={{ width: "100%", minHeight: "78vh" }}
                  >
                    <table className="table ms__table">
                      <thead className="text-primary">
                        <tr>
                          {/* <td style={{width: "15%"}}><mat-checkbox (click)="selectAll()" *ngIf="!check"></mat-checkbox>
                  <mat-checkbox (click)="deselectAll()" *ngIf="check" [checked]="true"></mat-checkbox></td> */}
                          <th style={{ width: "28%" }} className="ms__th">
                            Name
                          </th>
                          <th style={{ width: "20%" }} className="ms__th">
                            Student No.
                          </th>
                          <th style={{ width: "17%" }} className="ms__th">
                            Branch
                          </th>
                          <th style={{ width: "20%" }} className="ms__th">
                            Year
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
                        {results.map((com) => {
                          return (
                            <tr key={com._id}>
                              <td style={{ width: "15%" }} className="ms__td">
                                {com.name}
                              </td>
                              <td style={{ width: "28%" }} className="ms__td">
                                {com.name}
                              </td>
                              <td style={{ width: "20%" }} className="ms__td">
                                {com.stdNo}
                              </td>
                              <td style={{ width: "17%" }} className="ms__td">
                                {com.branch}
                              </td>
                              <td style={{ width: "20%" }} className="ms__td">
                                {Year[com.year]}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
                        position: "absolute",
                        bottom: "11.5px",
                      }}
                      onClick={() => {
                        setPage(1);
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
                          position: "absolute",
                          right: "22%",
                          bottom: "2%",
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
                            position: "absolute",
                            bottom: "2.05%",
                            right: "12.5%",
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
                          position: "absolute",
                          right: "2%",
                          bottom: "2%",
                        }}
                        disabled={!nxt}
                      >
                        Next <i className="fas fa-angle-right"></i>
                      </button>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-md-3" id="ms__col-sel">
                <h5 style={{ marginBottom: "2px", marginTop: "9px" }}>
                  Filter
                </h5>
                <form>
                  <div className="ms__options">
                    <FormControl
                      required
                      sx={{ m: 1, minWidth: 130, maxWidth: 130 }}
                    >
                      <InputLabel id="demo-simple-select-required-label">
                        YEAR
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={createStd.year}
                        label="YEAR *"
                        onChange={(e) =>
                          setCreateStd({
                            ...createStd,
                            year: e.target.value,
                          })
                        }
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
                    <FormControl
                      required
                      sx={{ m: 1, minWidth: 130, maxWidth: 130 }}
                    >
                      <InputLabel id="demo-simple-select-required-label">
                        BRANCH
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={createStd.branch}
                        label="BRANCH *"
                        onChange={(e) =>
                          setCreateStd({
                            ...createStd,
                            branch: e.target.value,
                          })
                        }
                        style={{
                          color: "white",
                          border: "1px solid white",
                        }}
                      >
                        <MenuItem value={"CS"}>Computer Science</MenuItem>
                        <MenuItem value={"IT"}>Information Technology</MenuItem>
                        <MenuItem value={"EC"}>
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
                    onClick={update}
                    style={{ fontSize: "12.5px" }}
                  >
                    Update Selected
                  </button>
                  {!isDelete && (
                    <button
                      className="btn mat-flat-button ms__button"
                      type="submit"
                      onClick={handleDelete}
                      style={{ fontSize: "12.5px" }}
                    >
                      Delete Selected
                    </button>
                  )}
                  {isDelete && (
                    <button
                      className="btn mat-flat-button ms__button"
                      id="load_btn"
                    >
                      <div className="ms__lds-dual-ring"></div>
                    </button>
                  )}
                  {!isStoring && (
                    <button
                      className="btn mat-flat-button ms__button"
                      type="submit"
                      onClick={showALL}
                    >
                      Select All
                    </button>
                  )}
                  {isStoring && (
                    <button
                      className="btn mat-flat-button ms__button"
                      id="load_btn"
                    >
                      <div className="ms__lds-dual-ring"></div>
                    </button>
                  )}
                  <p className="ms__term">
                    *Use Select All to select all filtered students.
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
