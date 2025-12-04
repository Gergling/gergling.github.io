import { useTheme } from "@gergling/ui-components";
import { SVGAttributes, useMemo } from "react";
import { SvgGroup } from "./SvgGroup";
import { SeriesLegend } from "../hooks/use-chart";

type LegendProps = Pick<SVGAttributes<SVGRectElement>, 'x' | 'y' | 'width' | 'height'> & {
  series: SeriesLegend[];
};

export const SvgChartLegend = ({
  series,
  x,
  y,
  height,
}: LegendProps) => {
  // We're going to assume x is the left and x + width is the right.
  const {
    itemHeight,
    itemSwatchSize,
    textX,
    textYOffset,
  } = useMemo(
    () => {
      const heightNumber = height as number;
      const itemHeight = heightNumber / series.length;
      const itemSwatchSize = itemHeight * 0.9;
      const fontSize = itemSwatchSize;
      const textX = itemSwatchSize + 3;
      const textYOffset = fontSize * 0.75;

      const fontSizeAttr = `${fontSize}px`;
      return {
        fontSize,
        fontSizeAttr,
        itemHeight,
        itemSwatchSize,
        textX,
        textYOffset,
      };
    },
    [height, series.length]
  );
  const { theme: { palette: { text } } } = useTheme();
  return <SvgGroup x={x} y={y}>
    {series.map(({ name, colour }, idx) => {
      const y = idx * itemHeight;
      const textY = y + (textYOffset / name.length);

      return <g key={idx}>
        <rect x={0} y={y} width={itemSwatchSize} height={itemSwatchSize} fill={colour} />
        <text
          x={textX}
          y={textY}
          fontSize='0.5rem'
          fontWeight='normal'
          fill={text.primary}
        >
          {name.map((text, key) => <tspan key={key} x={textX} dy={key * 10}>{text}</tspan>)}
        </text>
      </g>;
    })}
  </SvgGroup>;
};
