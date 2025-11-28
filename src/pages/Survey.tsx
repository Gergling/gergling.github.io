import { useRoutes, Link } from "react-router-dom";
import { PageContainer } from "../common/components/styles";
import { PersonalityType } from "../features/surveys/wrm";
import { WCXSurvey } from "../features/surveys/wcx";

const surveyRoutes = [
  { path: "/wcx", element: <WCXSurvey /> },
  { path: "/wrm", element: <PersonalityType /> },
  { path: "*", element: <>Go <Link to="/">away</Link>.</> },
];

export const SurveyPage = () => {
  const element = useRoutes(surveyRoutes);

  return <PageContainer>
    {element}
  </PageContainer>;
};
