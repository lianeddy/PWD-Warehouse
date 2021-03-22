import React from "react";
import { Link } from "react-router-dom";

const ProcessCartCard = ({ cart }) => {
	let total = 0;

	cart.forEach((val) => {
		total += val.qty * val.price;
	});

	return (
		<>
			<div
				style={{
					backgroundColor: "white",
					height: "114px",
					width: "400px",
					padding: "24px",
					borderRadius: "12.5px 12.5px 0 0",
				}}
			>
				<div
					style={{
						fontSize: "24px",
						fontWeight: "bold",
						margin: "-9px 0 0px 0",
					}}
				>
					Total Belanja
				</div>
				<div
					style={{
						fontSize: "36px",
						fontWeight: "bold",
					}}
				>
					Rp{total.toLocaleString()}
				</div>
			</div>
			<div
				style={{
					height: "98px",
					width: "400px",
					display: "flex",
				}}
			>
				<Link
					to="/payment-and-shipping"
					style={{
						display: "flex",
						backgroundColor: "#61b15a",
						width: "100%",
						height: "50px",
						fontSize: "24px",
						borderRadius: "0 0 12.5px 12.5px",
						border: "none",
						cursor: "pointer",
						color: "white",
						textDecoration: "none",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Process
				</Link>
			</div>
		</>
	);
};

export default ProcessCartCard;
