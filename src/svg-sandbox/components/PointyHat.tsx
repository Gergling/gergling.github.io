import { SvgComponentProps } from "../types";
import { arc, getArcRadius, getArcTarget } from "../utilities/path";
import { mapScale, mapSymmetry, mapSymmetryHorizontal } from "../utilities/point";
import { SvgGroup } from "./SvgGroup";

export const PointyHat: React.FC<SvgComponentProps> = ({ color, x, y }) => {
  const size = [40, 50];

  const brimRadius = [size[0] / 2, size[0] / 4];
  const brimLeftPoint = [-brimRadius[0], 0];
  const brimRightPoint = mapSymmetry(brimLeftPoint);

  const coneRadius = mapScale(brimRadius, 0.5);
  const coneLeftPoint = [-coneRadius[0], 0];
  const coneLeftBuckle = [-coneRadius[0] / 2, coneRadius[1] / 4];
  const coneLeftBase = [-coneRadius[0] / 2, 0];
  const coneRightPoint = mapSymmetry(coneLeftPoint);
  const coneRightBuckle = mapSymmetry(coneLeftBuckle);
  const coneRightBase = mapSymmetry(coneLeftBase);
  const coneTopPoint = [0, -size[1]];

  const buckleTopLeft = [coneLeftBuckle[0], coneRadius[1] / 2];
  const buckleTopRight = mapSymmetry(buckleTopLeft);
  const buckleBottomLeft = mapSymmetryHorizontal(buckleTopLeft);
  const buckleBottomRight = mapSymmetryHorizontal(buckleTopRight);
  const buckleTopLeftInner = [buckleTopLeft[0] + 1, buckleTopLeft[1] + 1];
  const buckleTopRightInner = mapSymmetry(buckleTopLeftInner);
  const buckleBottomLeftInner = mapSymmetryHorizontal(buckleTopLeftInner);
  const buckleBottomRightInner = mapSymmetryHorizontal(buckleTopRightInner);
  const buckleTopLeftLatch = [1, -1];
  const buckleTopRightLatch = [buckleTopRight[0] - 1, -1];
  const buckleBottomLeftLatch = mapSymmetryHorizontal(buckleTopLeftLatch);
  const buckleBottomRightLatch = mapSymmetryHorizontal(buckleTopRightLatch);

  const brim = [
    `M ${brimLeftPoint.join(',')}`,
    arc({ ...getArcRadius(brimRadius), ...getArcTarget(brimRightPoint) }),
    arc({ ...getArcRadius(brimRadius), ...getArcTarget(brimLeftPoint) }),

    `M ${coneLeftPoint.join(',')}`,
    arc({ ...getArcRadius(brimRadius), ...getArcTarget(coneLeftBuckle) }),
    arc({ ...getArcRadius(brimRadius), ...getArcTarget(coneLeftBase) }),

    `M ${coneRightPoint.join(',')}`,
    arc({ ...getArcRadius(brimRadius), ...getArcTarget(coneRightBuckle) }),
    arc({ ...getArcRadius(brimRadius), ...getArcTarget(coneRightBase) }),

    `M ${buckleTopLeft.join(',')}`,
    `L ${buckleTopRight.join(',')}`,
    `L ${buckleBottomRight.join(',')}`,
    `L ${buckleBottomLeft.join(',')}`,
    `M ${buckleTopLeftInner.join(',')}`,
    `L ${buckleTopRightInner.join(',')}`,
    `L ${buckleBottomRightInner.join(',')}`,
    `L ${buckleBottomLeftInner.join(',')}`,
    `M ${buckleTopLeftLatch.join(',')}`,
    `L ${buckleTopRightLatch.join(',')}`,
    `L ${buckleBottomRightLatch.join(',')}`,
    `L ${buckleBottomLeftLatch.join(',')}`,
  ];

  const cone = [
    `M ${coneTopPoint.join(',')}`,
    `L ${coneRightPoint.join(',')}`,
    arc({ radiusX: 10, radiusY: 10, ...getArcTarget(coneLeftPoint) }),
  ];

  return <SvgGroup x={x} y={y}>
    <path d={brim.join(' ')} fill={color} fillRule="evenodd" />
    <path d={cone.join(' ')} fill={color} fillRule="evenodd" />
  </SvgGroup>;
};
