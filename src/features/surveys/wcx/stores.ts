import { create } from "zustand";
import { WCXAnswers, WCXQuestionKey } from "./types";
import { WCX_QUESTION_CONFIG } from "./constants";

const { getInitialAnswers } = WCX_QUESTION_CONFIG;

export const wcxStore = create<{
  answers: WCXAnswers;
  selectAnswer: (questionKey: WCXQuestionKey, answer: string) => void;
}>((set) => ({
  answers: getInitialAnswers(),
  selectAnswer: (questionKey, answer) => set((state) => ({
    answers: {
      ...state.answers,
      [questionKey]: answer,
    },
  })),
}));
