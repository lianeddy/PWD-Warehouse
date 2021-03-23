import React, { Component } from "react";
import queryString from "querystring";
import { connect } from "react-redux";
import {
	getProductById,
	addToCartAction,
	getProductsAction,
	changeQtyCartAction,
} from "../../redux/actions";
import { Button } from "reactstrap";
import Fade from "react-reveal/Fade";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class DetailProductPage extends Component {
	state = {
		data: {},
		qtySelected: 1,
		stockMinCart: 0,
	};

	componentDidMount() {
		this.props.getProductsAction();
		const { getProductById } = this.props;
		const product_id = queryString.parse(this.props.location.search)["?id"];
		getProductById(product_id);
	}

	componentDidUpdate(prevProps, prevState) {
		const { data } = this.state;
		const { productById, cart } = this.props;
		if (productById !== prevProps.productById) {
			this.setState({
				data: productById,
			});
		}
		if (prevState.data !== data) {
			const { data } = this.state;
			let result = cart.find((val) => {
				return val.name === data.name;
			});
			if (result) {
				this.setState({
					stockMinCart: productById.stock - result.qty,
				});
			} else {
				this.setState({
					stockMinCart: productById.stock,
				});
			}
		}
	}

	increaseQty = () => {
		this.setState({
			qtySelected: this.state.qtySelected + 1,
		});
	};

	decreaseQty = () => {
		this.setState({
			qtySelected: this.state.qtySelected - 1,
		});
	};

	addToCart = () => {
		const {
			productById,
			userId,
			isLogin,
			addToCartAction,
			changeQtyCartAction,
			cart,
		} = this.props;
		if (!isLogin)
			return Swal.fire({
				title: "You Haven't Signed In Yet!",
				text: `Please Sign In to Buy Something`,
				icon: "warning",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
		const existProduct = cart.find(
			(value) => value.product_id === productById.id
		);
		if (existProduct) {
			const payload = {
				userId,
				id: existProduct.id,
				qty: existProduct.qty + this.state.qtySelected,
			};
			changeQtyCartAction(payload);
		} else {
			const payload = {
				productId: productById.id,
				qty: this.state.qtySelected,
				userId,
			};
			addToCartAction(payload);
		}
	};

	render() {
		const { stockMinCart } = this.state;
		const {
			id,
			name,
			price,
			image,
			description,
			stock,
		} = this.props.productById;
		const { cart } = this.props;
		let res = cart.find((val) => {
			return val.name === name;
		});

		return (
			<div className="container">
				<div>
					<Link to="/">Home </Link>
					<span>/</span>
					<Link to="/products">Products </Link>
					<span>/</span>
					{name}
				</div>
				<div className="row">
					<div className="col-4">
						<div>
							<Fade bottom>
								<img src={image} alt={`${name}.jpg`} height="300px" />
							</Fade>
						</div>
					</div>
					<div className="col-8">
						<div>
							<h1>{name}</h1>
						</div>
						<div>
							<h4>Rp. {price ? price.toLocaleString() : null}</h4>
						</div>
						<div>Available: {stock}</div>
						<div>{description}</div>
						<div>
							<Button
								color="info"
								onClick={this.decreaseQty}
								disabled={this.state.qtySelected === 1}
							>
								-
							</Button>
							<span className="mx-2">{this.state.qtySelected}</span>
							<Button
								color="info"
								onClick={this.increaseQty}
								disabled={stockMinCart === this.state.qtySelected}
							>
								+
							</Button>
						</div>
						<div>
							<Button onClick={this.addToCart} color="info">
								Add to Cart
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = ({ authReducer, productReducer, cartReducer }) => {
	return {
		productById: productReducer.productById,
		userId: authReducer.id,
		isLogin: authReducer.isLogin,
		cart: cartReducer.cart,
	};
};

export default connect(mapStatetoProps, {
	getProductById,
	addToCartAction,
	getProductsAction,
	changeQtyCartAction,
})(DetailProductPage);
