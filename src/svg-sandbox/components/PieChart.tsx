import { Box } from "../../common/utilities/box";
import { SvgGroup } from "./SvgGroup";
import { useSvgChart } from "../hooks/use-chart";

type PieChartProps = {
  box: Box;
  data: { value: number; name: string[]; }[];
};
export const PieChart = ({ box, data }: PieChartProps) => {
  const { pie: { fill, stroke } } = useSvgChart(box, data);

  return <SvgGroup {...box.center}>
    {fill.map((props, idx) => <path key={idx} fillRule="evenodd" {...props} />)}
    {stroke.map((props, idx) => <path key={idx} {...props} />)}
  </SvgGroup>;
};
