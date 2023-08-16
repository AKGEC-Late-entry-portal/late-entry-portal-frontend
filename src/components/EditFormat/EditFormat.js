import "./EditFormat.css";

import { useEffect, useState } from "react";

import Spinner from "react-spinner-material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditFormat = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentFormat, setCurrentFormat] = useState("");
  const [editFormat, setEditFormat] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios
      .post(
        "https://akgec-late-entry-backend.onrender.com/api/admin/report/format",
        editFormat,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        if (err.response.status === 404) {
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
          toast.error("Error editing format", {
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
        setLoading(false);
      });
    if (res) {
      toast.success("Edit Format Successful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      props.onEditingFormat(true);
    }
  };

  const getFormat = async () => {
    setLoading(true);
    const res = await axios
      .get(
        "https://akgec-late-entry-backend.onrender.com/api/admin/report/format/",
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .catch((err) => {
        if (err.response.status === 404) {
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
          toast.error("Error loading Current Format!", {
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
        setLoading(false);
      });
    if (res) {
      console.log(res);
      setCurrentFormat(res.data.result.savedFormat);
      document.getElementById("ef__cf").innerHTML =
        "<strong>Current Format :-</strong> <br>" + res.data.result.savedFormat;
      setLoading(false);
    }
  };

  useEffect(() => {
    getFormat();
  }, []);

  return (
    <div style={{ padding: "3%" }}>
      <div
        style={{
          backgroundColor: "#f35d5e",
          color: "white",
          borderRadius: "5px",
          height: "9vh",
          display: "flex",
          paddingTop: "2.8%",
          paddingLeft: "2%",
        }}
      >
        {loading && (
          <Spinner radius={30} color={"#FFFFFF"} stroke={3} visible={true} />
        )}
        <h5
          style={{
            margin: "0",
            paddingTop: "1%",
            paddingLeft: "5%",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Edit Format
        </h5>
      </div>
      <form className="ef__loginform" onSubmit={submitHandler}>
        <div id="ef__cf"></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <table>
            <tbody>
              <tr>
                <td
                  style={{
                    paddingTop: "15px",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <label>Enter Paragraph:</label>
                </td>
                <td style={{ width: "400px" }}>
                  <TextareaAutosize
                    name="savedFormat"
                    minRows={1}
                    maxRows={15}
                    value={editFormat}
                    style={{
                      width: 350,
                      border: "none",
                      borderBottom: "1px solid",
                    }}
                    onChange={(e) => setEditFormat(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                    paddingLeft: "30%",
                  }}
                >
                  <button
                    id="ef__btn1"
                    type="submit"
                    style={{ height: "8vh", marginTop: "4%" }}
                  >
                    Edit Format
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

export default EditFormat;
