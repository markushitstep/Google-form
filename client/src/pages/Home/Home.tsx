import { PlusIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useGetFormsQuery } from '../../services/formsApi';
import { PageLayout } from '../../components/PageLayout';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ToggleButton } from '../../components/UI/ToggleButton';

export function HomePage() {
  const { data: forms = [], error } = useGetFormsQuery();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error('Failed to load forms');
    }
  }, [error]);

  return (
    <PageLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Create forms</h1>

        {forms.length > 4 && (
          <ToggleButton isOpen={isExpanded} onClick={() => setIsExpanded((prev) => !prev)} />
        )}
      </div>
      <div className="grid gap-10 grid-cols-5 grid-row-1">
        <Link
          to={`/forms/new`}
          className="cursor-pointer flex items-center justify-center bg-gray-200 h-62 rounded-2xl border-4 border-white hover:border-gray-300"
        >
          <PlusIcon className="h-16 w-16 text-black-500" />
        </Link>

        {(isExpanded ? forms : forms.slice(0, 4)).map((form) => {
          return (
            <Link
              key={form.id}
              to={`/forms/${form.id}/fill`}
              className="cursor-pointer flex items-center justify-center bg-gray-200 h-62 rounded-2xl border-4 border-white hover:border-gray-300"
            >
              <DocumentIcon className="h-8 w-8 text-black-500" />
            </Link>
          );
        })}
      </div>
    </PageLayout>
  );
}
