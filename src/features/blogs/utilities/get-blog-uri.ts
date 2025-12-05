import { generatePath } from "react-router-dom";
import { getRoute } from "../../../routes";

export const getBlogUri = (slug: string) => generatePath(getRoute('blog').path, { slug, '*': null });
