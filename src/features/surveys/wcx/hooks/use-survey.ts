import { useMemo, useState } from "react";
import { wcxStore } from "../stores";
import { getQuestions, getScores } from "../utilities";

export const useWCXSurvey = () => {
  const {
    answers,
    selectAnswer,
  } = wcxStore();

  const questions = useMemo(() => getQuestions(answers), [answers]);

  const scores = useMemo(() => {
    const scores = getScores(answers);
    const data = Math.round(scores.data * 100 / scores.weight);
    const quality = Math.round(scores.quality * 100 / scores.data);
    return {
      data,
      quality,
    };
  }, [answers]);

  // All the enabled questions should have an answer.
  // If they all do, we can submit.
  const canSubmit = useMemo(
    () => !questions.some(({ enabled, answer }) => enabled && answer === undefined),
    [questions]
  );

  const [submitted, setSubmitted] = useState(false);

  return {
    canSubmit,
    questions,
    scores,
    selectAnswer,
    setSubmitted,
    submitted,
  };
};
