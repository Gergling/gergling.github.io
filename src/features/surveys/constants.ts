import { SurveyConfig } from "./types";
import { WCXSurvey } from "./wcx";
import { PersonalityType } from "./wrm";

const config: SurveyConfig = {
  wcx: WCXSurvey,
  wrm: PersonalityType,
};

export const SURVEYS = Object.entries(config).map(([name, element]) => ({
  name,
  element,
}));
