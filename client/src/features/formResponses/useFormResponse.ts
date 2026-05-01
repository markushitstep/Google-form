import { useParams } from 'react-router-dom';
import { useGetFormQuery, useGetResponsesQuery } from '../../services/formsApi';

export const useFormResponses = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: form,
    isLoading: isFormLoading,
    isError: isFormError,
  } = useGetFormQuery({ id: id ?? '' }, { skip: !id });

  const {
    data: responses = [],
    isLoading: isResponsesLoading,
    isError: isResponsesError,
  } = useGetResponsesQuery({ formId: id ?? '' }, { skip: !id });

  const isLoading = isFormLoading || isResponsesLoading;
  const isError = isFormError || isResponsesError;

  return {
    form,
    isLoading,
    isError,
    responses,
  };
};
