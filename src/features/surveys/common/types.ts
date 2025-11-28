import { ReactNode } from "react";

export type SurveyProgressMarker = {
  answered: boolean;
  current: boolean;
  onClick?: () => void;
};

export type SurveyProgressProps = {
  last: boolean;
  markers: SurveyProgressMarker[];
};

export type SurveyControlProps = {
  label: ReactNode;
  handleNext?: () => void;
  handlePrevious?: () => void;
  isNextEnabled?: boolean;
  isPreviousEnabled?: boolean;
  nextButtonText?: string;
};

export type RadioQuestionProps<T> = {
  options: { label: string; value: T; }[];
  selectedAnswer: T | undefined;
  setSelectedAnswer: (answer: T) => void;
};
