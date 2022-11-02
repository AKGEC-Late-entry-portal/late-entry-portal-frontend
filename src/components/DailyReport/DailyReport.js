import "./DailyReport.css";

import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DailyReport = () => {
  const navigate = useNavigate();
  const year = ["-", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"];
  const obj = {
    LT: "Lecture Theatre",
    MG: "Main Gate",
    "CS/IT": "CS/IT",
  };
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("");
  const [page, setPage] = useState(1);
  const [nxt, setNxt] = useState(true);
  const [prv, setPrv] = useState(true);
  const [d, setD] = useState(0);
  const [b, setB] = useState("");
  const [isData, setIsData] = useState(false);
  const [loc, setLoc] = useState("");

  const next = () => {
    setPage((prevPage) => prevPage + 1);
    if (d === 0) return fetchEntries(page + 1);
    else if (d === 1) return func2(b, page + 1, view);
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
    else if (d === 1) return func2(b, page - 1, view);
  };

  const fetchEntries = async (pg) => {
    setResults([]);
    setLoading(true);
    const response = await axios
      .get(
        "https://akgec-late-entry.herokuapp.com/api/admin/report/daily?page=" +
          page +
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
          toast.error("No Entires Found For Today!", {
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
      const users = response.data.results;
      setResults(users);
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

  const func2 = async (b, page, c) => {
    setResults([]);
    setView(c);
    setD(1);
    setLoading(true);
    const res = await axios
      .get(
        "https://akgec-late-entry.herokuapp.com/api/admin/report/daily?page=" +
          page +
          "&limit=10&location=" +
          b,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        setB(b);
        setLoading(false);
        setIsData(false);
        setResults([]);
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
          toast.error("No Entires Found for " + c + " !", {
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
      setB(b);
      setLoading(false);
      setIsData(true);
      const users = res.data.results;
      setResults(users);
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

  return (
    <div className="components">
      <div
        style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "6.0%" }}
      >
        <div className="dr__card dr__card-profile">
          <div
            className="dr__card-header dr__card-header-image"
            style={{ height: "14vh", position: "relative", top: "-40px" }}
          >
            <h1
              className="dr__card-title"
              style={{
                fontSize: "xx-large",
                paddingTop: "1%",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                marginTop: "0",
                marginLeft: "3%",
              }}
            >
              Daily Report
            </h1>
            <div
              className="field1"
              style={{
                float: "right",
                marginRight: "5%",
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
                  value={loc}
                  label="Location *"
                  onChange={(e) => {
                    setLoc(e.target.value);
                    func2(e.target.value, 1, obj[e.target.value]);
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
            </div>
          </div>
          <div className="dr__card-body" style={{ height: "76vh" }}>
            <div
              className="table-responsive"
              style={{ paddingTop: "0%", position: "relative", top: "-31px" }}
            >
              <div className="row" style={{ width: "100%", minHeight: "72vh" }}>
                <table className="table">
                  <thead
                    className="text-primary"
                    style={{ marginBottom: "3px" }}
                  >
                    <tr>
                      <th>Name</th>
                      <th>Student No.</th>
                      <th>Branch</th>
                      <th>Year</th>
                      <th>Location</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan="8" style={{ paddingTop: "20%" }}>
                          <div className="lds-ellipsis">
                            <div className="dr__div"></div>
                            <div className="dr__div"></div>
                            <div className="dr__div"></div>
                            <div className="dr__div"></div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {results.map((com) => {
                      return (
                        <tr key={com._id}>
                          <td className="manage__td">{com.name}</td>
                          <td className="manage__td">{com.stdNo}</td>
                          <td className="manage__td">{com.branch}</td>
                          <td className="manage__td">{year[com.year]}</td>
                          <td className="manage__td">{com.location}</td>
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
                      borderColor: "#7E57C2",
                      backgroundColor: "#7E57C2",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={() => {
                      setPage(1);
                      fetchEntries(1);
                      setLoc("");
                    }}
                  >
                    Refresh
                  </button>
                )}
                {d === 1 && (
                  <button
                    className="btn mat-raised-button"
                    type="submit"
                    style={{
                      color: "white",
                      borderColor: "#7E57C2",
                      backgroundColor: "#7E57C2",
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={() => {
                      setPage(1);
                      setD(0);
                      fetchEntries(1);
                      setLoc("");
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
                      color: "#7E57C2",
                      borderColor: "#7E57C2",
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
                        color: "#7E57C2",
                        borderColor: "#7E57C2",
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
                      color: "#7E57C2",
                      borderColor: "#7E57C2",
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

export default DailyReport;
