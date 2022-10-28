import "./UpdateStudentData.css";

import Spinner from "react-spinner-material";
import uploadFormat from "../../assets/uploadformat.PNG";
import { useState } from "react";

const UpdateStudentData = () => {
  const [loading, setLoading] = useState(false);
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
              marginLeft: "2%",
              fontFamily: "Poppins, sans-serif",
              marginTop: "0",
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
      <form>
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

export default UpdateStudentData;
