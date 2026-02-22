"use client";

import React, { useEffect, useState } from "react";
import { Counter } from "./Counter";
// import { Counter } from "./Counter";

const Parent = () => {
  const [number, setNumber] = useState(1);

  useEffect(() => {
    document.title = `Count ${number}`;
  }, [number]);

  const handleIncrease = () => {
    setNumber((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (number > 0) {
      setNumber((prev) => prev - 1);
    }
  };

  console.log("Parent re-rendered");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Counter count={number} />
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
    </div>
  );
};

export default Parent;
