import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/user';
import { ProductPage } from './pages/user';
import { RegisterPage } from './pages';

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
