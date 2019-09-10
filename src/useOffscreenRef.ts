import { useMemo, useRef, useEffect } from "react";

export function useOffscreenRef() {
  const offscreenContainer = useMemo(() => {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.left = "-9999px";
    return element;
  }, []);
  const ref = useRef(offscreenContainer);

  useEffect(() => {
    const element = ref.current;
    document.body.appendChild(element);
    return () => element.remove();
  }, []);

  return ref;
}
