import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://192.168.1.7:5000'); // Replace with your server URL
console.log("socket",socket)

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial product data from the API
    fetch('http://192.168.1.7:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching products');
        setLoading(false);
      });

    // Listen for the 'updatePositions' event to update product data in real-time
    socket.on('updateProducts', ( shuffledProducts) => {
      setProducts(shuffledProducts); // Update the product list with new data
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('updateProducts');
    };
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }

  return (
    <div className="px-0 py-0">
      {/* Compact grid layout */}
      <div className="flex flex-wrap">
        {products.slice(0, 100).map((product) => (
          <div key={product.id} className="flex items-center w-1/12 p-0 border border-gray-300">
            {/* Image on the left */}
            <div className="w-12 h-12 bg-gray-200 overflow-hidden flex-shrink-0">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Data on the right */}
            <div className="ml-1 flex-1">
              <h3 className="text-[9px] font-semibold">{product.name}</h3>
              <p className="text-[9px]">{product.category.name}</p>
              <h3 className="text-[9px] font-semibold">{product.position}</h3>
              <div className="flex text-[9px]">
                <p className="mr-1">${product.price}</p>
                <p className="mr-1">${product.discount}</p>
                <p>${product.discountedPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;


// import React, { useEffect, useState } from 'react';

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://192.168.1.7:5000/api/products')
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//         console.log(data);
//       })
//       .catch((err) => {
//         setError('Error fetching products');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="text-center py-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-6 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="px-6 py-4">

//       <div className="hidden sm:block overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-light-gray text-left">
//               <th className="px-4 py-2">Image</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Category</th>
//               <th className="px-4 py-2">Price</th>
//               <th className="px-4 py-2">Discount</th>
//               <th className="px-4 py-2">Discounted Price</th>
//               <th className="px-4 py-2">Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="border-b hover:bg-gray-100">
//                 <td className="px-4 py-2">
//                   <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
//                     <img
//                       src={product.imageUrl}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </td>
//                 <td className="px-4 py-2">{product.name}</td>
//                 <td className="px-4 py-2">{product.category.name}</td>
//                 <td className="px-4 py-2">${product.price}</td>
//                 <td className="px-4 py-2">${product.discount}</td>
//                 <td className="px-4 py-2">${product.discountedPrice
//                 }</td>
//                 <td className="px-4 py-2 text-sm">{product.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile view: Stack the content vertically */}
//       <div className="sm:hidden">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white border-b p-4">
//             <div className="flex flex-col space-y-2">
//               <div className="flex justify-between items-center">
//                 <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="flex-1 pl-4">
//                     {console.log("product", product)}
//                   <h3 className="font-semibold">{product.name}</h3>
//                   <p className="text-sm text-gray-600">{product.category.name}</p>
//                   <p className="text-sm text-gray-600">${product.price}</p>
//                   <p className="text-sm text-gray-600">${(product.price * 0.8).toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductTable;

