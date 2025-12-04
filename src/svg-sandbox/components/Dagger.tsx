import { SVG_COLORS } from "../constants";
import { SvgComponentProps } from "../types";
import { arc, getArcRadius, getArcTarget } from "../utilities/path";
import { getSize, mapSymmetry } from "../utilities/point";
import { mapPolygons } from "../utilities/polygon";
import { SvgGroup } from "./SvgGroup";

// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
export const Dagger: React.FC<
  Omit<SvgComponentProps<'metallicGold'>, 'color'>
> = ({ defs: { metallicGold }, x, y }) => {
  // Blade should be twice the length of the handle.
  // Guard can be 2 or 3 times handle width
  // Blade should not widen between base and point.
  // Ideally blade curves towards point. This requires arc radius of maybe blade width by 3-4 times handle.

  // Handle
  const handleSize = getSize([4, 24]);

  // Blade
  const bladeSize = getSize([6, handleSize.height * 2]);
  const bladePoint = [0, 0];
  const bladeBaseLeft = [-bladeSize.halfWidth, bladeSize.height];
  const bladeBaseRight = mapSymmetry(bladeBaseLeft);
  const bladeBaseCenter = [0, bladeSize.height];
  const bladeRadius = [bladeSize.width, handleSize.height * 3];
  const bladeOutline = [
    `M ${bladeBaseRight.join(',')}`,
    arc({ ...getArcRadius(bladeRadius), ...getArcTarget(bladePoint) }),
    arc({ ...getArcRadius(bladeRadius), ...getArcTarget(bladeBaseLeft) }),
  ];
  const bladeLeft = [
    `M ${bladePoint.join(',')}`,
    arc({ ...getArcRadius(bladeRadius), ...getArcTarget(bladeBaseLeft) }),
    `L ${bladeBaseCenter.join(',')}`,
  ];
  const bladeRight = [
    `M ${bladeBaseRight.join(',')}`,
    arc({ ...getArcRadius(bladeRadius), ...getArcTarget(bladePoint) }),
    `L ${bladeBaseCenter.join(',')}`,
  ];

  // Guard
  const guardSize = getSize([bladeSize.width * 2, 2]);
  const guardTopLeft = [-guardSize.halfWidth, bladeSize.height];
  const guardTopRight = mapSymmetry(guardTopLeft);
  const guardBottomLeft = [guardTopLeft[0], guardTopLeft[1] + guardSize.height];
  const guardBottomRight = mapSymmetry(guardBottomLeft);
  const guard = [
    guardTopLeft,
    guardTopRight,
    guardBottomRight,
    guardBottomLeft,
  ];

  // Handle
  const handleTopLeft = [-handleSize.halfWidth, bladeSize.height + guardSize.height];
  const handleTopRight = mapSymmetry(handleTopLeft);
  const handleBottomLeft = [handleTopLeft[0], handleTopLeft[1] + handleSize.height];
  const handleBottomRight = mapSymmetry(handleBottomLeft);
  const handleTotalSegments = 5;
  const handleSegmentDivisionHeight = 1;
  const handleSegmentSize = getSize([handleSize.width, Math.floor(handleSize.height / handleTotalSegments)]);
  const handleSegments = Array.from({ length: handleTotalSegments }).map((_, idx) => {
    const tl = [handleTopLeft[0], handleTopLeft[1] + ((idx + 1) * handleSegmentSize.height)];
    const tr = mapSymmetry(tl);
    const bl = [handleTopLeft[0], tl[1] + handleSegmentDivisionHeight];
    const br = mapSymmetry(bl);
    return [
      `M ${tl.join(',')}`,
      `L ${tr.join(',')}`,
      `L ${br.join(',')}`,
      `L ${bl.join(',')}`,
      `M ${tl.join(',')}`,
    ];
  });
  const handlePath = [
    `M ${handleTopLeft.join(',')}`,
    `L ${handleTopRight.join(',')}`,
    `L ${handleBottomRight.join(',')}`,
    `L ${handleBottomLeft.join(',')}`,
    // `M ${handleTopLeft.join(',')}`,
    ...handleSegments.flat(),
  ];

  return <SvgGroup x={x || 0} y={y || 0}>
    <path d={bladeOutline.join(' ')} stroke={`url(${metallicGold})`} />
    <path d={bladeLeft.join(' ')} fill={SVG_COLORS.gold250} fillRule="evenodd" />
    <path d={bladeRight.join(' ')} fill={SVG_COLORS.gold100} fillRule="evenodd" />
    <polygon
      points={mapPolygons(guard)}
      fill={SVG_COLORS.gold150}
    />
    <path d={handlePath.join(' ')} fill={SVG_COLORS.gold100} fillRule="evenodd" />
  </SvgGroup>;
};
