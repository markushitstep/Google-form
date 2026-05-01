import { FormQuestionField } from '../../components/FormQuestionField';
import { PageLayout } from '../../components/PageLayout';
import { useFormFiller } from '../../features/formFiller/useFormFiller';

export type AnswersState = Record<string, string | string[]>;

export function FillFormPage() {
  const {
    form,
    answers,
    isLoading,
    isError,
    isSubmitting,
    handleTextAnswerChange,
    handleCheckboxChange,
    handleSubmit,
  } = useFormFiller();

  if (isLoading) {
    return <PageLayout>Loading form...</PageLayout>;
  }

  if (isError || !form) {
    return <PageLayout>Form not found</PageLayout>;
  }

  if (isLoading) {
    return <PageLayout>Loading form...</PageLayout>;
  }

  if (isError || !form) {
    return <PageLayout>Form not found</PageLayout>;
  }

  return (
    <PageLayout bgColor="white" width="w-2/3" bodyClassName="shadow-lg py-8 px-4 rounded-2xl">
      <div className="mb-6">
        <h1 className="flex gap-2 text-3xl font-semibold">{form.title}</h1>

        {form.description && <p className="text-gray-500">{form.description}</p>}
      </div>

      <div className="space-y-6">
        {form.questions.map((question, index) => (
          <FormQuestionField
            key={question.id}
            question={question}
            index={index}
            value={answers[question.id]}
            onTextChange={handleTextAnswerChange}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-lg bg-purple-300 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </PageLayout>
  );
}
