import { GetFWXAnswer } from "./types";

export const getScores = (getAnswer: GetFWXAnswer) => {
  const heavy = getAnswer('heavy');
  
  const free = getAnswer('free');
  const heavier = getAnswer('heavier');
};
