import { PortableTextMapping } from "../../types";
import { BlogRendererFigure } from "./Figure";
import { BlogRendererMicroform } from "./Microform";
import { BlogRendererAccordion } from "./Accordion";
import { ReactNode } from "react";

type PortableTextComponents = {
  types: {
    [K in keyof PortableTextMapping]: ({ value }: {
      value: PortableTextMapping[K];
    }) => ReactNode;
  };
};
export const usePortableTextComponents = (): PortableTextComponents => ({
  types: {
    accordion: BlogRendererAccordion,
    figure: BlogRendererFigure,
    microform: BlogRendererMicroform,
  },
});
