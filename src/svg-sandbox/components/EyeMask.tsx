import { SvgComponentProps } from "../types";
import { arc, getArcRadius, getArcTarget } from "../utilities/path";
import { mapScale, mapSymmetry } from "../utilities/point";
import { SvgGroup } from "./SvgGroup"

export const EyeMask: React.FC<
  SvgComponentProps
> = ({ color, x, y }) => {
  const maskSize = [32, 16];
  const maskSizeHalf = mapScale(maskSize, 0.5);

  const eyeBorderWidth = 2;
  const eyeRadius = [11, 11];
  const eyeBorderRadius = [eyeRadius[0], eyeRadius[1]];
  const eyeHoleRadius = [eyeRadius[0], eyeRadius[1]];

  const noseBridgeTop = [0, -eyeBorderWidth];
  const noseBridgeBottom = [0, eyeBorderWidth];

  const leftMaskEarTop = [-maskSizeHalf[0], -eyeBorderWidth];
  const leftMaskEarBottom = [-maskSizeHalf[0], eyeBorderWidth];
  const leftMaskEyeholeEar = [-maskSizeHalf[0] + eyeBorderWidth, 0];
  const leftMaskEyeholeNose = [-eyeBorderWidth, 0];

  const rightMaskEarTop = mapSymmetry(leftMaskEarTop);
  const rightMaskEarBottom = mapSymmetry(leftMaskEarBottom);
  const rightMaskEyeholeEar = mapSymmetry(leftMaskEyeholeEar);
  const rightMaskEyeholeNose = mapSymmetry(leftMaskEyeholeNose);

  const leftPath = [
    `M ${leftMaskEarBottom.join(',')}`,
    arc({ ...getArcRadius(eyeBorderRadius), ...getArcTarget(noseBridgeBottom) }),
    `L ${noseBridgeTop.join(',')}`,
    arc({ ...getArcRadius(eyeBorderRadius), ...getArcTarget(leftMaskEarTop) }),
    `Z`,
    `M ${leftMaskEyeholeEar.join(',')}`,
    arc({ ...getArcRadius(eyeHoleRadius), ...getArcTarget(leftMaskEyeholeNose) }),
    arc({ ...getArcRadius(eyeHoleRadius), ...getArcTarget(leftMaskEyeholeEar) }),
  ];
  const rightPath = [
    `M ${rightMaskEarTop.join(',')}`,
    arc({ ...getArcRadius(eyeBorderRadius), ...getArcTarget(noseBridgeTop) }),
    `L ${noseBridgeBottom.join(',')}`,
    arc({ ...getArcRadius(eyeBorderRadius), ...getArcTarget(rightMaskEarBottom) }),
    `Z`,
    `M ${rightMaskEyeholeEar.join(',')}`,
    arc({ ...getArcRadius(eyeHoleRadius), ...getArcTarget(rightMaskEyeholeNose) }),
    arc({ ...getArcRadius(eyeHoleRadius), ...getArcTarget(rightMaskEyeholeEar) }),
  ];

  return <SvgGroup x={x || 0} y={y || 0}>
    <path d={leftPath.join(' ')} fill={color} fillRule="evenodd" transform="scale(1)" />
    <path d={rightPath.join(' ')} fill={color} fillRule="evenodd" transform="scale(1)" />
  </SvgGroup>;
};
