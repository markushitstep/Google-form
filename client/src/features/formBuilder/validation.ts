import type { DraftQuestion } from './types';

export const normalizeQuestions = (questions: DraftQuestion[]) =>
  questions.map((question) => ({
    text: question.text.trim(),
    type: question.type,
    options: question.options.map((option) => option.trim()).filter(Boolean),
  }));

export const validateFormBuilder = (
  title: string,
  questions: ReturnType<typeof normalizeQuestions>,
) => {
  if (!title.trim()) return 'Form title is required';

  if (!questions.length) return 'Add at least one question';

  if (questions.some((question) => !question.text)) {
    return 'Question text is required';
  }

  if (
    questions.some(
      (question) =>
        (question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX') &&
        question.options.length === 0,
    )
  ) {
    return 'Choice questions must have at least one option';
  }

  return null;
};
