export type QuestionType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';

type Question = {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
};

export type Form = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

export type Answer = {
  questionId: string;
  value: string;
};

export type FormResponse = {
  id: string;
  formId: string;
  answers: Answer[];
};
