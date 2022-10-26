import "./ConfirmDialog.css";

import Button from "@mui/material/Button";

const ConfirmDialog = (props) => {
  const handleDismiss = () => {
    props.onResponse(false);
  };
  const handleConfirm = () => {
    props.onResponse(true);
  };
  return (
    <div className="comp">
      <h4 style={{ fontFamily: "Poppins, sans-serif" }}>{props.title}</h4>
      <hr />
      <div className="alert alert-warning" role="alert">
        Delete Action cannot be reversed !
      </div>
      <div>
        <p>{props.message}</p>
      </div>

      <div style={{ float: "right" }}>
        <Button
          variant="outlined"
          style={{ marginRight: "6px" }}
          onClick={handleDismiss}
        >
          No
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          Yes
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
