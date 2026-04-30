import { forms, responses } from './store.js';
import { Answer, Form, FormResponse, QuestionType } from './types.js';
import { createId } from './store.js';

export const resolvers = {
  Query: {
    forms: () => forms,

    form: (_: unknown, args: { id: string }) => {
      return forms.find((form) => form.id === args.id) ?? null;
    },

    responses: (_: unknown, args: { formId: string }) => {
      return responses.filter((response) => response.formId === args.formId);
    },
  },
  Mutation: {
    createForm: (
      _: unknown,
      args: {
        title: string;
        description?: string;
        questions?: {
          text: string;
          type: QuestionType;
          options?: string[];
        }[];
      },
    ) => {
      const form: Form = {
        id: createId(),
        title: args.title,
        description: args.description,
        questions:
          args.questions?.map((question) => ({
            id: createId(),
            text: question.text,
            type: question.type,
            options: question.options ?? [],
          })) ?? [],
      };

      forms.push(form);

      return form;
    },

    submitResponse: (
      _: unknown,
      args: {
        formId: string;
        answers: Answer[];
      },
    ) => {
      const form = forms.find((form) => form.id === args.formId);

      if (!form) {
        throw new Error('Form not found');
      }

      const response: FormResponse = {
        id: createId(),
        formId: args.formId,
        answers: args.answers,
      };

      responses.push(response);

      return response;
    },
  },
};
