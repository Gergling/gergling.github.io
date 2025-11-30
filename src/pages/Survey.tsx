import { useRoutes, Link } from "react-router-dom";
import { PageContainer } from "../common/components/styles";
import { SURVEYS } from "../features/surveys";
import { createElement } from "react";

const surveyRoutes = [
  ...SURVEYS.map(({ name, element }) => ({ path: `/${name}`, element: createElement(element) })),
  { path: "*", element: <>Go <Link to="/">away</Link>.</> },
];

export const SurveyPage = () => {
  const element = useRoutes(surveyRoutes);

  return <PageContainer>
    {element}
  </PageContainer>;
};
