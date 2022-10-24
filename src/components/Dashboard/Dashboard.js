import "./Dashboard.css";

const dashboard = () => {
  const users = 1,
    entry = 2,
    student = 3;
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
            <mat-card
              className="login-card"
              routerLink="/dashboard/manage-users"
            >
              <mat-card-header id="h2">
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
              </mat-card-header>
              <mat-card-content>
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
                    {users}
                  </p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
          <div
            className="col-md-4 col-sm-4 col-xs-4"
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
          >
            <mat-card
              className="login-card"
              routerLink="/dashboard/manage-student"
            >
              <mat-card-header id="h3">
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
              </mat-card-header>
              <mat-card-content>
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
                    {student}
                  </p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
          <div
            className="col-md-4 col-sm-4 col-xs-4"
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
          >
            <mat-card
              className="login-card"
              routerLink="/dashboard/manage-entry"
            >
              <mat-card-header id="h4">
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
              </mat-card-header>
              <mat-card-content>
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
                    {entry}
                  </p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
