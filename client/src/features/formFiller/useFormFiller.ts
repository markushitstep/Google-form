import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetFormQuery, useSubmitResponseMutation } from '../../services/formsApi';
import { normalizeAnswers, validateAnswers } from './validation';

type AnswersState = Record<string, string | string[]>;

export const useFormFiller = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<AnswersState>({});

  const { data: form, isLoading, isError } = useGetFormQuery({ id: id ?? '' }, { skip: !id });
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();

  const handleTextAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentValue = prev[questionId];
      const currentAnswers = Array.isArray(currentValue) ? currentValue : [];

      return {
        ...prev,
        [questionId]: checked
          ? [...currentAnswers, option]
          : currentAnswers.filter((item) => item !== option),
      };
    });
  };

  const handleSubmit = async () => {
    const validationError = validateAnswers(form, answers);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    const normalizedAnswers = normalizeAnswers(form, answers);

    try {
      await submitResponse({
        formId: form.id,
        answers: normalizedAnswers,
      }).unwrap();

      toast.success('Form submitted successfully');
      navigate('/');
    } catch {
      toast.error('Failed to submit form');
    }
  };

  return {
    form,
    answers,
    isLoading,
    isError,
    isSubmitting,
    handleTextAnswerChange,
    handleCheckboxChange,
    handleSubmit,
  };
};
