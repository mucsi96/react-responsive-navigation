import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useOffscreenRef } from "./useOffscreenRef";

interface IMeasureListProps {
  onMeasurement: (dimensions: number[]) => void;
}

export const MeasureList: React.FC<IMeasureListProps> = ({
  children,
  onMeasurement
}) => {
  const ref = useOffscreenRef();
  const [dimensions, setDimensions] = useState<number[]>([]);

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
  }, [children, ref, onMeasurement, dimensions]);

  return createPortal(children, ref.current);
};
