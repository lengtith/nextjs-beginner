"use client";

import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  function onIncrement() {
    setCount(count + 1);
  }

  const onDecrement = () => {
    setCount(count - 1);
  };

  const Reset = () => setCount(0);

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-6">
      <h1>Counter Page</h1>
      <p>Count:{count}</p>
      <button
        className="w-20 bg-black rounded-lg px-3 py-2 text-white"
        onClick={onDecrement}
      >
        -
      </button>
      <button onClick={onIncrement}>+</button>
      <button onClick={Reset}>Reset</button>
    </div>
  );
}
