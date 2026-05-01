import { TrashIcon } from '@heroicons/react/24/outline';

type OptionListProps = {
  questionId: string;
  options: string[];
  onOptionChange: (questionId: string, optionIndex: number, value: string) => void;
  onAddOption: (questionId: string) => void;
  onRemoveOption: (questionId: string, optionIndex: number) => void;
};

export const OptionList = ({
  questionId,
  options,
  onOptionChange,
  onAddOption,
  onRemoveOption,
}: OptionListProps) => {
  return (
    <div className="mt-4 space-y-2">
      {options.map((option, optionIndex) => (
        <div className="flex rounded-lg border border-gray-200 px-2 py-1">
          <input
            key={optionIndex}
            value={option}
            onChange={(e) => onOptionChange(questionId, optionIndex, e.target.value)}
            placeholder={`Option ${optionIndex + 1}`}
            className="w-full outline-none text-sm"
          />
          <button
            type="button"
            className="flex items-center justify-center rounded-md p-1 hover:bg-gray-100 transition"
            onClick={() => onRemoveOption(questionId, optionIndex)}
          >
            <TrashIcon className="text-gray-400 w-4 h-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onAddOption(questionId)}
        className="text-sm text-purple-400 hover:text-purple-500"
      >
        + Add option
      </button>
    </div>
  );
};
