import { Link } from 'react-router-dom';

interface IProps {
  id: string;
  title: string;
  description?: string | null;
}

export const FormCard = ({ id, title, description }: IProps) => {
  return (
    <div className="flex h-62 flex-col justify-between rounded-2xl border-4 border-purple-300 bg-gray-200 p-5 transition hover:border-purple-400">
      <div className="flex flex-col justify-center items-center">
        <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">{title}</h2>

        <p className="mt-2 line-clamp-3 text-sm text-gray-500">{description || 'No description'}</p>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/forms/${id}/fill`}
          className="rounded-lg bg-purple-300 px-3 py-2 text-sm font-medium text-white transition hover:bg-purple-400"
        >
          View Form
        </Link>

        <Link
          to={`/forms/${id}/responses`}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-purple-400 hover:text-purple-400"
        >
          View Responses
        </Link>
      </div>
    </div>
  );
};
