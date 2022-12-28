import "./ManageEntry.css";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const obj = {
  LT: "Lecture Theatre",
  MG: "Main Gate",
  "CS/IT": "CS/IT",
};

const ManageEntry = () => {
  const navigate = useNavigate();
  const year = ["-", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"];
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [nxt, setNxt] = useState(true);
  const [prv, setPrv] = useState(true);
  const [d, setD] = useState(0);
  const [isData, setIsData] = useState(false);

  const next = () => {
    setPage((prevPage) => prevPage + 1);
    if (d === 0) return fetchEntries(page + 1);
    else if (d === 1) return func2(page + 1, date);
    else if (d === 2) return func3(page + 1, location);
    else if (d === 3) return func4(page + 1, location, date);
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
    if (d === 0) return fetchEntries(page - 1);
    else if (d === 1) return func2(page - 1, date);
    else if (d === 2) return func3(page - 1, location);
    else if (d === 3) return func4(page - 1, location, date);
  };

  const fetchEntries = async (pg) => {
    setResults([]);
    setLoading(true);
    const response = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/entry/readall?limit=10&page=" +
          pg,
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
          toast.warn(
            "Unable to load Data .Check your connection and try refreshing Page !!",
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
        }
      });
    if (response) {
      setLoading(false);
      setIsData(true);
      const users = response.data.results;
      // console.log(users);
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

  const func2 = async (page, date) => {
    setResults([]);
    setDate(date);
    setLoading(true);
    const res = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/entry/read?limit=10&page=" +
          page +
          "&date=" +
          date,
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
          toast.warn(
            "Unable to load Data .Check your connection and try refreshing Page !!",
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
        }
      });
    if (res) {
      setLoading(false);
      setIsData(true);
      const users = res.data.results;
      setResults(users);
      if (users.length === 0) {
        toast.error("No Entires Found for " + date + " !", {
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

  const func3 = async (page, loc) => {
    setResults([]);
    setLocation(loc);
    setLoading(true);
    const res = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/entry/read?limit=10&page=" +
          page +
          "&location=" +
          loc,
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
          toast.warn(
            "Unable to load Data .Check your connection and try refreshing Page !!",
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
        }
      });
    if (res) {
      setLoading(false);
      setIsData(true);
      const users = res.data.results;
      setResults(users);
      if (users.length === 0) {
        toast.error("No Entires Found for " + obj[loc] + " !", {
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
  const func4 = async (page, loc, date) => {
    setResults([]);
    setDate(date);
    setLocation(loc);
    setLoading(true);
    const res = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/entry/read?limit=10&page=" +
          page +
          "&date=" +
          date +
          "&location=" +
          loc,
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
          toast.warn(
            "Unable to load Data .Check your connection and try refreshing Page !!",
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
        }
      });
    if (res) {
      setLoading(false);
      setIsData(true);
      const users = res.data.results;
      setResults(users);
      if (users.length === 0) {
        toast.error("No Entires Found!", {
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
    fetchEntries(page);
  }, []);

  const deleteEntry = async (id) => {
    const res = await axios
      .delete(
        "https://akgec-late-entry-backend.onrender.com/api/admin/entry/delete/" +
          id,
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
        } else {
          toast.error("Error Deleting Entry! Try Again!", {
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
      toast.success("Entry Deleted Successfully!!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if (d === 0) return fetchEntries(page);
      else if (d === 1) return func2(page, date);
      else if (d === 2) return func3(page, location);
      else if (d === 3) return func2(page, location, date);
    }
  };

  return (
    <div className="components">
      <div
        style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "6.0%" }}
      >
        <div className="me__card me__card-profile">
          <div
            className="me__card-header me__card-header-image"
            style={{ height: "14vh", position: "relative", top: "-40px" }}
          >
            <h1
              className="me__card-title"
              style={{
                fontSize: "xx-large",
                paddingTop: "1%",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                marginTop: "0",
                marginLeft: "3%",
              }}
            >
              Manage Entries
            </h1>
            <div style={{ float: "right" }}>
              <div appearance="outline">
                <FormControl sx={{ m: 2, minWidth: 175 }}>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ color: "white" }}
                  >
                    Location
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={location}
                    label="Location"
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (e.target.value === "" && date === "") {
                        setD(0);
                        fetchEntries(page);
                      } else if (e.target.value !== "" && date !== "") {
                        setD(3);
                        func4(page, e.target.value, date);
                      } else if (e.target.value === "") {
                        setD(1);
                        func2(page, date);
                      } else if (date === "") {
                        setD(2);
                        func3(page, e.target.value);
                      }
                    }}
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
                <input
                  type="date"
                  placeholder="Enter Date"
                  name="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (e.target.value === "" && location === "") {
                      setD(0);
                      fetchEntries(page);
                    } else if (e.target.value !== "" && location !== "") {
                      setD(3);
                      func4(page, location, e.target.value);
                    } else if (location === "") {
                      setD(1);
                      func2(page, e.target.value);
                    } else if (e.target.value === "") {
                      setD(2);
                      func3(page, location);
                    }
                  }}
                  style={{
                    marginTop: "3%",
                    marginRight: "49px",
                    width: "238px",
                    height: "54px",
                    backgroundColor: "#00bfa5",
                    border: "1.8px solid white",
                    borderRadius: "5px",
                    color: "white",
                    padding: "19px",
                    fontSize: "15px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="me__card-body" style={{ height: "82vh" }}>
            <div
              className="table-responsive"
              style={{ paddingTop: "0%", position: "relative", top: "-31px" }}
            >
              <div className="row" style={{ width: "100%", minHeight: "78vh" }}>
                <table className="table">
                  <thead
                    className="text-primary"
                    style={{ marginBottom: "3px" }}
                  >
                    <tr>
                      <th>S.No.</th>
                      <th>Name</th>
                      <th>Student No.</th>
                      <th>Branch</th>
                      <th>Year</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Late Count</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan="8" style={{ paddingTop: "20%" }}>
                          <div className="lds-ellipsis">
                            <div className="me__div"></div>
                            <div className="me__div"></div>
                            <div className="me__div"></div>
                            <div className="me__div"></div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {results.map((com, index) => {
                      return (
                        <tr key={com._id}>
                          <td className="manage__td">
                            {10 * (page - 1) + index + 1}
                          </td>
                          <td className="manage__td">{com.name}</td>
                          <td className="manage__td">{com.stdNo}</td>
                          <td className="manage__td">{com.branch}</td>
                          <td className="manage__td">{year[com.year]}</td>
                          <td className="manage__td">{com.location}</td>
                          <td className="manage__td">{com.date}</td>
                          <td className="manage__td">{com.time}</td>
                          <td className="manage__td">{com.lateCount}</td>
                          <td className="manage__td">
                            <button
                              style={{
                                outlineStyle: "none",
                                marginTop: "-15%",
                                width: "30px",
                                height: "30px",
                                border: "none",
                                backgroundColor: "white",
                                borderRadius: "100%",
                              }}
                              onClick={() => deleteEntry(com._id)}
                            >
                              <i
                                className="fa fa-trash"
                                style={{ color: "red" }}
                              ></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ float: "left" }}>
                {d === 0 && (
                  <button
                    className="btn mat-raised-button"
                    type="submit"
                    style={{
                      color: "white",
                      borderColor: "#00bfa5",
                      backgroundColor: "#00bfa5",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={() => {
                      setPage(1);
                      fetchEntries(1);
                    }}
                  >
                    Refresh
                  </button>
                )}
                {d !== 0 && (
                  <button
                    className="btn mat-raised-button"
                    type="submit"
                    style={{
                      color: "white",
                      borderColor: "#00bfa5",
                      backgroundColor: "#00bfa5",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={() => {
                      setPage(1);
                      setD(0);
                      setDate("");
                      setLocation("");
                      fetchEntries(1);
                    }}
                  >
                    All Entries
                  </button>
                )}
              </div>
              <nav
                aria-label="Page navigation example"
                style={{ float: "right" }}
              >
                <ul className="pagination">
                  <button
                    className="btn mat-stroked-button"
                    type="submit"
                    style={{
                      color: "#00bfa5",
                      borderColor: "#00bfa5",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={prev}
                    disabled={!prv}
                  >
                    <i className="fas fa-angle-left"></i> Previous
                  </button>
                  &nbsp;
                  {isData && (
                    <li
                      className="btn"
                      style={{
                        color: "#00bfa5",
                        borderColor: "#00bfa5",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {page}
                    </li>
                  )}
                  &nbsp;
                  <button
                    className="btn mat-stroked-button"
                    type="submit"
                    style={{
                      color: "#00bfa5",
                      borderColor: "#00bfa5",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={next}
                    disabled={!nxt}
                  >
                    Next <i className="fas fa-angle-right"></i>
                  </button>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEntry;
