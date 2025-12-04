const mapStopAttrs = ({
  offset,
  stopColor
}: {
  offset: number,
  stopColor: string
}) => ({
  offset: `${offset}%`,
  style: {
    stopColor,
    stopOpacity: 1,
  },
});

export const SVG_COLORS = {
  gold100: '#8B6A02',
  gold150: '#CCAC00',
  gold200: '#FFD700',
  gold250: '#EAD994',
  gold300: '#FFFFD0',
};

export const SVG_COLORS_GOLD = [
  SVG_COLORS.gold100,
  SVG_COLORS.gold200,
  SVG_COLORS.gold300,
];
export const SVG_GRADIENT_GOLD_LINEAR = [
  { offset: 0, stopColor: SVG_COLORS_GOLD[0] },
  // { offset: 0, stopColor: SVG_COLORS_GOLD[1] },
  // { offset: 15, stopColor: SVG_COLORS_GOLD[1] },
  { offset: 30, stopColor: SVG_COLORS_GOLD[1] },
  // { offset: 30, stopColor: SVG_COLORS_GOLD[2] },
  // { offset: 45, stopColor: SVG_COLORS_GOLD[1] },
  { offset: 100, stopColor: SVG_COLORS_GOLD[0] },
].map(mapStopAttrs);
export const SVG_GRADIENT_GOLD_RADIAL = [
  { offset: 0, stopColor: SVG_COLORS_GOLD[1] },
  { offset: 100, stopColor: SVG_COLORS_GOLD[0] },
  // { offset: 35, stopColor: SVG_COLORS_GOLD[1] },
  // { offset: 100, stopColor: SVG_COLORS_GOLD[0] },
].map(mapStopAttrs);
