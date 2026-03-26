import { useCounter } from "./useCounter";

import { renderHook, act } from "@testing-library/react";

describe("useCounter", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it ("should initialize with provided value", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it("should increment the count", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it("should decrement the count", () => {
    const { result } = renderHook(() => useCounter(2));
    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });

  it("should reset the count", () => {
    const { result } = renderHook(() => useCounter(5));
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });

});