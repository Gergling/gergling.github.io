import { Breakpoint } from "@mui/material";
import { Point, Size } from "../../common/types";
import { Box } from "../../common/utilities/box";

type GuideDataOptions = Box | Point | Size | Point & Size;
type SvgGuideBaseData<T extends GuideDataOptions> = {
  name: string;
  color: string;
  value: T;
};
type SvgGuideBaseMapping<T extends GuideDataOptions> = {
  [K: string]: SvgGuideBaseData<T>;
};

type MappingBase = {
  boxes: SvgGuideBaseMapping<Box>;
  points: SvgGuideBaseMapping<Point>;
  sizes: SvgGuideBaseMapping<Size>;
};

type SvgGuideCallback = (props: MappingBase & { get: (name: string) => Box, presets: DefaultPresets }) => GuideDataOptions;

const getPointPathD = ({ x, y, width, height }: Box): string => [
  // Horizontal Line
  `M ${0},${y}`,
  `L ${width},${y}`,

  // Vertical Line
  `M ${x},${0}`,
  `L ${x},${height}`,

  // Circle
  `M ${x},${y}`,
  `a 1,1 0 1,0 -1,-1`,
  `a 1,1 0 1,0 1,1`,
].join(' ');
const getBoxPathD = ({ x, y, width, height }: Box): string => [
  // Top Horizontal Line
  `M ${x},${y}`,
  `L ${x + width},${y}`,
  
  // Bottom Horizontal Line
  `M ${x},${y + height}`,
  `L ${x + width},${y + height}`,

  // Left Vertical Line
  `M ${x},${y}`,
  `L ${x},${y + height}`,
  
  // Right Vertical Line
  `M ${x + width},${y}`,
  `L ${x + width},${y + height}`,
].join(' ');

type AvailableBreakpointKey = Exclude<Breakpoint, 'xl'>;
type DerivedBoxKey = Exclude<AvailableBreakpointKey, 'lg'>;
const derivedBoxKeys: DerivedBoxKey[] = ['xs', 'sm', 'md'];
type DefaultPresets = {
  viewBox: {
    [K in AvailableBreakpointKey]: Box;
  };
  viewPointCenter: Point;
};
const viewBoxLg = Box.from({ x: 0, y: 0, width: 800, height: 200 });
const viewPointCenter = { x: viewBoxLg.center.x, y: viewBoxLg.center.y };
const defaultPresets: DefaultPresets = {
  viewBox: derivedBoxKeys.reduce<DefaultPresets['viewBox']>((acc, name, idx) => {
    const width = (idx + 1) * 200;
    const height = acc.lg.height;
    const x = viewPointCenter.x - (width / 2);
    const y = 0;
    const box = Box.from({ width, height, x, y });
    return {
      ...acc,
      [name]: box,
    };
  }, { lg: viewBoxLg } as DefaultPresets['viewBox']),
  viewPointCenter,
};
console.log(defaultPresets)

export const createSvgGuides = () => {
  const presets = defaultPresets;
  const boxes: MappingBase['boxes'] = {};
  const points: MappingBase['points'] = {};
  const sizes: MappingBase['sizes'] = {};
  const getDataQuantity = () => Object.keys(boxes).length + Object.keys(points).length + Object.keys(sizes).length;
  const getArbitraryNumber = (n: number) => n * 23;
  const register = <T extends GuideDataOptions>(name: string, color: string, value: T) => {
    const hasPoint = 'x' in value && 'y' in value;
    const hasSize = 'width' in value && 'height' in value;
    const data: SvgGuideBaseData<T> = { name, color, value };

    if (hasPoint) {
      if (hasSize) {
        boxes[name] = { ...data, value: Box.from(value) };
      } else {
        points[name] = { ...data, value };
      }
    } else {
      sizes[name] = { ...data, value };
    }

  };
  const add = (name: string, value: number | GuideDataOptions | SvgGuideCallback, y?: number): void => {
    // Handles value and y as x and y for a point object.
    if (y !== undefined) {
      if (typeof value === 'number') return add(name, { x: value, y });
      throw new Error(`Error for guide '${name}': If y parameter is specified, value must be a number.`);
    }

    // Should only specify a number if y is defined.
    if (typeof value === 'number') throw new Error(`Error for guide '${name}': If no y parameter is specified, value cannot be a number.`);

    if (typeof value === 'function') return add(name, value({ get, boxes, points, presets, sizes }));

    const lastIdx = getDataQuantity();
    const hue = getArbitraryNumber(lastIdx) % 360;
    const color = `hsl(${hue}, 100%, 30%)`;
    register(name, color, value);
    console.log(`Registered guide for %c${name}.`, `background-color: hsl(${hue}, 100%, 90%); color: ${color};`);
  };
  const get = (name: string): Box => {
    if (boxes[name]) return boxes[name].value;
    if (points[name]) return Box.from({ width: 0, height: 0, ...points[name].value });
    if (sizes[name]) return Box.from({ x: 0, y: 0, ...sizes[name].value });
    throw new Error(`No guide data for '${name}'.`);
  };
  const render = (breakpoint: AvailableBreakpointKey) => {
    const { width: oWidth, height: oHeight } = presets.viewBox[breakpoint];
    const breakpointsPaths = Object.entries(presets.viewBox).reduce<{
      d: string;
      stroke: string;
    }[]>((acc, [_, { height, width, x }]) => {
      const d = [
        `M ${x},${0}`,
        `L ${x},${height}`,
        `M ${x + width},${0}`,
        `L ${x + width},${height}`,
      ].join(' ');
      return [...acc, { d, stroke: 'rgba(0, 0, 0, 0.1)' }];
    }, []);
    const pointsPaths = Object.entries(points).reduce<{
      d: string;
      stroke: string;
    }[]>((acc, [_, { color, value }]) => {
      // Width and height won't be used here, and will likely be 0.
      // Two lines and a circle.
      const d = getPointPathD(Box.from({ ...value, width: oWidth, height: oHeight }));
      return [...acc, { d, stroke: color }];
    }, []);
    const boxesPaths = Object.entries(boxes).reduce<{
      d: string;
      stroke: string;
    }[]>((acc, [_, { color, value }]) => {
      // Width and height won't be used here, and will likely be 0.
      // Two lines and a circle.
      const d = getBoxPathD(value);
      return [...acc, { d, stroke: color }];
    }, []);
    return [...breakpointsPaths, ...pointsPaths, ...boxesPaths];
  };
  return {
    add,
    get,
    presets,
    render,
  };
};
