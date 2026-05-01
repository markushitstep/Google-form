import type { AnswersState } from '../../pages/FillForm/FillForm';
import type { FormQuery } from '../../services/graphql.generated';

export const normalizeAnswers = (form: NonNullable<FormQuery['form']>, answers: AnswersState) => {
  return form.questions.map((question) => {
    const value = answers[question.id];

    return {
      questionId: question.id,
      value: Array.isArray(value) ? value.join(', ') : value?.trim() || '',
    };
  });
};

export const validateAnswers = (form: NonNullable<FormQuery['form']>, answers: AnswersState) => {
  const hasEmptyAnswer = form.questions.some((question) => {
    const value = answers[question.id];

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return !value?.trim();
  });

  if (hasEmptyAnswer) {
    return 'Please answer all questions';
  }

  return null;
};
