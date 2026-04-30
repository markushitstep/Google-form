import { useGetFormsQuery } from './api/formsApi';
import './App.css';

function App() {
  const { data: forms, isLoading, error } = useGetFormsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(forms);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
