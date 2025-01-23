import React from "react";

const ToolTipText = ({ text1, text2 }) => {
  return (
    <div
      style={{
        background: "rgb(48 147 58)",
        borderRadius: "8px",
        width: "fit-content",
      }}
    >
      <span style={{ color: "#FFF", fontSize: "16px" }}>{text1}</span>
      <div>
        <span style={{ color: "#FFF", fontSize: "16px" }}>{text2}</span>
      </div>
    </div>
  );
};

export default ToolTipText;
