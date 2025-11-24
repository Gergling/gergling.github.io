import { SvgComponentProps } from "../types";
import { mapSymmetry } from "../utilities/point";
import { mapPolygonPoints } from "../utilities/polygon";
import { SvgGroup } from "./SvgGroup";

export const HornedHelmet: React.FC<
  SvgComponentProps
> = ({ color, x, y }) => {
  const helmBaseWidth = 30;
  const helmBaseWidthHalf = helmBaseWidth / 2;
  const helmBaseLeft = [-helmBaseWidthHalf, 0];
  const helmBaseRight = mapSymmetry(helmBaseLeft);
  const helmRadius = [helmBaseWidthHalf, helmBaseWidthHalf];

  const leftHornTip = [-20, -20];
  const leftHornConnector = [-10, -10];

  const rightHornTip = mapSymmetry(leftHornTip);
  const rightHornConnector = mapSymmetry(leftHornConnector);

  const hornTipConnectorRadius = [0, 30];
  const hornTipBaseRadius = [40, 40];
  const hornConnectorBaseRadius = [helmRadius[0] + 2, helmRadius[1] + 2];

  const noseGuardSize = [6, 20];
  const noseGuardWidthHalf = noseGuardSize[0] / 2;

  const rotation = 0;
  const largeArc = 0;
  const sweep = 1;
  const capPath = [
    `M ${helmBaseLeft.join(',')}`,
    `A ${helmRadius.join(',')} ${rotation} ${largeArc},${sweep} ${helmBaseRight.join(',')}`,
  ];
  const leftHornPath = [
    `M ${leftHornTip.join(',')}`,
    `A ${hornTipConnectorRadius.join(',')} ${rotation} ${1},${0} ${leftHornConnector.join(',')}`,
    `A ${helmRadius.join(',')} ${rotation} ${largeArc},${sweep} ${helmBaseLeft.join(',')}`,
    `A ${hornTipBaseRadius.join(',')} ${rotation} ${largeArc},${sweep} ${leftHornTip.join(',')}`,
    `M ${leftHornConnector.join(',')}`,
    `A ${hornConnectorBaseRadius.join(',')} ${rotation} ${largeArc},${sweep} ${helmBaseLeft.join(',')}`,
  ];
  const rightHornPath = [
    `M ${rightHornConnector.join(',')}`,
    `A ${hornTipConnectorRadius.join(',')} ${rotation} ${1},${0} ${rightHornTip.join(',')}`,
    `A ${hornTipBaseRadius.join(',')} ${rotation} ${largeArc},${sweep} ${helmBaseRight.join(',')}`,
    `A ${hornConnectorBaseRadius.join(',')} ${rotation} ${largeArc},${sweep} ${rightHornConnector.join(',')}`,
    `M ${helmBaseRight.join(',')}`,
    `A ${hornConnectorBaseRadius.join(',')} ${rotation} ${largeArc},${sweep} ${rightHornConnector.join(',')}`,
  ];
  const noseGuardPolygon = [
    [-noseGuardWidthHalf, 0], // Left helm fixture
    [-noseGuardWidthHalf - 1, noseGuardSize[1] - 3], // Left edge point
    [0, noseGuardSize[1]], // Tip
    [noseGuardWidthHalf + 1, noseGuardSize[1] - 3], // Right edge point
    [noseGuardWidthHalf, 0], // Right helm fixture
  ].map(mapPolygonPoints).join(' ');
  const polygons = [
    noseGuardPolygon,
  ];
  return <SvgGroup x={x || 0} y={y || 0}>
    <path d={capPath.join(' ')} fill={color} fillRule="evenodd" />
    {polygons.map((points, idx) => <polygon 
      key={idx}
      points={points}
      fill={color}
    />)}
    <path d={leftHornPath.join(' ')} fill={color} transform="scale(1) translate(-2, -2)" fillRule="evenodd" />
    <path d={rightHornPath.join(' ')} fill={color} transform="scale(1) translate(2, -2)" fillRule="evenodd" />
  </SvgGroup>;
};
