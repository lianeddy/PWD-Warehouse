import React from 'react';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { ProductPage, RegisterPage } from './pages';

const App = () => {
  return (
    <div>
      <Header />
      <Route path="/register" component={RegisterPage} />
      <Route path="/products" component={ProductPage} />
    </div>
  );
};

export default App;
