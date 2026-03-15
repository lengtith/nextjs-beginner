"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Counter } from "./Counter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Parent = () => {
  const [number, setNumber] = useState(1);

  useEffect(() => {
    document.title = `Count ${number}`;
  }, [number]);

  const handleIncrease = useCallback(() => {
    setNumber((prev) => prev + 1);
  }, []);

  const handleDecrease = useCallback(() => {
    if (number > 0) {
      setNumber((prev) => prev - 1);
    }
  }, []);

  const numberSquare = useMemo(() => {
    return number * number;
  }, [number]);

  const numberRootSquare = () => {
    return Math.sqrt(number);
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
      <Button onClick={handleIncrease}>Increase</Button>
      <Button onClick={handleDecrease}>Decrease</Button>
      <Input type="sl mg" />

      <div>
        <h1>
          Square of {number} is {numberSquare}
        </h1>
        <h2>
          Rootsquare of {number} is {numberRootSquare()}
        </h2>
      </div>
    </div>
  );
};

export default Parent;
