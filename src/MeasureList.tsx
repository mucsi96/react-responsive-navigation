import React, {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useMemo
} from "react";
import { createPortal } from "react-dom";

interface IMeasureListProps {
  onMeasurement: (dimensions: number[]) => void;
  children: ({ ref }: { ref: React.RefObject<HTMLElement> }) => React.ReactNode;
}

export const MeasureList: React.FC<IMeasureListProps> = ({
  children,
  onMeasurement
}) => {
  const ref = useRef<HTMLElement>(null);
  const offscreenContainer = useMemo(() => {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.left = "-9999px";
    return element;
  }, []);
  const portalRef = useRef(offscreenContainer);
  const [dimensions, setDimensions] = useState<number[]>([]);

  useEffect(() => {
    const element = portalRef.current;
    document.body.appendChild(element);
    return () => element.remove();
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const newDimensions = Array.prototype.map.call(
      element.children,
      (child: HTMLElement) => child.getBoundingClientRect().width
    ) as number[];
    if (
      newDimensions.some((newWidth, index) => newWidth !== dimensions[index])
    ) {
      setDimensions(newDimensions);
      onMeasurement(newDimensions);
    }
  }, [children, onMeasurement, dimensions]);

  return createPortal(children({ ref }), portalRef.current);
};
