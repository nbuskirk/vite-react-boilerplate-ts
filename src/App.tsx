import './App.css';
import useData from 'hooks/useData';

const App = (): React.ReactNode => {
  const { data, error, isLoading } = useData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      hello world
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
