import { useMemo } from "react";
import { SvgGroup } from "./SvgGroup";
import { createSvgGuides } from "../utilities/guides";

type SvgGuidelinesProps = {
  guides: ReturnType<typeof createSvgGuides>;
  options?: {
    suppressGuides?: boolean;
  };
};
export const SvgGuidelines = ({
  guides,
  options: { suppressGuides = false } = { suppressGuides: false }
}: SvgGuidelinesProps) => {
  const paths = useMemo(() => guides.render('xs'), [guides]);
  return <SvgGroup>
    {!suppressGuides && paths.map((props, idx) => <path key={idx} {...props} />)}
  </SvgGroup>;
}
