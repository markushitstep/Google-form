import { ButtonBack } from '../../components/ButtonBack';
import { PageLayout } from '../../components/PageLayout';
import { useFormResponses } from '../../features/formResponses/useFormResponse';

export const ResponsesPage = () => {
  const { form, isLoading, isError, responses } = useFormResponses();

  if (isLoading) {
    return <PageLayout>Loading responses...</PageLayout>;
  }

  if (isError || !form) {
    return <PageLayout>Failed to load responses</PageLayout>;
  }

  return (
    <PageLayout bgColor="white" width="w-2/3" bodyClassName="shadow-lg py-8 px-4 rounded-2xl">
      <ButtonBack />
      <div className="mb-8">
        <h1 className="text-3xl line-clamp-1 font-semibold">{form.title}</h1>
        <p className="mt-2 text-gray-500">
          {responses.length} response{responses.length === 1 ? '' : 's'}
        </p>
      </div>

      {responses.length === 0 ? (
        <p className="text-gray-500">No responses yet.</p>
      ) : (
        <div className="space-y-6">
          {responses.map((response, responseIndex) => (
            <div
              key={response.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow"
            >
              <h2 className="mb-4 text-lg font-semibold">Response {responseIndex + 1}</h2>

              <div className="space-y-4">
                {form.questions.map((question) => {
                  const answer = response.answers.find((item) => item.questionId === question.id);

                  return (
                    <div key={question.id}>
                      <p className="text-sm font-medium text-gray-700">{question.text}</p>

                      <p className="mt-1 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                        {answer?.value || 'No answer'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
};
