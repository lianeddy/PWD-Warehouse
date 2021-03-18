import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/user";
import { ProductPage } from "./pages/user";
import { RegisterPage } from "./pages";

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

// ADD KEEPLOGIN TO FUNCTION COMPONENT

// import React, { Component } from "react";
// import { Route } from "react-router-dom";
// import { Header } from "./components/user";
// import { LandingPage, LoginPage } from "./pages";
// import { keepLoginAction } from "./redux/actions";
// import { connect } from "react-redux";

// class App extends Component {
// 	state = {};
// 	componentDidMount() {
// 		const { keepLoginAction } = this.props;
// 		const token = localStorage.getItem("token");
// 		if (token) {
// 			keepLoginAction();
// 		}
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<Header />
// 				<Route path="/" exact component={LandingPage} />
// 				<Route path="/login" component={LoginPage} />
// 			</div>
// 		);
// 	}
// }

// export default connect(null, { keepLoginAction })(App);
