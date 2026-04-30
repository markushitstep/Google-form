import { createApi } from '@reduxjs/toolkit/query/react';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlClient = new GraphQLClient('http://localhost:4000/');

type Form = {
  id: string;
  title: string;
  description?: string;
};

type FormsResponse = {
  forms: Form[];
};

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
  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
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
      transformResponse: (response: FormsResponse) => response.forms,
    }),
  }),
});

export const { useGetFormsQuery } = formsApi;
