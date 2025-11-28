import {
  WCX_QUESTION_CONFIG,
  // WCX_STARTING_QUESTION
} from "../constants";
import {
  WCXAnswers,
  WCXConfigQuestion,
  WCXQuestion,
  // WCXQuestionKey
} from "../types";

const {
  // getInitialAnswers,
  // getConfigQuestionByName,
  getConfigQuestions,
} = WCX_QUESTION_CONFIG;

const getQuestion = (
  answers: WCXAnswers,
  { name, options, title, ...question }: WCXConfigQuestion,
): WCXQuestion => {
  // const { options, title, ...question } = getConfigQuestionByName(name);
  const answer = answers[name];
  const selectedAnswer = options.find(({ value }) => value === answer);
  const next = selectedAnswer && selectedAnswer.next;
  const enabled = question.enabled ? question.enabled(answers) : true;

  return {
    answer,
    enabled,
    name,
    next,
    options,
    title,
  };
};

export const getQuestions = (
  answers: WCXAnswers,
): WCXQuestion[] => getConfigQuestions()
  .map((configQuestion) => getQuestion(answers, configQuestion));
