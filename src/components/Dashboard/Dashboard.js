import "./Dashboard.css";

import { useEffect, useState } from "react";

import Api from "../../Api";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [arr, setArr] = useState({
    users: null,
    student: null,
    entry: null,
  });
  // var users = 1;
  // var student = 1;
  // var entry = 1;

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("token")) {
        try {
          await axios.get(Api.dash).then(function (res) {
            setArr({
              ...arr,
              users: res.data.msg.user,
              student: res.data.msg.student,
              entry: res.data.msg.entry,
            });
            console.log(res.data.msg);
            console.log(arr);
          });
        } catch (error) {
          if (error.status === 403) {
            console.log("invalid-token");
            localStorage.removeItem("token");
            localStorage.removeItem("results");
            navigate("/");
          }
        }
      }
    }
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <h4
            style={{
              color: "gray",
              marginTop: "4%",
              marginLeft: "5%",
              fontSize: "32px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
            }}
          >
            Dashboard
          </h4>
        </div>
      </div>

      <div className="container" style={{ marginTop: "4%" }}>
        <div className="row" id="content">
          <div
            className="col-md-4 col-sm-4 col-xs-4"
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
          >
            <MatCard
              className="login-card"
              onClick={() => navigate("/dashboard/manage-users")}
            >
              <MatCardHeader id="h2">
                <i
                  className="fa fa-users"
                  style={{
                    fontSize: "46px",
                    position: "absolute",
                    paddingLeft: "14%",
                    paddingRight: "16%",
                    paddingTop: "10px",
                    color: "white",
                  }}
                ></i>
              </MatCardHeader>
              <MatCardContent>
                <div
                  style={{
                    position: "relative",
                    float: "right",
                    marginTop: "-30px",
                    color: "grey",
                  }}
                >
                  <h4>USERS</h4>
                </div>
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    marginRight: "2%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "xx-large",
                      paddingTop: "50px",
                      textAlign: "right",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {arr.users}
                  </p>
                </div>
              </MatCardContent>
            </MatCard>
          </div>
          <div
            className="col-md-4 col-sm-4 col-xs-4"
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
          >
            <MatCard
              className="login-card"
              onClick={() => navigate("/dashboard/manage-student")}
            >
              <MatCardHeader id="h3">
                <i
                  className="fas fa-user-graduate"
                  style={{
                    position: "absolute",
                    fontSize: "46px",
                    paddingLeft: "24%",
                    paddingTop: "10px",
                    color: "white",
                  }}
                ></i>
              </MatCardHeader>
              <MatCardContent>
                <div
                  style={{
                    position: "relative",
                    float: "right",
                    marginTop: "-30px",
                    color: "grey",
                  }}
                >
                  <h4>STUDENTS</h4>
                </div>
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    marginRight: "2%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "xx-large",
                      paddingTop: "50px",
                      textAlign: "right",
                    }}
                  >
                    {arr.student}
                  </p>
                </div>
              </MatCardContent>
            </MatCard>
          </div>
          <div
            className="col-md-4 col-sm-4 col-xs-4"
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
          >
            <MatCard
              className="login-card"
              onClick={() => navigate("/dashboard/manage-entry")}
            >
              <MatCardHeader id="h4">
                <i
                  className="fas fa-user-plus"
                  style={{
                    fontSize: "46px",
                    position: "absolute",
                    paddingLeft: "14%",
                    paddingTop: "10px",
                    color: "white",
                  }}
                ></i>
              </MatCardHeader>
              <MatCardContent>
                <div
                  style={{
                    position: "relative",
                    float: "right",
                    marginTop: "-30px",
                    color: "grey",
                  }}
                >
                  <h4>ENTRY</h4>
                </div>
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    marginRight: "2%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "xx-large",
                      paddingTop: "50px",
                      textAlign: "right",
                    }}
                  >
                    {arr.entry}
                  </p>
                </div>
              </MatCardContent>
            </MatCard>
          </div>
        </div>
      </div>
    </>
  );
};

const MatCard = styled.div`
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
  position: relative;
  padding: 16px;
  border-radius: 4px;
`;

const MatCardContent = styled.div`
  font-size: 14px;
`;
const MatCardHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Dashboard;