import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const ButtonBack = () => {
  return (
    <Link to="/" className="mb-1 flex items-center text-sm hover:text-gray-500">
      <ArrowLeftIcon className="h-8 w-8" />
    </Link>
  );
};
