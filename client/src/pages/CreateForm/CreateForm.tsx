import { PageLayout } from '../../components/PageLayout';
import { useFormBuilder } from '../../features/formBuilder/useFormBuilder';
import { QuestionCard } from '../../components/QuestionCard';

export const CreateFormPage = () => {
  const {
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
  } = useFormBuilder();

  return (
    <PageLayout bgColor="white" width="w-2/3" bodyClassName="shadow-xl py-8 px-4 rounded-2xl">
      <div className="flex flex-col gap-4">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Create form title"
          className="w-full border-b border-gray-200 p-2 text-3xl font-semibold outline-none transition focus:border-purple-300"
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Form description"
          className="w-full focus:shadow-md rounded-md resize-none border-b border-gray-200 p-2 text-md outline-none transition focus:border-purple-300"
          rows={2}
        />
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onQuestionTextChange={handleQuestionTextChange}
            onQuestionTypeChange={handleQuestionTypeChange}
            onOptionChange={handleOptionChange}
            onAddOption={handleAddOption}
            onRemoveOption={handleRemoveOption}
            onRemoveQuestion={handleRemoveQuestion}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddQuestion}
        className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-4 text-sm font-medium text-gray-600 transition hover:border-purple-500 hover:text-purple-500"
      >
        + Add question
      </button>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="rounded-lg bg-purple-300 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Saving...' : 'Save form'}
        </button>
      </div>
    </PageLayout>
  );
};
