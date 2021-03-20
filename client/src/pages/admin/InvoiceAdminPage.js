import React from "react";

const InvoiceAdminPage = ({ current }) => {
	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: "pink",
				display: current === 2 ? "block" : "none",
			}}
		>
			<div>invoice</div>
		</div>
	);
};

export default InvoiceAdminPage;
