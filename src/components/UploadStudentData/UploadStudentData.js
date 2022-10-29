import "./UploadStudentData.css";

import Spinner from "react-spinner-material";
import axios from "axios";
import { toast } from "react-toastify";
import uploadFormat from "../../assets/uploadformat.PNG";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UploadStudentData = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [disableUpload, setDisableUpload] = useState(true);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setDisableUpload(event === null || "" ? true : false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("student", selectedFile, selectedFile.name);
    const uploadStudentData = async (fd) => {
      const res = await axios
        .post(
          "https://akgec-late-entry.herokuapp.com/api/admin/student/upload",
          fd
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
            toast.error("Error Adding Data!", {
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
        toast.success("Student Data Added Succesfully!", {
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
        props.onUploadStudentData(true);
      }
    };
    uploadStudentData(fd);
  };
  return (
    <div style={{ padding: "4%" }}>
      <div
        style={{
          backgroundColor: "#6586C9",
          color: "white",
          borderRadius: "5px",
          height: "65px",
          paddingTop: "23px",
        }}
      >
        {loading && (
          <Spinner radius={30} color={"#FFFFFF"} stroke={3} visible={true} />
        )}
        {!loading && (
          <h5
            style={{
              marginLeft: "2%",
              fontFamily: "Poppins, sans-serif",
              marginTop: "0",
            }}
          >
            Upload Student Data File
          </h5>
        )}
        {loading && (
          <h5
            style={{
              marginLeft: "9%",
              fontFamily: "Poppins, sans-serif",
              marginTop: "-26px",
            }}
          >
            Uploading Student Data File
          </h5>
        )}
      </div>
      <div className="image-template">
        <h5
          style={{
            paddingLeft: "3px",
            marginBottom: "2px",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            margin: "7px 0",
          }}
        >
          File Template
        </h5>
        <img
          src={uploadFormat}
          style={{
            width: "548px",
            height: "142px",
            borderRadius: "0px 0px 5px 5px",
          }}
          alt=""
        />
      </div>
      <div className="alert alert-warning" style={{ marginTop: "2%" }}>
        Only .csv files are accepted !!
      </div>
      <form onSubmit={submitHandler}>
        <table style={{ marginTop: "5px", marginLeft: "185px" }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="file"
                  placeholder="Upload File"
                  style={{ outline: "none" }}
                  name="student"
                  accept=".csv"
                  onChange={changeHandler}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0" }}>
                <button
                  type="submit"
                  id="btn2"
                  style={{
                    backgroundColor: "#6586C9",
                    height: "36px",
                    width: "43%",
                  }}
                  disabled={disableUpload}
                >
                  Upload
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default UploadStudentData;
