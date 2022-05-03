import { Route, Routes } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { Alert } from "@mui/material";
import Landing from "./Pages/Landing/Landing";
import Checkout from "./Pages/Checkout/Checkout";

const App = (props) => {
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [warningAlert, setWarningAlert] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [warningMsg, setWarningMsg] = useState("");

  const success = (msg) => {
    setSuccessAlert(true);
    setSuccessMsg(msg);
  };
  const error = (msg) => {
    setErrorAlert(true);
    setErrorMsg(msg);
  };
  const warning = (msg) => {
    setWarningAlert(true);
    setWarningMsg(msg);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Landing
              success={(msg) => success(msg)}
              error={(msg) => error(msg)}
              warning={(msg) => warning(msg)}
            />
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <Checkout
              success={(msg) => success(msg)}
              error={(msg) => error(msg)}
              warning={(msg) => warning(msg)}
            />
          }
        />
      </Routes>
      <Snackbar
        open={errorAlert}
        autoHideDuration={6000}
        onClose={() => setErrorAlert(false)}
      >
        <Alert
          onClose={() => setErrorAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={() => setSuccessAlert(false)}
      >
        <Alert
          onClose={() => setSuccessAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={warningAlert}
        autoHideDuration={6000}
        onClose={() => setWarningAlert(false)}
      >
        <Alert
          onClose={() => setWarningAlert(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {warningMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
