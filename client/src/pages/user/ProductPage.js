import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../redux/actions";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { accentColor, apiUrl_product } from "../../helpers";
import Paginate from "react-reactstrap-pagination";
import { CardProduct, UserFooter } from "../../components/user";
import { RESET_INITIAL_STATE } from "../../redux/types";
import { Redirect } from "react-router-dom";

const sortBy = [
	{ value: 1, label: "Default sorting" },
	{ value: 2, label: "Sort by latest" },
	{ value: 3, label: "Sort by low price" },
	{ value: 4, label: "Sort by high price" },
];

const ProductPage = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.productReducer);
	const { isLogin, roleId } = useSelector((state) => state.authReducer);
	const [minimum, setMinimum] = useState("");
	const [maximum, setMaximum] = useState("");
	const [category, setCategory] = useState(0);
	const [categories, setCategories] = useState([]);
	const [sort, setSort] = useState(1);
	const [currentPage, setCurrentPage] = useState(0);

	const { wantToChangePass } = useSelector((state) => state.authReducer);

	if (wantToChangePass) {
		dispatch({
			type: RESET_INITIAL_STATE,
		});
	}

	useEffect(async () => {
		dispatch(getProductsAction());
		const response = await axios.get(`${apiUrl_product}/categories`);
		setCategories([{ value: 0, label: "All" }, ...response.data]);
	}, []);

	useEffect(() => {
		let query;
		if (minimum !== "") query = `min=${minimum}`;
		if (maximum !== "") query = `max=${maximum}`;
		if (maximum !== "" && minimum !== "")
			query = `min=${minimum}&max=${maximum}`;
		query += `&sort=${sort}`;
		if (category !== 0) query += `&category=${category}`;
		dispatch(getProductsAction(query));
	}, [minimum, maximum, sort, category]);

	// if (isLogin && roleId === 1) return <Redirect to="/admin" />;

	const totalItem = products.length;
	const limit = 12;
	const offset = currentPage * limit;
	const renderCard = () => {
		return products.slice(offset, offset + limit).map((value) => {
			return (
				<div
					key={value.id}
					style={{
						width: "24%",
						maxHeight: "24%",
						marginInline: 2,
						marginBottom: 4,
					}}
				>
					<CardProduct
						id={value.id}
						name={value.name}
						price={value.price}
						stock={value.stock}
						// image={value.image[0].imagepath}
					/>
				</div>
			);
		});
	};
	const renderCategory = () => {
		return categories.map((value) => {
			return (
				<div
					key={value.value}
					style={{
						lineHeight: 2.5,
						borderBottom: "1px solid rgba(0,0,0,0.1)",
						cursor: "pointer",
					}}
					onClick={(e) => setCategory(value.value)}
				>
					<div style={{ textTransform: "uppercase" }}>{value.label}</div>
				</div>
			);
		});
	};
	return (
		<>
			<div style={{ paddingBlock: 50, paddingInline: 200 }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: 30,
					}}
				>
					<div>Home / Shop</div>
					<div
						style={{
							width: "50%",
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<div className="mr-4">
							Showing {offset + 1} -{" "}
							{totalItem > 12 ? offset + limit : totalItem} of {totalItem}{" "}
							results
						</div>
						<div style={{ width: "50%" }}>
							<Select
								isSearchable={false}
								options={sortBy}
								defaultValue={{ value: 1, label: "Default sort" }}
								onChange={(e) => setSort(e.value)}
							/>
						</div>
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div
						style={{
							// backgroundColor: accentColor,
							width: "25%",
							minHeight: "500px",
						}}
					>
						<div style={{ marginBottom: 20 }}>
							<InputGroup>
								<Input placeholder="search" style={{ paddingInline: 20 }} />
								<InputGroupAddon addonType="append">
									<InputGroupText
										style={{
											backgroundColor: accentColor,
											borderWidth: 0,
											cursor: "pointer",
										}}
									>
										<i className="bi bi-search"></i>
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</div>
						<div>
							<div style={{ marginBottom: 10 }}>
								<div
									style={{
										textTransform: "uppercase",
										fontSize: 18,
										fontWeight: "bold",
									}}
								>
									categories
								</div>
							</div>
							<div
								className="d-flex justify-content-end"
								style={{ marginBottom: 20 }}
							>
								<div
									style={{
										backgroundColor: "rgba(0,0,0,0.3)",
										width: "75%",
										height: 3,
									}}
								></div>
							</div>
							<div style={{ marginBottom: 30 }}>{renderCategory()}</div>
							<div style={{ marginBottom: 10 }}>
								<div
									style={{
										textTransform: "uppercase",
										fontSize: 18,
										fontWeight: "bold",
									}}
								>
									filter by price
								</div>
							</div>
							<div
								className="d-flex justify-content-end"
								style={{ marginBottom: 20 }}
							>
								<div
									style={{
										backgroundColor: "rgba(0,0,0,0.3)",
										width: "75%",
										height: 3,
									}}
								></div>
							</div>
							<div style={{ display: "flex", alignItems: "center" }}>
								<div>
									<Input
										placeholder="min"
										type="number"
										onChange={(e) => setMinimum(e.target.value)}
									/>
								</div>
								<div style={{ marginInline: 10 }}>
									<div>to</div>
								</div>
								<div>
									<Input
										placeholder="max"
										type="number"
										onChange={(e) => setMaximum(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						style={{
							width: "72%",
							minHeight: "500px",
						}}
					>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "space-evenly",
								marginBottom: 50,
							}}
						>
							{renderCard()}
						</div>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							<Paginate
								totalItems={totalItem}
								pageSize={limit}
								onSelect={(e) => setCurrentPage(e - 1)}
							/>
						</div>
					</div>
				</div>
			</div>
			<UserFooter />
		</>
	);
};

export default ProductPage;
