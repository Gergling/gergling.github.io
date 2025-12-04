import { useMemo } from "react";
import { SVG_COLORS } from "../constants";
import { SvgComponentProps } from "../types";
import { getSize, mapSymmetry } from "../utilities/point";
import { mapPolygons } from "../utilities/polygon";
import { SvgGroup } from "./SvgGroup";

type PolygonElementBase = React.SVGAttributes<SVGPolygonElement>;
type VariantBase = {
  left: PolygonElementBase;
  right: PolygonElementBase;
};

const variants = {
  default: {
    left: {
      fill: SVG_COLORS.gold250,
    },
    right: {
      fill: SVG_COLORS.gold100,
    },
  } satisfies VariantBase,
  shiny: {
    left: {
      fill: "url(#metallicGoldAngled)",
    },
    right: {
      fill: "url(#metallicGoldAngled)",
    },
  },
  hammered: {
    left: {
      fill: SVG_COLORS.gold250,
      style: { filter: 'url(#hammeredGoldFilter)', },
    },
    right: {
      style: { filter: 'url(#hammeredGoldFilter)', },
      fill: SVG_COLORS.gold100,
    },
  },
  buffed: {
    left: {
      fill: "url(#metallicGoldAngled)",
      style: { filter: 'url(#metallicGoldFilter)', },
    },
    right: {
      fill: "url(#metallicGoldAngled)",
      style: { filter: 'url(#metallicGoldFilter)', },
    },
  },
} as const;

type VariantKey = keyof typeof variants;

const useVariant = <T extends VariantKey>(variantKey: T): VariantBase => {
  const variant = useMemo(() => variants[variantKey], [variantKey]);
  return variant;
};

export const Sword: React.FC<
  SvgComponentProps<'metallicGold' | 'metallicGoldVertical' | 'radialGold'> & { variant?: VariantKey; }
> = ({
  defs, variant, x, y
}) => {
  const { left, right } = useVariant(variant || 'default');

  // Blade
  const bladeSize = [8, 50];
  const bladeHalfWidth = bladeSize[0] / 2;
  const point = [0, 0];
  const baseLeft = [-bladeHalfWidth, bladeSize[1]];
  const baseRight = mapSymmetry(baseLeft);
  const baseCenter = [0, bladeSize[1]];
  const edgeLeft = [-bladeHalfWidth - 2, 10];
  const edgeRight = mapSymmetry(edgeLeft);
  const leftFill = [
    baseLeft, // Base Left
    baseCenter, // Base Right
    point, // Point
    edgeLeft, // Edge point
  ];
  const rightFill = leftFill.map(mapSymmetry);
  const edge = [
    edgeLeft,
    baseLeft,
    baseRight,
    edgeRight,
    point,
  ];

  // Guard
  const guardSize = [24, 8];
  const guardHalfWidth = guardSize[0] / 2;
  const guardTopLeft = [-guardHalfWidth, bladeSize[1]];
  const guardTopRight = mapSymmetry(guardTopLeft);
  const guardBottomLeft = [guardTopLeft[0], guardTopLeft[1] + guardSize[1]];
  const guardBottomRight = mapSymmetry(guardBottomLeft);
  const guard = [
    guardTopLeft,
    guardTopRight,
    guardBottomRight,
    guardBottomLeft,
  ];

  // Handle
  const handleSize = getSize([6, 24]);
  const handleTopLeft = [-handleSize.halfWidth, guardBottomLeft[1]];
  const handleTopRight = mapSymmetry(handleTopLeft);
  const handleBottomLeft = [handleTopLeft[0], handleTopLeft[1] + handleSize.height];
  const handleBottomRight = mapSymmetry(handleBottomLeft);
  const handle = [
    handleTopLeft,
    handleTopRight,
    handleBottomRight,
    handleBottomLeft,
  ];

  // useLog('sword', props);

  return <SvgGroup x={x || 0} y={y || 0}>
    {/* Blade */}
    <polygon
      {...left}
      points={mapPolygons(leftFill)}
    />
    <polygon
      {...right}
      points={mapPolygons(rightFill)}
    />
    <polygon 
      points={mapPolygons(edge)}
      fill="transparent"
      stroke={`url(#${defs.metallicGold})`}
      strokeWidth="1"
    />
    {/* <circle cx={swordPoint[0]} cy={swordPoint[1]} r={3} fill="url(#shiningPoint)" /> */}

    {/* Guard */}
    <polygon 
      points={mapPolygons(guard)}
      fill={SVG_COLORS.gold150}
    />

    {/* Handle */}
    <polygon 
      points={mapPolygons(handle)}
      fill={`url(#${defs.metallicGoldVertical})`}
    />

    {/* Pommel */}
    <circle cx={0} cy={handleBottomLeft[1]} r={handleSize.width} fill={`url(#${defs.radialGold})`} />
  </SvgGroup>;
};
