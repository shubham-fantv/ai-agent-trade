import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Box } from "@mui/material";

const styles = {
  root: {
    position: "fixed", // Make it fixed to cover the whole screen
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    // Semi-transparent background
    zIndex: 9999, // Ensure it's above all other elements
  },
  container: {
    textAlign: "center",
    color: "custom.white",
    "& p": {
      fontWeight: 600,
      fontSize: "24px",
    },
    "& span": {
      fontWeight: 400,
      fontSize: "16px",
      opacity: "0.5",
    },
  },
  activeCircular: {
    marginTop: "20px",
    color: "#CCFF00",
  },
};

export default function Loading({ label = "Please wait", text = "Loading", customStyles = {} }) {
  return (
    <Box sx={{ ...styles.root, ...customStyles }} className="backdrop-blur-sm">
      <Box sx={styles.container}>
        <Typography component="p">{label}</Typography>
        <Typography component="span">{text}</Typography>
        <Box>
          <CircularProgress sx={styles.activeCircular} />
        </Box>
      </Box>
    </Box>
  );
}
