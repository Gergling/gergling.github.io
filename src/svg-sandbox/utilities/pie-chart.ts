import { Point } from "../../common/types";

export const getTrig = (value: number): Point => {
  const radians = 2 * Math.PI * value;
  const x = Math.sin(radians);
  const y = Math.cos(radians);
  return { x, y };
};
