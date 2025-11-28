import { WCX_QUESTION_CONFIG } from "../constants";
import { WCXAnswers, WCXQuestionKey } from "../types";

type ScoreDimensions = 'quality' | 'data' | 'weight';
type Scores = {
  [K in ScoreDimensions]: number;
};

const {
  getConfigQuestionByName
} = WCX_QUESTION_CONFIG;

// TODO: Check it only scores if there is an answer AND the question was
// enabled.
export const getScores = (answers: WCXAnswers): Scores => {
  return Object.entries(answers).reduce((scores, [key, answer]) => {
    const name = key as WCXQuestionKey;
    const question = getConfigQuestionByName(name);

    // If the question has no weight, we can move on.
    if (!question.weight) return scores;

    const weight = scores.weight + question.weight;
    // console.log(question.name, weight)

    // If the question hasn't been answered, we should sum the weight.
    if (answer === undefined) {
      return {
        ...scores,
        weight,
      };
    }

    const option = question.options.find(({ value }) => value === answer);

    // We selected from the list of options so if it doesn't exist in the list,
    // something is very wrong.
    if (!option) throw new Error(`Could not find an option for ${name} with value ${answer}.`);

    // An answer is provided but isn't scored at all meaning it just unlocks
    // other answers. This doesn't score anything. We can just move on to the next answer.
    if (option.score === undefined) return scores;

    // At this point, the answer is scored and defined.
    // We score the bathroom experience.
    const quality = scores.quality + (option.score * question.weight);

    // We score the amount of answered questions with weights.
    const data = scores.data + question.weight;

    return {
      data,
      quality,
      weight,
    };
  }, { data: 0, quality: 0, weight: 0 } as Scores);
};
