import { SvgComponentProps } from "../types";
import { mapSymmetry } from "../utilities/point";
import { mapPolygons } from "../utilities/polygon";
import { SvgGroup } from "./SvgGroup";

export const Tie: React.FC<SvgComponentProps> = ({ color, x, y }) => {
  const tieLength = 75;
  const collarLeft = [
    [-2, 5], // Central button point
    [-15, 0], // Collar near neck
    [-10, 15], // Points next to tie
  ];
  const collarRight = collarLeft.map(mapSymmetry);
  const collarLeftKnotPoint = [collarLeft[2][0] + 2, collarLeft[2][1] + 1];
  const knot = [
    [0, collarLeft[0][1] + 1],
    collarLeftKnotPoint,
    [0, collarLeft[2][1] + 5],
    mapSymmetry(collarLeftKnotPoint),
  ];
  const leftTieKnotConnection = [collarLeftKnotPoint[0] + 1, collarLeftKnotPoint[1] + 3];
  const bottomLeftTiePoint = [collarLeft[1][0] + 2, tieLength * 0.87];
  const mainTie = [
    [0, knot[2][1] + 2], // Top center tip
    leftTieKnotConnection,
    bottomLeftTiePoint, // Bottom left
    [0, tieLength], // Bottom tip
    mapSymmetry(bottomLeftTiePoint), // Bottom right
    mapSymmetry(leftTieKnotConnection),
  ];
  const polygons = [
    collarLeft,
    collarRight,
    knot,
    mainTie,
  ].map(mapPolygons);

  return (
    <SvgGroup x={x} y={y}>
      {polygons.map((points, idx) => <polygon 
        key={idx}
        points={points}
        fill={color}
      />)}
    </SvgGroup>
  );
};
