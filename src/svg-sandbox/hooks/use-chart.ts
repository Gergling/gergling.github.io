import { useMemo } from "react";
import { scale } from "../utilities/point";
import { useTheme } from "@gergling/ui-components";
import { Box } from "../../common/utilities/box";
import { Point, Size } from "../../common/types";
import { getTrig } from "../utilities/pie-chart";
import { AnnotationProps } from "../components/AnnotationsList";
import { arc } from "../utilities/path";

export type SeriesLegend = { name: string[]; colour: string; };

const getChartPoint = (value: number, radius: Size): Point => {
  const point = getTrig(value);
  return scale(point, radius);
};

const getArcRadius = ({ width: radiusX, height: radiusY }: Size) => ({ radiusX, radiusY });
const getArcTarget = ({ x: targetX, y: targetY }: Point) => ({ targetX, targetY });

const getSegment = (start: Point, end: Point, radius: Size) => {
  const largeArc = false;
  const sweep = false;
  return [
    `M ${start.x},${start.y}`,
    arc({ ...getArcRadius(radius), ...getArcTarget(end), largeArc, sweep }),
    `L 0,0`,
    `M 0,0`,
  ].join(' ');
};

export const useSvgChart = (box: Box, data: { value: number; name: string[]; }[]) => {
  const { theme: { colors: { primary: { main: primary } }, lighten } } = useTheme();
  const { fill, stroke, ...props } = useMemo(() => {
    const chartRadius = scale(box.size, 0.5);
    const halfChartRadius = scale(chartRadius, 0.5);
    const accumulativeValue = 0;
    const {
      annotations,
      legend,
      points,
      segments,
    } = data.reduce<{
      accumulativeValue: number;
      annotations: AnnotationProps[];
      legend: SeriesLegend[];
      points: Point[];
      segments: { d: string; fill: string; }[];
    }>(({
      accumulativeValue: previousAccumulativeValue,
      annotations,
      legend,
      points,
      segments,
    }, { name, value }, idx) => {
      const previousPoint = getChartPoint(previousAccumulativeValue, chartRadius);
      const segmentCentre = getChartPoint(previousAccumulativeValue + (value / 2), halfChartRadius); // TODO: Maybe should be halfChartRadius
      const accumulativeValue = previousAccumulativeValue + value;
      const currentPoint = getChartPoint(accumulativeValue, chartRadius);
      const d = getSegment(previousPoint, currentPoint, chartRadius);
      const colour = lighten(primary, 0.3 * idx);
      return {
        accumulativeValue,
        annotations: [...annotations, { value: `${value * 100}%`, ...segmentCentre }],
        legend: [...legend, { name, colour }],
        points: [...points, currentPoint],
        segments: [...segments, { d, fill: colour }],
      };
    }, {
      accumulativeValue,
      annotations: [],
      legend: [],
      points: [getChartPoint(accumulativeValue, chartRadius)],
      segments: [],
    });
    const divisions = points.map(point => ({ d: [
      `M ${point.x},${point.y}`,
      `L 0,0`,
      `L ${point.x},${point.y}`,
    ].join(' '), stroke: 'white' }));
    return { annotations, fill: segments, stroke: divisions, legend };
  }, [lighten, primary]);

  return {
    ...props,
    pie: {
      fill,
      stroke,
    },
  };
};