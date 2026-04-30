import { createApi } from '@reduxjs/toolkit/query/react';
import { GraphQLClient, gql } from 'graphql-request';
import type {
  CreateFormMutation,
  CreateFormMutationVariables,
  FormQuery,
  FormQueryVariables,
  FormsQuery,
  ResponsesQuery,
  ResponsesQueryVariables,
  SubmitResponseMutation,
  SubmitResponseMutationVariables,
} from './graphql.generated';

const graphqlClient = new GraphQLClient('http://localhost:4000/');

const graphqlBaseQuery =
  () =>
  async ({ document, variables }: { document: string; variables?: Record<string, unknown> }) => {
    try {
      const result = await graphqlClient.request(document, variables);

      return { data: result };
    } catch (error) {
      return { error };
    }
  };

export const formsApi = createApi({
  reducerPath: 'formsApi',
  baseQuery: graphqlBaseQuery(),
  tagTypes: ['Forms', 'Form', 'Responses'],
  endpoints: (builder) => ({
    getForms: builder.query<FormsQuery['forms'], void>({
      query: () => ({
        document: gql`
          query Forms {
            forms {
              id
              title
              description
            }
          }
        `,
      }),
      transformResponse: (response: FormsQuery) => response.forms,
      providesTags: ['Forms'],
    }),

    getForm: builder.query<FormQuery['form'], FormQueryVariables>({
      query: () => ({
        document: gql`
          query Form($id: ID!) {
            form(id: $id) {
              id
              title
              description
              questions {
                id
                text
                type
                options
              }
            }
          }
        `,
      }),
      transformResponse: (response: FormQuery) => response.form,
      providesTags: (_result, _error, variables) => [{ type: 'Form', id: variables.id }],
    }),

    getResponses: builder.query<ResponsesQuery['responses'], ResponsesQueryVariables>({
      query: () => ({
        document: gql`
          query Responses($formId: ID!) {
            responses(formId: $formId) {
              id
              formId
              answers {
                questionId
                value
              }
            }
          }
        `,
      }),
      transformResponse: (response: ResponsesQuery) => response.responses,
      providesTags: (_result, _error, variables) => [{ type: 'Responses', id: variables.formId }],
    }),

    createForm: builder.mutation<CreateFormMutation['createForm'], CreateFormMutationVariables>({
      query: (body) => ({
        document: gql`
          mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
            createForm(title: $title, description: $description, questions: $questions) {
              id
              title
              description
            }
          }
        `,
        variables: body,
      }),
      invalidatesTags: ['Forms'],
    }),

    submitResponse: builder.mutation<
      SubmitResponseMutation['submitResponse'],
      SubmitResponseMutationVariables
    >({
      query: (variables) => ({
        document: gql`
          mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
            submitResponse(formId: $formId, answers: $answers) {
              id
              formId
              answers {
                questionId
                value
              }
            }
          }
        `,
        variables,
      }),
      invalidatesTags: (_result, _error, variables) => [
        { type: 'Responses', id: variables.formId },
      ],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useGetResponsesQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
} = formsApi;
