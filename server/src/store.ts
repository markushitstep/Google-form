import { Form, FormResponse } from './types.js';

export const forms: Form[] = [];
export const responses: FormResponse[] = [];
export const createId = () => crypto.randomUUID();
