import { useEffect, useState, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

export function useWidth(): [React.RefObject<HTMLElement>, number] {
  const ref = useRef<HTMLElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, []);

  return [ref, width];
}
