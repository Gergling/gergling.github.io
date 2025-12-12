import { PropsWithChildren, useEffect, useMemo } from "react";
import { useElasticResponse } from "../../features/elastic-response";
import { StyledMainContent } from "./MainContent.style";

const useMainContent = () => {
  const { getWidth, register } = useElasticResponse();
  const width = useMemo(
    // TODO: This offset should go elsewhere.
    () => getWidth(3),
    [getWidth]
  );
  useEffect(() => {
    // TODO: Minimum breakpoint should be set elsewhere.
    const minimumBreakpoint = 5;
    const maximumBreakpoint = 12;
    Array.from({
      length: maximumBreakpoint - minimumBreakpoint
    }, (_, i) => i + minimumBreakpoint).forEach(breakpoint => {
      register(breakpoint);
    });
  }, [register]);

  return { width };
};

export const MainContent = ({
  children,
}: PropsWithChildren) => {
  const { width } = useMainContent();

  return (
    <StyledMainContent width={width}>
      {children}
    </StyledMainContent>
  );
};
