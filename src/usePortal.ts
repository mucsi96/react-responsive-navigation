import { useEffect, useRef } from "react";

export function usePortal() {
  const ref = useRef(document.createElement("div"));

  useEffect(() => {
    const element = ref.current;
    document.body.appendChild(element);
    return () => element.remove();
  }, []);

  return ref.current;
}
