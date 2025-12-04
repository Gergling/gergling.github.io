import { Point, Size } from "../../common/types";

export const mapSymmetry = ([x, y]: number[]) => [-x, y];
export const mapSymmetryHorizontal = ([x, y]: number[]) => [x, -y];

export const mapScale = ([x, y]: number[], scale: number | number[]) => {
  if (typeof scale === 'number') return [x * scale, y * scale];
  return [x * scale[0], y * scale[1]];
};

const getPoint = (pointOrSize: Point | Size): Point => 'x' in pointOrSize && 'y' in pointOrSize
  ? pointOrSize
  : ({ x: pointOrSize.width, y: pointOrSize.height });

export const addPoints = (points: Point[]) => points.reduce<Point>((acc, { x, y }) => ({
  x: acc.x + x,
  y: acc.y + y,
}), { x: 0, y: 0 });
export const subtractPoints = ([initial, ...points]: (Point | Size)[]) => points.reduce<Point>(
  (acc, pointOrSize) => {
    const { x, y } = 'x' in pointOrSize && 'y' in pointOrSize ? pointOrSize : getPoint(pointOrSize);
    return {
      x: acc.x - x,
      y: acc.y - y,
    }
  },
  getPoint(initial)
);

type ScaleProps = number | Point | Size;
export function scale (value: Size, scalar: ScaleProps): Size;
export function scale (value: Point, scalar: ScaleProps): Point;
export function scale (value: Point | Size, scalar: ScaleProps): Size | Point {
  if ('x' in value && 'y' in value) {
    if (typeof scalar === 'number') return scale(value, { x: scalar, y: scalar });
    if ('x' in scalar && 'y' in scalar) return { x: value.x * scalar.x, y: value.y * scalar.y };
    return scale(value, { x: scalar.width, y: scalar.height });
  }

  if (typeof scalar === 'number') return scale(value, { width: scalar, height: scalar });
  if ('x' in scalar && 'y' in scalar) return scale(value, { width: scalar.x, height: scalar.y });
  return { width: value.width * scalar.width, height: value.height * scalar.height };
};

/**
 * @deprecated
 * @param param0 
 * @returns 
 */
export const getSize = ([width, height]: number[]) => {
  return {
    width,
    height,
    halfWidth: width / 2,
    halfHeight: height / 2,
  };
};
