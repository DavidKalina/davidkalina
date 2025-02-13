import { useState, useEffect, RefObject } from "react";

export function useContainerDimensions(myRef: RefObject<HTMLElement>): {
  width: number;
  height: number;
} {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!myRef.current) return;

    const measure = () => {
      setDimensions({
        width: myRef.current!.offsetWidth,
        height: myRef.current!.offsetHeight,
      });
    };

    // Measure once on mount.
    measure();

    // Option 1: Use a ResizeObserver for more accurate measurements.
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(myRef.current);

    // Option 2: Fallback to window resize.
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [myRef]);

  return dimensions;
}
