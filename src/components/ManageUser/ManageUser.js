import "./ManageUser.css";

import { useEffect, useState } from "react";

import Api from "../../Api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [nxt, setNxt] = useState(true);
  const [prv, setPrv] = useState(true);
  const [page, setPage] = useState();
  const [results, setResults] = useState([]);

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
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
    return func(page);
  };

  const next = () => {
    setPage(page + 1);
    return func(page);
  };

  const func = (pg) => {
    async function getComments() {
      setResults([]);
      setLoading(true);
      try {
        await axios
          .get(
            "http://akgec-late-entry.herokuapp.com/api/admin/user/readall?limit=10&page=" +
              pg
          )
          .then(function (res) {
            console.log(res.data.results);
            setLoading(false);
            res.data.results.forEach((item) => {
              results.push(item);
            });
            setResults(results);
            console.log(results);
            if (results.length === 0) {
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
          });
      } catch (error) {
        setLoading(false);
        if (error.status === 403) {
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
              autoClose: 3000,
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
      }
    }
    getComments();
    async function getCommentsDash() {
      await axios.get(Api.dash).then(function (res) {
        setUser(res.data.msg.user);
      });
    }
    getCommentsDash();
  };

  useEffect(() => {
    setLoading(true);
    setPage(1);
    func(page);
  }, [user]);

  const openDialog = () => {};

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
        theme: "light",
      });
    }
  };

  const forgotPswd = () => {};

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
                    console.log(com);
                    return (
                      <tr key={com.id}>
                        <td>{com.name}</td>
                        <td>{com.mobile}</td>
                        <td>{com.userName}</td>
                        <td>{com.email}</td>
                        {/* <td>{privilege[com.privilege]}</td> */}
                        <td className="text-primary">{com.dept}</td>
                        <td>
                          <button
                            color="warn"
                            style={{
                              outlineStyle: "none",
                              marginTop: "-15%",
                              width: "30px",
                              height: "30px",
                            }}
                            onClick={confirmDialog(com._id, com.name)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                          <button
                            color="primary"
                            style={{
                              outlineStyle: "none",
                              marginTop: "-15%",
                              width: "30px",
                              height: "30px",
                            }}
                            onClick={openDialog(com._id)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                          <button
                            style={{
                              outlineStyle: "none",
                              marginTop: "-15%",
                              width: "30px",
                              height: "30px",
                            }}
                            onClick={forgotPswd}
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
                >
                  <i className="fas fa-angle-left"></i> Previous
                </button>
                &nbsp;
                <li
                  className="mat-stroked-button"
                  style={{
                    color: "#63B967",
                    borderColor: "#63B967",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {/* {page} */}
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
