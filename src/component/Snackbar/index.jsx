import React, { memo, useCallback, useMemo } from "react";
import { Slide, Snackbar as MuiSnackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "@/src/context/SnackbarContext";

const SnackBar = memo(
  function SnackBar() {
    const { snackbar, closeSnackbar } = useSnackbar();

    const handleClose = useCallback(() => {
      closeSnackbar();
    }, [closeSnackbar]);

    const TransitionComponent = useMemo(() => {
      const Component = (props) => <Slide {...props} direction="left" />;
      Component.displayName = "TransitionComponent";
      return Component;
    }, []);

    return (
      <MuiSnackbar
        open={snackbar?.show}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionComponent}
      >
        <Alert elevation={6} variant="filled" severity={snackbar?.status} onClose={handleClose}>
          {snackbar?.message}
        </Alert>
      </MuiSnackbar>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.snackbar?.show === nextProps.snackbar?.show &&
      prevProps.snackbar?.status === nextProps.snackbar?.status &&
      prevProps.snackbar?.message === nextProps.snackbar?.message &&
      prevProps.closeSnackbar === nextProps.closeSnackbar
    );
  }
);

SnackBar.displayName = "SnackBar"; // Explicitly setting the display name

export default SnackBar;
