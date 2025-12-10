import React, { useEffect } from 'react';

const useProductData = (url) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response) {
          throw new Error('Failed to fetch product data!');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return { data, isLoading, error };
};

export default useProductData;
