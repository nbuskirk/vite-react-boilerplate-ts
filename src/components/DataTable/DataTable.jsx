/*

Requirements: Create a data table component that fetches data from an API and displays it in a tabular format using React. 
The component should handle loading states and errors gracefully.

Use CSS for styling the table to make it visually appealing.

Limit third party libraries to only React and standard web APIs.

*/
import useProductData from 'hooks/useProductData';
import './DataTableStyles.css';

const DataTable = () => {
  const { data, isLoading, error } = useProductData(
    'https://dummyjson.com/products/search?q=phone'
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <ul>
      {data?.products.map((product) => (
        <li key={product.id}>
          {product.id} - {product.title} - ${product.price}
        </li>
      ))}
    </ul>
  );
};

export default DataTable;
