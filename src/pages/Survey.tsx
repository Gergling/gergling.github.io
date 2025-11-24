import { useRoutes } from "react-router-dom";
import { PageContainer } from "../common/components/styles";
import { PersonalityType } from "../features/surveys/wrm/components/PersonalityType";
import { Link } from "react-router-dom";

const surveyRoutes = [
  { path: "/wrm", element: <PersonalityType /> },
  { path: "*", element: <>Go <Link to="/">away</Link>.</> },
];

export const SurveyPage = () => {
  const element = useRoutes(surveyRoutes);

  return <PageContainer>
    {element}
  </PageContainer>;
};
