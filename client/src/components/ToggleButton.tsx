import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface IProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ToggleButton = ({ isOpen, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100 transition"
    >
      {isOpen ? (
        <ChevronUpIcon className="h-6 w-6 text-black hover:text-gray-500" />
      ) : (
        <ChevronDownIcon className="h-6 w-6 text-black hover:text-gray-500" />
      )}
    </button>
  );
};
