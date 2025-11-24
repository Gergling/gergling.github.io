import { SvgComponentProps } from "../types";
import { getSize, mapSymmetry } from "../utilities/point";
import { mapPolygons } from "../utilities/polygon";
import { SvgGroup } from "./SvgGroup";

export const MagicStaff: React.FC<
  SvgComponentProps<'metallicGoldVertical' | 'radialGold'>
> = ({ defs, x, y }) => {
  const orbRadius = 6;
  const orbLocation = [0, orbRadius];

  const rodSize = getSize([orbRadius * 0.75, 100]);
  const rodTopLeft = [-rodSize.halfWidth, orbRadius];
  const rodTopRight = mapSymmetry(rodTopLeft);
  const rodBottomLeft = [rodTopLeft[0], rodTopLeft[1] + rodSize.height];
  const rodBottomRight = mapSymmetry(rodBottomLeft);
  const rod = [
    rodTopLeft,
    rodTopRight,
    rodBottomRight,
    rodBottomLeft,
  ];
  // stone?
  return <SvgGroup x={x || 0} y={y || 0}>
    <polygon
      points={mapPolygons(rod)}
      fill={`url(#${defs.metallicGoldVertical})`}
    />
    <circle cx={orbLocation[0]} cy={orbLocation[1]} r={orbRadius} fill={`url(#${defs.radialGold})`} />
  </SvgGroup>;
};
