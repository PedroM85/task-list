import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity?: "error" | "success" | "info" | "warning";
  onClose: () => void;
  autoHideDuration?: number;
}

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  message,
  severity = "error",
  onClose,
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
