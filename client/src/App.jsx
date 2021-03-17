import React from 'react';
import { Header } from './components/user/';
import { Route } from 'react-router-dom';
import { ChangePasswordPage, ForgetPasswordPage, RegisterPage, HomePage, RedirectPage } from './pages/user';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <div>
      <Header />
      <Route path="/home" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forget-password" component={ForgetPasswordPage} />
      <Route path="/change-password" component={ChangePasswordPage} />
      <Route path="/redirect" component={RedirectPage} />
    </div>
  );
};

export default App;
