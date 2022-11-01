import "./ManageEntry.css";

import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageEntry = () => {
  const navigate = useNavigate();
  const year = ["-", "Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"];
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [nxt, setNxt] = useState(true);
  const [prv, setPrv] = useState(true);
  const [d, setD] = useState(0);
  const [isData, setIsData] = useState(false);

  const next = () => {
    setPage((prevPage) => prevPage + 1);
    if (d === 0) return fetchEntries(page + 1);
    else if (d === 1) return func2(page + 1, date);
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
  };

  const fetchEntries = async (pg) => {
    setResults([]);
    setLoading(true);
    const response = await axios
      .get(
        "http://akgec-late-entry.herokuapp.com/api/admin/entry/readall?limit=10&page=" +
          pg,
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
        "http://akgec-late-entry.herokuapp.com/api/admin/entry/read?limit=10&page=" +
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

  useEffect(() => {
    fetchEntries(page);
  }, []);

  const deleteEntry = async (id) => {
    const res = await axios
      .delete(
        "https://akgec-late-entry.herokuapp.com/api/admin/entry/delete/" + id,
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
    }
  };

  return (
    <div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "6.0%" }}>
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
              <input
                type="date"
                placeholder="Enter Date"
                name="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setD(e.target.value === "" ? 0 : 1);
                  e.target.value === ""
                    ? fetchEntries(page)
                    : func2(page, e.target.value);
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
                <thead className="text-primary" style={{ marginBottom: "3px" }}>
                  <tr>
                    <th>Name</th>
                    <th>Student No.</th>
                    <th>Branch</th>
                    <th>Year</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
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

                  {results.map((com) => {
                    return (
                      <tr key={com._id}>
                        <td className="manage__td">{com.name}</td>
                        <td className="manage__td">{com.stdNo}</td>
                        <td className="manage__td">{com.branch}</td>
                        <td className="manage__td">{year[com.year]}</td>
                        <td className="manage__td">{com.location}</td>
                        <td className="manage__td">{com.date}</td>
                        <td className="manage__td">{com.time}</td>
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
              {d === 1 && (
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
  );
};

export default ManageEntry;
