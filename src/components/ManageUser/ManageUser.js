import "./ManageUser.css";

import { useEffect, useState } from "react";

import Api from "../../Api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const navigate = useNavigate();
  const privilege = ["-", "Administrator", "Co-ordinator", "Volunteer"];
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nxt, setNxt] = useState(true);
  const [prv, setPrv] = useState(true);
  const [user, setUser] = useState(null);

  const next = () => {
    setPage((page) => page + 1);
    return fetchUsers(page);
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
    return fetchUsers(page);
  };

  const fetchUsers = async (pg) => {
    const response = await axios
      .get(
        "http://akgec-late-entry.herokuapp.com/api/admin/user/readall?limit=10&page=" +
          pg
      )
      .catch((err) => {
        setLoading(false);
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
        setResults(null);
      });
    if (response) {
      setLoading(false);
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
    const user_res = await axios.get(Api.dash).catch((err) => console.log(err));
    if (user_res) {
      setUser(user_res.data.msg.user);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUsers(page);
  }, []);

  const confirmDialog = (j, a) => {
    if (user === 1) {
      toast.error("Can't Delete All Users!!", {
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
    <div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "2.5%" }}>
      <div className="card card-profile">
        <div className="card-header card-header-image">
          <h1
            className="card-title"
            style={{
              fontSize: "xx-large",
              paddingTop: "1.2%",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
            }}
          >
            Manage Users
          </h1>
        </div>
        <div className="card-body">
          <div className="table-responsive" style={{ paddingTop: "2%" }}>
            <div className="row" style={{ width: "100%", minHeight: "70vh" }}>
              <table className="table">
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="7" style={{ paddingTop: "20%" }}>
                        <div className="lds-ellipsis">
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
                        <td>{com.name}</td>
                        <td>{com.mobile}</td>
                        <td>{com.userName}</td>
                        <td>{com.email}</td>
                        <td>{privilege[com.privilege]}</td>
                        <td className="text-primary">{com.dept}</td>
                        <td>
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
                            onClick={() => confirmDialog(com._id, com.name)}
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
                              backgroundColor: "white",
                              borderRadius: "100%",
                            }}
                            // onClick={() => openDialog(com._id)}
                          >
                            <i
                              className="fa fa-edit"
                              style={{ color: "#0000b3" }}
                            ></i>
                          </button>
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
                            // onClick={forgotPswd}
                          >
                            <i className="fas fa-user-lock"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
                    color: "#63B967",
                    borderColor: "#63B967",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  onClick={prev}
                  disabled={!prv}
                >
                  <i className="fas fa-angle-left"></i> Previous
                </button>
                &nbsp;
                <li
                  className="btn"
                  style={{
                    color: "#63B967",
                    borderColor: "#63B967",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {page}
                </li>
                &nbsp;
                <button
                  className="btn mat-stroked-button"
                  type="submit"
                  style={{
                    color: "#63B967",
                    borderColor: "#63B967",
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

export default ManageUser;
