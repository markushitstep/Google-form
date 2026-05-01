import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { DraftQuestion, QuestionType } from './types';
import { normalizeQuestions, validateFormBuilder } from './validation';
import { useCreateFormMutation } from '../../services/formsApi';

export const useFormBuilder = () => {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<DraftQuestion[]>([]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: '',
        type: 'TEXT',
        options: [],
      },
    ]);
  };

  const handleQuestionTextChange = (id: string, text: string) => {
    setQuestions((prev) =>
      prev.map((question) => (question.id === id ? { ...question, text } : question)),
    );
  };

  const handleQuestionTypeChange = (id: string, type: QuestionType) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
              ...question,
              type,
              options: type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX' ? [''] : [],
            }
          : question,
      ),
    );
  };

  const handleOptionChange = (questionId: string, optionIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option, index) =>
                index === optionIndex ? value : option,
              ),
            }
          : question,
      ),
    );
  };

  const handleAddOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [...question.options, ''],
            }
          : question,
      ),
    );
  };

  const handleRemoveOption = (questionId: string, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter((_, index) => index !== optionIndex),
            }
          : question,
      ),
    );
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((question) => question.id !== questionId));
  };

  const handleSubmit = async () => {
    const normalizedQuestions = normalizeQuestions(questions);
    const validationError = validateFormBuilder(title, normalizedQuestions);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await createForm({
        title: title.trim(),
        description: description.trim(),
        questions: normalizedQuestions,
      }).unwrap();

      toast.success('Form created');
      navigate('/');
    } catch {
      toast.error('Failed to create form');
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    isLoading,
    handleAddQuestion,
    handleQuestionTextChange,
    handleQuestionTypeChange,
    handleOptionChange,
    handleAddOption,
    handleRemoveOption,
    handleRemoveQuestion,
    handleSubmit,
  };
};
