import { Link } from 'react-router-dom';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface IProps {
  formId: string;
}

export const FormCard = ({ formId }: IProps) => {
  return (
    <Link
      to={`/forms/${formId}/fill`}
      className="cursor-pointer flex items-center justify-center bg-gray-200 h-62 rounded-2xl border-4 border-white hover:border-gray-300"
    >
      <DocumentIcon className="h-8 w-8 text-black-500" />
    </Link>
  );
};
