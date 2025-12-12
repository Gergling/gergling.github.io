import { SelectOption } from "../../../common/types";

export type WCXQuestionKey =
  | 'stall'
  | 'toiletPaper'
  | 'smell'
  | 'flush'
  | 'lock'
  | 'urinal'
  | 'modesty'
  | 'taps'
  | 'dryHands'
  | 'aesthetic'
  ;

export type WCXAnswers = {
  [K in WCXQuestionKey]: string | undefined;
};

type AnswerKey = WCXQuestionKey | 'done';

export type WCXConfigQuestionOption = SelectOption & {
  next: AnswerKey;
} & ({
  score: number;
} | {
  score?: never;
});

export type WCXConfigQuestion = {
  enabled: (answers: WCXAnswers) => boolean;
  name: WCXQuestionKey;
  options: WCXConfigQuestionOption[];
  scored: boolean;
  title: string;
  weight: number;
};

export type WCXQuestion = {
  answer: string | undefined;
  enabled: boolean;
  name: WCXQuestionKey;
  next?: AnswerKey;
  options: WCXConfigQuestionOption[];
  title: string;
};
