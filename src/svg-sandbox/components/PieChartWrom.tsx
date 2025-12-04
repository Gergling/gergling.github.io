import { SvgGroup } from "./SvgGroup";
import { SvgGuidelines } from "./SvgGuidelines";
import { SvgAnnotationsList } from "./AnnotationsList";
import { createSvgGuides } from "../utilities/guides";
import { PieChart } from "./PieChart";
import { SvgChartLegend } from "./ChartLegend";
import { useSvgChart } from "../hooks/use-chart";

const guides = createSvgGuides();
const margin = 10;
// TODO: I don't like this.
// I think I want everything to go in as a callback based on things like the selected preset
// ... but then maybe I shouldn't be using that feature... IDK.
// If I register when a breakpoint is *used*, I can display all possible widths of an SVG image.
// All guides will need to be passed in as callbacks.
guides.add('marginXs', ({ presets: { viewBox: { xs } } }) => ({
  x: xs.x + margin, y: xs.y + margin,
  width: xs.width - (margin * 2), height: xs.height - (margin * 2)
}));
guides.add('chartBox', ({ presets: { viewPointCenter } }) => ({
  x: viewPointCenter.x - 80, y: 20, width: 80, height: 80
}));
guides.add('annotationsBox', ({ boxes: { chartBox: { value: {
  height, width, x, y
} } } }) => ({
  width: 100 - x - width, height,
  x: x + width, y
}));
guides.add('legendBox', ({ get, presets: { viewPointCenter } }) => {
  const chartBox = get('chartBox');
  const x = viewPointCenter.x + 10 - 100;
  const y = chartBox.y + chartBox.height + 20; // Spacing under chart should be 20
  const height = 200 - y - 10;
  return {
    x, // The margin should be 10.
    y,
    width: 180, // The whole thing without margins
    height,
  };
});

const mapData = ([value, name]: (string[] | number)[]) => ({
  value: value as number,
  name: name as string[],
});
const data = [
  [0.43, ['"Even when low-hanging fruit is available,','people will be entertained by a potato."']],
  [0.38, ['"No potatoes or astrology, all you ever want','to talk about is potatoes and astrology."']],
  [0.19, ['"Why are you calling me at 3am about this?"']],
].map(mapData);

export const PieChartWrom = () => {
  const { annotations, legend } = useSvgChart(guides.get('chartBox'), data);

  return (
    <>
      <svg width="100%" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
        <SvgGroup x={0} y={0}>
          {/* <rect {...guides.presets.viewBox.lg} fill="white" /> */}
          <PieChart box={guides.get('chartBox')} data={data} />
          <SvgAnnotationsList
            annotations={annotations}
            box={guides.get('annotationsBox')}
            position={guides.get('chartBox').center}
          />
          <SvgChartLegend series={legend} {...guides.get('legendBox')} />
        </SvgGroup>
        <SvgGuidelines guides={guides} options={{ suppressGuides: true }} />
      </svg>
      {/* <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="white" />
        <circle r="5" cx="10" cy="10" fill="transparent"
          stroke="tomato"
          stroke-width="10"
          stroke-dasharray="calc(35 * 31.4 / 100) 31.4"
          transform="rotate(-90) translate(-20)" />
      </svg> */}

    </>
  );
};
