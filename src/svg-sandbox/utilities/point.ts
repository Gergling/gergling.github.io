export const mapSymmetry = ([x, y]: number[]) => [-x, y];
export const mapSymmetryHorizontal = ([x, y]: number[]) => [x, -y];

export const mapScale = ([x, y]: number[], scale: number | number[]) => {
  if (typeof scale === 'number') return [x * scale, y * scale];
  return [x * scale[0], y * scale[1]];
};

export const getSize = ([width, height]: number[]) => {
  return {
    width,
    height,
    halfWidth: width / 2,
  };
};
