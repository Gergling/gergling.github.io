import { PropsWithChildren, SVGProps } from "react";
import { SvgPosition } from "../types";

type SvgGroupProps = SvgPosition & PropsWithChildren & SVGProps<SVGGElement>;

export const SvgGroup = ({
  children,
  x,
  y,
  ...props
}: SvgGroupProps) => <g transform={`translate(${x || 0}, ${y || 0})`} {...props}>{children}</g>;
