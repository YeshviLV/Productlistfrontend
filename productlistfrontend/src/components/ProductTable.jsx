import React, { useEffect, useState } from 'react';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the Fake Store API
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }

  return (
    <div className="overflow-x-auto px-6 py-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-light-gray text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Discounted Price</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{product.title}</td>
              <td className="px-4 py-2">
                <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
              </td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">${(product.price * 0.8).toFixed(2)}</td>
              <td className="px-4 py-2 text-sm">{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
