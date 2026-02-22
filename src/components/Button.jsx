import React, { memo } from "react";

export const Button = ({ onClick, disabled = false, children }) => {
  console.log(`Button "${children}" re-rendered`);

  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        margin: "5px",
        fontSize: "14px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
