type Radius = {
  radiusX: number;
  radiusY: number;
} | {
  radius: number;
};
type Target = {
  targetX: number;
  targetY: number;
};

export const getArcRadius = ([radiusX, radiusY]: number[]): Radius => ({ radiusX, radiusY });
export const getArcTarget = ([targetX, targetY]: number[]): Target => ({ targetX, targetY });

export const arc = ({
  rotation = 0,
  largeArc = false,
  sweep = false,
  targetX,
  targetY,
  ...props
}: Radius & Target & {
  rotation?: number;
  largeArc?: boolean;
  sweep?: boolean;
}) => {
  const singleRadius = 'radius' in props;
  const radiusX = singleRadius ? props.radius : props.radiusX;
  const radiusY = singleRadius ? props.radius : props.radiusY;
  return `A ${radiusX},${radiusY} ${rotation} ${largeArc ? 1 : 0},${sweep ? 1 : 0} ${targetX},${targetY}`;
};
