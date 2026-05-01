import type { DraftQuestion, QuestionType } from '../features/formBuilder/types';
import { OptionList } from './OptionList';
import { TrashIcon } from '@heroicons/react/24/outline';

type QuestionCardProps = {
  question: DraftQuestion;
  index: number;
  onQuestionTextChange: (id: string, text: string) => void;
  onQuestionTypeChange: (id: string, type: QuestionType) => void;
  onOptionChange: (questionId: string, optionIndex: number, value: string) => void;
  onAddOption: (questionId: string) => void;
  onRemoveOption: (questionId: string, optionIndex: number) => void;
  onRemoveQuestion: (questionId: string) => void;
};

export const QuestionCard = ({
  question,
  index,
  onQuestionTextChange,
  onQuestionTypeChange,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onRemoveQuestion,
}: QuestionCardProps) => {
  const hasOptions = question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>

        <select
          value={question.type}
          onChange={(event) =>
            onQuestionTypeChange(question.id, event.target.value as QuestionType)
          }
          className="rounded-lg border border-gray-300 px-1 py-2 text-sm outline-none focus:border-purple-400"
        >
          <option value="TEXT">Text</option>
          <option value="MULTIPLE_CHOICE">Multiple choice</option>
          <option value="CHECKBOX">Checkbox</option>
          <option value="DATE">Date</option>
        </select>
      </div>

      <div className="flex border-b border-gray-200 p-2">
        <input
          value={question.text}
          onChange={(event) => onQuestionTextChange(question.id, event.target.value)}
          placeholder="Question text"
          className="w-full text-lg outline-none transition"
        />
        <button
          type="button"
          className="flex items-center justify-center rounded-md p-1 hover:bg-gray-100 transition"
          onClick={() => onRemoveQuestion(question.id)}
        >
          <TrashIcon className="text-gray-400 w-4 h-4" />
        </button>
      </div>

      {hasOptions && (
        <OptionList
          questionId={question.id}
          options={question.options}
          onOptionChange={onOptionChange}
          onAddOption={onAddOption}
          onRemoveOption={onRemoveOption}
        />
      )}
    </div>
  );
};
