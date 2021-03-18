import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../redux/actions/productActions";
import { Input } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { apiUrl_product } from "../../helpers";
import Paginate from "react-reactstrap-pagination";
import { CardProduct } from "../../components/user";

const sortBy = [
	{ value: 1, label: "Terbaru" },
	{ value: 2, label: "Terlama" },
	{ value: 3, label: "Harga Terendah" },
	{ value: 4, label: "Harga Tertinggi" },
];

const ProductPage = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.productReducer);
	const [minimum, setMinimum] = useState("");
	const [maximum, setMaximum] = useState("");
	const [category, setCategory] = useState(0);
	const [categories, setCategories] = useState([]);
	const [sort, setSort] = useState(1);
	const [currentPage, setCurrentPage] = useState(0);

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

	const totalItem = products.length;
	const limit = 10;
	const offset = currentPage * limit;
	console.log(currentPage);
	const renderCard = () => {
		return products.slice(offset, offset + limit).map((value) => {
			return (
				<div>
					<div key={value.id}>
						<CardProduct
							name={value.name}
							price={value.price}
							description={value.description}
							category={value.category}
							stock={value.inventory}
						/>
					</div>
				</div>
			);
		});
	};

	return (
		<div>
			<div className="my-3">
				<Select
					isSearchable={false}
					options={sortBy}
					defaultValue={{ value: 1, label: "Terbaru" }}
					onChange={(e) => setSort(e.value)}
				/>
			</div>
			<div className="my-3">
				<Select
					isSearchable={false}
					options={categories}
					defaultValue={{ value: 0, label: "All" }}
					onChange={(e) => setCategory(e.value)}
				/>
			</div>
			<div className="mb-5">
				<div style={{ display: "flex" }} className="align-items-center">
					<div className="col-1">min price:</div>
					<Input
						placeholder="min"
						type="number"
						onChange={(e) => setMinimum(e.target.value)}
					/>
				</div>
				<div style={{ display: "flex" }} className="align-items-center">
					<div className="col-1">max price:</div>
					<Input
						placeholder="max"
						type="number"
						onChange={(e) => setMaximum(e.target.value)}
					/>
				</div>
			</div>
			<div>{renderCard()}</div>
			<Paginate
				totalItems={totalItem}
				pageSize={limit}
				onSelect={(e) => setCurrentPage(e - 1)}
			/>
		</div>
	);
};

export default ProductPage;
