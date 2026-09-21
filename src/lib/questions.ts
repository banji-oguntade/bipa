import questionsData from "./data/questions.json";

export type Question = {
  id: string;
  text: string;
  competencyIds: string[];
};

export const getQuestions = (): Question[] => {
  return questionsData as Question[];
};
