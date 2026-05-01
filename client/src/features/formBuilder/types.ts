export type QuestionType = 'TEXT' | 'MULTIPLE_CHOICE' | 'CHECKBOX' | 'DATE';

export type DraftQuestion = {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
};
