"use client";

import { useCountStore } from "@/stores/countStore";

export default function CounterPage() {
  const { count, onIncrement, onDecrement, onReset } = useCountStore();


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
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
