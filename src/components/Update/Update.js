import "./Update.css";

const Update = () => {
  return (
    <>
      <div>
        <mat-toolbar
          style={{
            backgroundColor: "#63B967",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <mat-spinner className="custom-spinner" diameter="30"></mat-spinner>
          <h5 style={{ marginLeft: "2%", fontFamily: "Poppins, sans-serif" }}>
            Modify User
          </h5>
        </mat-toolbar>
        <div className="alert alert-danger" style={{ marginTop: "2%" }}>
          {/* Error {cond} User! Check Your Connection and Try Again! */}
        </div>
        <form className="login-form">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>Name:</label>
                </td>
                <td style={{ width: "100px" }}>
                  <mat-form-field>
                    <input name="name" formControlName="name" required />
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>Mobile No:</label>
                </td>
                <td>
                  <mat-form-field>
                    <input name="mobile" formControlName="mobile" required />
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>Email:</label>
                </td>
                <td>
                  <mat-form-field>
                    <input name="email" formControlName="email" required />
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>Role:</label>
                </td>
                <td>
                  <mat-form-field>
                    <mat-select
                      name="privelage"
                      formControlName="privilege"
                      required
                    >
                      {/* <mat-option>{privelage.viewValue}</mat-option> */}
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>

              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>Department:</label>
                </td>
                <td>
                  <mat-form-field>
                    <mat-select
                      name="department"
                      formControlName="dept"
                      required
                    >
                      {/* <mat-option>{department.viewValue}</mat-option> */}
                    </mat-select>
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  style={{
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                    paddingLeft: "15%",
                  }}
                >
                  {" "}
                  <button id="btn1" type="submit">
                    Update
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="2" style={{ textAlign: "center" }}>
                  <a
                    className="text-primary"
                    style={{
                      cursor: "pointer",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Change/ Forgot Password
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </form>
      </div>

      <div>
        <mat-toolbar
          style={{
            backgroundColor: "#63B967",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ marginLeft: "2%" }}>Change Password</h2>
          <button mat-icon-button id="btn3">
            <i className="fas fa-arrow-circle-left"></i>
          </button>
        </mat-toolbar>
        <form className="login-form">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <table>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>Old Password:</label>
                </td>
                <td>
                  <mat-form-field>
                    <input
                      type="password"
                      name="pasword"
                      formControlName="oldPassword"
                      required
                    />
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>Mobile No:</label>
                </td>
                <td>
                  <mat-form-field>
                    <input name="mobile" formControlName="mobile" required />
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>New Password:</label>
                </td>
                <td>
                  <mat-form-field>
                    <input
                      matInput
                      type="password"
                      name="newPassword"
                      formControlName="newPassword"
                      required
                    />
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "15px" }}>
                  <label>Re-Enter New Password:</label>
                </td>
                <td>
                  <mat-form-field>
                    <input
                      type="password"
                      name="pswd2"
                      formControlName="pswd2"
                      required
                    />
                  </mat-form-field>
                </td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  style={{
                    justifyContent: "center",
                    justifyItems: "center",
                    alignItems: "center",
                    paddingLeft: "19%",
                  }}
                >
                  {" "}
                  <button type="submit" id="btn2">
                    Change Password
                  </button>
                  <button
                    type="btn"
                    id="btn2"
                    style={{
                      paddingLeft: "29%",
                      paddingTop: "9px",
                      paddingBottom: "9px",
                    }}
                  >
                    <mat-spinner
                      className="custom-spinner"
                      diameter="30"
                    ></mat-spinner>
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="2" style={{ textAlign: "center" }}>
                  <a className="text-primary" style={{ cursor: "pointer" }}>
                    Forgot Password
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
