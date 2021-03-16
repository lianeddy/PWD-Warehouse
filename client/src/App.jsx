import React from 'react';
import { Header } from './client/components';
import { Route } from 'react-router-dom';
import { RegisterPage } from './client/pages';

const App = () => {
  return (
    <div>
      <Header />
      <Route path="/register" component={RegisterPage} />
    </div>
  );
};

export default App;
