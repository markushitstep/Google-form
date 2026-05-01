import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/Home/Home';
import { CreateFormPage } from '../pages/CreateForm/CreateForm';
import { FillFormPage } from '../pages/FillForm/FillForm';
import { ResponsesPage } from '../pages/Responses/Responses';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forms/new" element={<CreateFormPage />} />
        <Route path="/forms/:id/fill" element={<FillFormPage />} />
        <Route path="/forms/:id/responses" element={<ResponsesPage />} />
      </Routes>
    </BrowserRouter>
  );
};
