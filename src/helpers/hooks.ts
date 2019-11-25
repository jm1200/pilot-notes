import { useEffect, useRef } from "react";

const noop = () => {};

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(noop);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}
