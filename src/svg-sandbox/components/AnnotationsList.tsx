import { useMemo } from "react";
import { SvgGroup } from "./SvgGroup";
import { Point } from "../../common/types";
import { subtractPoints } from "../utilities/point";
import { Box } from "../../common/utilities/box";

export type AnnotationProps = { value: string; x: number; y: number; };
type AnnotationsProps = {
  annotations: AnnotationProps[];
  box: Box;
  position: Point;
};
/**
 * 
 * @param props: 
 * @returns EmotionJSX.Element
 */
export const SvgAnnotationsList = ({
  annotations,
  box,
  position,
}: AnnotationsProps) => {
  const {
    annotationPositionOffset,
    fontSize,
    fontSizeAttr,
    itemHeight,
  } = useMemo(() => {
    const itemHeight = box.height / annotations.length;
    const fontSize = itemHeight * 0.6;
    const fontSizeAttr = `${fontSize}px`;
    const annotationPositionOffset = subtractPoints([position, box]);

    return {
      annotationPositionOffset,
      fontSize,
      fontSizeAttr,
      itemHeight,
    };
  }, [annotations.length, box, position]);

  return <SvgGroup x={box.x} y={box.y}>
    {annotations.map(({ value, x, y }, idx) => {
      const x1 = 30;
      const yi = idx * itemHeight;
      const y1 = yi + (itemHeight / 2);
      const x2 = x + annotationPositionOffset.x;
      const y2 = y + annotationPositionOffset.y;
      const textX = x1 + 3;
      const textY = yi + fontSize;

      return <g key={idx}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
        <text
          x={textX}
          y={textY}
          fontSize={fontSizeAttr}
          fontWeight='normal'
          fill="black"
        >
          {value}
        </text>
      </g>;
    })}
  </SvgGroup>;
};
