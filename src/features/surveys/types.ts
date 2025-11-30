import { ReactElement } from "react";
import { Post } from "../../libs/sanity";

export type SurveyConfig = {
  [name in NonNullable<Post['survey']>]: () => ReactElement;
};
