import React from 'react';
import Header from './components/Header';
import ProductTable from './components/ProductTable';

const App = () => {
  return (
    <div className="bg-light-gray min-h-screen">
      <Header />
      <ProductTable />
    </div>
  );
};

export default App;
