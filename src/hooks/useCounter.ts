import { useState } from "react";

export const useCounter = (initValue : number = 0) => {
  const [count, setCount] = useState(initValue);

  const increment = () => setCount(pre => pre + 1);
  const decrement = () => setCount(pre => Math.max(0, pre - 1));
  const reset = () => setCount(initValue);

  return { count, increment, decrement, reset };
};