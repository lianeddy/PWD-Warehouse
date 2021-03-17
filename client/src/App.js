import React from 'react';
import { Header } from './components';
import { Route } from 'react-router-dom';
import { ChangePasswordPage, ForgetPasswordPage, RedirectPage } from './pages/user';

const App = () => {
  return (
    <div>
      <Header />
      <Route path="/forget-password" component={ForgetPasswordPage} />
      <Route path="/change-password" component={ChangePasswordPage} />
      <Route path="/redirect" component={RedirectPage} />
    </div>
  );
};

export default App;
