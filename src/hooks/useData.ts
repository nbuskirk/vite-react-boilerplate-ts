import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData
  });
  return { data, error, isLoading };
};

export default useData;
