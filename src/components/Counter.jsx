import React, { memo } from "react";

export const Counter = ({ count }) => {
  console.log("Counter re-rendered");

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #4CAF50",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "48px" }}>{count}</h1>
    </div>
  );
};
