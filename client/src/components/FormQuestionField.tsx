import type { FormQuery } from '../services/graphql.generated';

interface IProps {
  question: FormQuery['form']['questions'][number];
  index: number;
  value: string | string[] | undefined;
  onTextChange: (id: string, value: string) => void;
  onCheckboxChange: (id: string, option: string, checked: boolean) => void;
}

export const FormQuestionField = ({
  question,
  index,
  value,
  onTextChange,
  onCheckboxChange,
}: IProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 shadow">
      <h2 className="mb-4 text-lg font-medium">
        {index + 1}. {question.text}
      </h2>

      {/* TEXT */}
      {question.type === 'TEXT' && (
        <input
          value={(value as string) || ''}
          onChange={(e) => onTextChange(question.id, e.target.value)}
          placeholder="Your answer"
          className="w-full rounded-lg border border-purple-300 p-2 outline-none focus:border-purple-400"
        />
      )}

      {/* DATE */}
      {question.type === 'DATE' && (
        <input
          type="date"
          value={(value as string) || ''}
          onChange={(e) => onTextChange(question.id, e.target.value)}
          className="border p-2 rounded-lg outline-none border-purple-300 focus:border-purple-400"
        />
      )}

      {/* RADIO */}
      {question.type === 'MULTIPLE_CHOICE' && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name={question.id}
                checked={value === option}
                onChange={() => onTextChange(question.id, option)}
                className="h-4 w-4 accent-purple-400"
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {/* CHECKBOX */}
      {question.type === 'CHECKBOX' && (
        <div className="space-y-2">
          {question.options.map((option) => {
            const arr = Array.isArray(value) ? value : [];

            return (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={arr.includes(option)}
                  onChange={(e) => onCheckboxChange(question.id, option, e.target.checked)}
                  className="h-4 w-4 accent-purple-400"
                />
                {option}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};
