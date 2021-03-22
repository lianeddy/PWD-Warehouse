import React from "react";

const ProductAdminPage = ({ current }) => {
	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: "teal",
				display: current === 1 ? "block" : "none",
			}}
		>
			<div>product</div>
		</div>
	);
};

export default ProductAdminPage;
