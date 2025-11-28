import { describe, expect, it } from "vitest";
import { WCXAnswers } from "../types";
import { getScores } from "./scoring";
import { WCX_QUESTION_CONFIG } from "../constants";

const {
  getInitialAnswers,
} = WCX_QUESTION_CONFIG;

describe('getScores', () => {
  it('should return zero for all scores when no answers are provided', () => {
    const scores = getScores(getInitialAnswers());
    expect(scores.quality).toBe(0);
    expect(scores.weight).toBe(11.5);
    expect(scores.data).toBe(0);
  });

  it('should calculate scores correctly for a "good" path', () => {
    const answers: WCXAnswers = {
      ...getInitialAnswers(),
      stall: 'yes',
      toiletPaper: 'yes', // score: 1, weight: 2
      smell: 'pleasant', // score: 1, weight: 1
      flush: 'yes', // score: 1, weight: 1
      lock: 'yes', // score: 1, weight: 2
      urinal: 'yes',
      modesty: 'yes', // score: 1, weight: 1
      taps: 'yes', // score: 1, weight: 2
      dryHands: 'effectively', // score: 1, weight: 1.5
      aesthetic: 'decorating', // score: 1, weight: 1
    };

    const scores = getScores(answers);

    // quality = (1*2) + (1*1) + (1*1) + (1*2) + (1*1) + (1*2) + (1*1.5) = 2 + 1 + 1 + 2 + 1 + 2 + 1.5 = 10.5
    expect(scores.quality).toBe(11.5);

    // weight = 2 + 1 + 1 + 2 + 1 + 2 + 1.5 = 10.5
    expect(scores.weight).toBe(11.5);

    // 9 answered questions (aesthetic is not scored)
    expect(scores.data).toBe(11.5);
  });

  it('should calculate scores correctly for a "bad" path', () => {
    const answers: WCXAnswers = {
      ...getInitialAnswers(),
      stall: 'yes',
      toiletPaper: 'no', // score: 0, weight: 2
      smell: 'organs', // score: 0, weight: 1
      flush: 'no', // score: 0, weight: 1
      lock: 'no', // score: 0, weight: 2
      urinal: 'no',
      taps: 'unexpected', // score: 0, weight: 2
      dryHands: 'none', // score: 0, weight: 1.5
      // modesty and aesthetic are not answered/enabled
      modesty: undefined,
      aesthetic: undefined,
    };

    const scores = getScores(answers);

    // All scores are 0, so quality is 0
    expect(scores.quality).toBe(0);

    // weight = 2 + 1 + 1 + 2 + 2 + 1.5 = 9.5
    expect(scores.weight).toBe(11.5);

    // 7 answered questions
    expect(scores.data).toBe(9.5);
  });

  it('should throw an error if an answer value does not match any option', () => {
    const answers: WCXAnswers = {
      ...getInitialAnswers(),
      toiletPaper: 'invalid-answer',
    };

    expect(() => getScores(answers)).toThrow('Could not find an option for toiletPaper with value invalid-answer.');
  });

  it('should handle unscored answers gracefully', () => {
    const answers: WCXAnswers = {
      ...getInitialAnswers(),
      stall: 'no', // unscored
      urinal: 'no', // unscored
      taps: 'yes', // score: 1, weight: 2
      dryHands: 'effectively', // score: 1, weight: 1.5
      aesthetic: 'clean', // unscored
    };

    const scores = getScores(answers);

    // quality = (1*2) + (1*1.5) = 3.5
    expect(scores.quality).toBe(4);

    // weight = 2 + 1.5 = 3.5
    expect(scores.weight).toBe(11.5);

    // 5 answered questions
    expect(scores.data).toBe(4.5);
  });
});
