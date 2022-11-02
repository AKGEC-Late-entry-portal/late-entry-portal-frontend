import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as FileSaver from "file-saver";
import "./FullReport.css";
import { Dialog } from "@mui/material";
import EditFormat from "../EditFormat/EditFormat";

const Year = ["-", "I", "II", "III", "IV"];

const FullReport = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [nxt, setNxt] = useState(true);
  const [prv, setPrv] = useState(true);
  const [isData, setIsData] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [send_mail, setSend_mail] = useState({
    admin: false,
    hod: false,
    self: false,
  });

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
    return func(page - 1);
  };

  const next = () => {
    setPage((prevPage) => prevPage + 1);
    return func(page + 1);
  };

  const func = async (page) => {
    setResults([]);
    setLoading(true);
    const response = await axios
      .get(
        "https://akgec-late-entry.herokuapp.com/api/admin/report/final?page=" +
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
      const users = response.data.results;
      setResults(users);
      if (users.length === 0) {
        toast.error("You have reached the end of the document!", {
          position: "bottom-right",
          autoClose: 5000,
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

  useEffect(() => {
    setPage(1);
    func(page);
  }, []);

  const editFormat = () => {
    setOpenDialog(true);
  };

  const sendMail = async () => {
    setIsSending(true);
    const res = await axios
      .post(
        "https://akgec-late-entry.herokuapp.com/api/admin/report/send",
        send_mail,
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
          toast.error("Can't send email!", {
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
        setIsSending(false);
      });
    if (res) {
      toast.success("Email Sent Successfully !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsSending(false);
    }
  };

  const resetFunc = async () => {
    setSend_mail({
      hod: false,
      self: false,
      admin: false,
    });
    const res = await axios
      .put(
        "https://akgec-late-entry.herokuapp.com/api/admin/report/reset",
        "any",
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        console.log(err);
      });
    if (res) {
    }
  };

  const downloadFunc = async () => {
    if (results.length === 0) {
      toast.error("No Data Found To Generate Report !", {
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
      setIsDownloading(true);
      const res = await axios
        .get(
          "https://akgec-late-entry.herokuapp.com/api/admin/report/download",
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
              Accept: "application/pdf",
            },
            responseType: "blob",
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
            toast.error("Error downloading report!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setIsDownloading(false);
          }
        });
      if (res) {
        const blob = new Blob([res], { type: "application/pdf" });
        FileSaver.saveAs(blob, "Report");
        setIsDownloading(false);
      }
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const successfulEditFormatHandler = (res) => {
    if (res) {
      setOpenDialog(false);
    }
  };

  return (
    <div className="components">
      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        PaperProps={{
          style: {
            minHeight: "52vh",
            maxHeight: "100vh",
          },
        }}
      >
        <EditFormat onEditingFormat={successfulEditFormatHandler} />
      </Dialog>
      <div style={{ paddingLeft: "5%", paddingRight: "5%", marginTop: "11vh" }}>
        <div className="fr__card fr__card-profile" style={{ height: "93vh" }}>
          <div
            className="fr__card-header fr__card-header-image"
            style={{ position: "relative", height: "12vh", top: "-30px" }}
          >
            <h4
              className="fr__card-title"
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
              Report
            </h4>
          </div>
          <div className="fr__card-body">
            <div className="row" style={{ position: "relative", top: "-29px" }}>
              <div className="col-md-8" id="fr__ta-col">
                <div className="table-responsive" style={{ paddingTop: "2%" }}>
                  <div style={{ width: "100%", minHeight: "65vh" }}>
                    <table className="table">
                      <thead className="text-primary">
                        <tr>
                          <th style={{ width: "30%" }}>Name</th>
                          <th style={{ width: "20%" }}>Student No.</th>
                          <th style={{ width: "20%" }}>Branch</th>
                          <th style={{ width: "15%" }}>Year</th>
                          <th style={{ width: "15%" }}>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr>
                            <td
                              colSpan="5"
                              style={{
                                paddingTop: "20%",
                              }}
                            >
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
                              <td
                                className="manage__td"
                                style={{ width: "30%" }}
                              >
                                {com.name}
                              </td>
                              <td
                                className="manage__td"
                                style={{ width: "20%" }}
                              >
                                {com.stdNo}
                              </td>
                              <td
                                className="manage__td"
                                style={{ width: "20%" }}
                              >
                                {com.branch}
                              </td>
                              <td
                                className="manage__td"
                                style={{ width: "15%" }}
                              >
                                {Year[com.year]}
                              </td>
                              <td
                                className="manage__td"
                                style={{ width: "15%" }}
                              >
                                {com.lateCount}
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
                        onClick={prev}
                        style={{
                          color: "#f35d5e",
                          borderColor: "#f35d5e",
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
                            color: "#f35d5e",
                            borderColor: "#f35d5e",
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
                        className="btn mat-stroked-button"
                        type="submit"
                        onClick={next}
                        style={{
                          color: "#f35d5e",
                          borderColor: "#f35d5e",
                          fontFamily: "Poppins, sans-serif",
                        }}
                        disabled={!nxt}
                      >
                        Next <i className="fas fa-angle-right"></i>
                      </button>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-md-3" id="fr__col-sel">
                <h5>Options</h5>
                <button
                  className="btn mat-flat-button"
                  type="submit"
                  id="fr__op"
                  onClick={editFormat}
                >
                  Edit Format
                </button>
                <div
                  className="fr__options"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMail();
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "500", margin: "5px 0" }}>
                        <input
                          type="checkbox"
                          name="hod"
                          value="hod"
                          checked={send_mail.hod}
                          onChange={() => {
                            setSend_mail({
                              ...send_mail,
                              hod: !send_mail.hod,
                            });
                          }}
                          style={{ marginRight: "6%" }}
                        />
                        All HODs
                      </div>
                      <div style={{ fontWeight: "500", margin: "5px 0" }}>
                        <input
                          type="checkbox"
                          name="admin"
                          value="admin"
                          checked={send_mail.admin}
                          onChange={() => {
                            setSend_mail({
                              ...send_mail,
                              admin: !send_mail.admin,
                            });
                          }}
                          style={{ marginRight: "6%" }}
                        />
                        Administrator
                      </div>
                      <div style={{ fontWeight: "500", margin: "5px 0" }}>
                        <input
                          type="checkbox"
                          name="self"
                          value="self"
                          checked={send_mail.self}
                          onChange={() => {
                            setSend_mail({
                              ...send_mail,
                              self: !send_mail.self,
                            });
                          }}
                          style={{ marginRight: "6%" }}
                        />
                        Self
                      </div>
                    </div>
                    {/* <mat-checkbox name="hod" formControlName="hod"></mat-checkbox>  All HODs<br />
            <mat-checkbox name="admin" formControlName="admin"></mat-checkbox>  Administrator<br />
            <mat-checkbox name="self" formControlName="self"></mat-checkbox>  Self */}
                    {!isSending && (
                      <button
                        className="btn mat-flat-button"
                        type="submit"
                        style={{ width: "max-content", overflowY: "hidden" }}
                      >
                        Send Mail
                      </button>
                    )}
                    {isSending && (
                      <button
                        className="btn mat-flat-button"
                        type="submit"
                        id="fr__load_btn"
                      >
                        <div className="lds-dual-ring"></div>
                      </button>
                    )}
                  </form>
                </div>
                <button
                  className="btn mat-flat-button"
                  type="submit"
                  id="fr__op"
                  style={{ marginBottom: "2%" }}
                  onClick={resetFunc}
                >
                  Reset
                </button>
                {!isDownloading && (
                  <button
                    className="btn mat-flat-button"
                    type="submit"
                    id="fr__op"
                    style={{ marginBottom: "4%" }}
                    onClick={downloadFunc}
                  >
                    Download
                  </button>
                )}
                {isDownloading && (
                  <button
                    className="btn mat-flat-button"
                    type="submit"
                    id="fr__op"
                    style={{ marginBottom: "4%" }}
                  >
                    <div className="lds-dual-ring"></div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullReport;
