import { makeStyles } from "@material-ui/core";
import React from "react";
import { Button } from "reactstrap";
import { UserFooter } from "../../components/user";
import { accentColor, primaryColor, surfaceColor } from "../../helpers";

const data = [
	{
		id: 1,
		name: "a",
		qty: 100,
		price: 200000,
		weight: 500,
		image:
			"https://upload.wikimedia.org/wikipedia/commons/4/47/VU-Banana-1000x1000.png",
	},
	{
		id: 2,
		name: "b",
		qty: 50,
		price: 100000,
		weight: 800,
		image: "https://i.redd.it/w0lmb8i7odo51.png",
	},
	{
		id: 3,
		name: "c",
		qty: 150,
		price: 5000,
		weight: 100,
		image: "https://i.redd.it/5rgmp68wr5041.png",
	},
];

const CheckoutPage = () => {
	const styles = useStyles();

	const renderList = () => {
		return data.map((value) => {
			return (
				<div>
					<div style={{ display: "flex" }} key={value.id}>
						<div style={{ width: "15%" }}>
							<img
								src={value.image}
								alt="file_err"
								style={{
									objectFit: "contain",
									height: 100,
									width: 100,
								}}
							/>
						</div>
						<div
							style={{
								width: "85%",
								paddingLeft: 20,
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<div style={{ width: "80%" }}>
								<div>{value.name}</div>
								<div>1 item ({value.weight} gr)</div>
								<div>
									Rp{value.price.toLocaleString()} x {value.qty}
								</div>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									width: "20%",
									justifyContent: "flex-end",
								}}
							>
								<Button
									style={{ paddingInline: 5, paddingBlock: 0 }}
									className={styles.primaryBtn}
								>
									<div className={styles.primaryBtnChild}>-</div>
								</Button>
								<div className="mx-2">
									<div>{value.qty}</div>
								</div>
								<Button
									style={{ paddingInline: 5, paddingBlock: 0 }}
									className={styles.primaryBtn}
								>
									<div className={styles.primaryBtnChild}>+</div>
								</Button>
							</div>
						</div>
					</div>
					<div className={styles.divider}></div>
				</div>
			);
		});
	};

	return (
		<>
			<div
				style={{
					paddingInline: 250,
					paddingBlock: 50,
					backgroundColor: primaryColor,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: 30,
					}}
				>
					<div style={{ fontSize: 20, color: "gray" }}>
						Your Cart {">"} Checkout {">"} Process
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div style={{ width: "65%", backgroundColor: "rgba(0,0,0,0.1)" }}>
						<div
							style={{
								backgroundColor: primaryColor,
								marginBottom: 5,
								paddingBlock: 15,
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: 20,
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: "bold",
										textTransform: "uppercase",
									}}
								>
									billing & shipping
								</div>
							</div>
							<div>
								<div style={{ fontWeight: "bold" }}>Shipping Address</div>
								<div className={styles.divider}></div>
								<div>
									<div
										className={styles.smallText}
										style={{ fontWeight: "bold" }}
									>
										Razak <span style={{ fontWeight: "normal" }}>(rumah)</span>
									</div>
									<div className={styles.smallText}>087886498</div>
									<div className={styles.smallText}>Perum.pakujaya permai</div>
								</div>
								<div className={styles.divider}></div>
								<div style={{ display: "flex" }}>
									<Button className={styles.whiteBtn}>
										<div className={styles.whiteBtnChildChangeAddress}>
											change address
										</div>
									</Button>
								</div>
							</div>
						</div>
						<div style={{ backgroundColor: primaryColor, paddingBlock: 15 }}>
							<div>
								<div style={{ fontWeight: "bold" }}>Your Order</div>
								<div className={styles.divider}></div>
								<div>{renderList()}</div>
								<div className={styles.divider}></div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										fontWeight: 600,
									}}
								>
									<div>Subtotal</div>
									<div>Rp9090909</div>
								</div>
							</div>
						</div>
						<div
							style={{
								width: "100%",
								height: 5,
								backgroundColor: "rgba(0,0,0,0.1)",
							}}
						></div>
					</div>
					<div
						style={{
							width: "30%",
							backgroundColor: "rgba(0,0,0,0.1)",
							boxShadow: "0 0 5px 0 rgba(0,0,0,0.15)",
							borderRadius: 10,
							height: "100%",
						}}
					>
						<div
							style={{
								backgroundColor: primaryColor,
								marginBottom: 5,
								padding: 20,
								borderTopLeftRadius: 10,
								borderTopRightRadius: 10,
							}}
						>
							<div style={{ marginBottom: 5 }}>
								<Button style={{ width: "100%" }} className={styles.whiteBtn2}>
									<div className={styles.whiteBtnChild}>Shipping</div>
								</Button>
							</div>
							<div>
								<Button style={{ width: "100%" }} className={styles.whiteBtn2}>
									<div className={styles.whiteBtnChild}>Payment Method</div>
								</Button>
							</div>
						</div>
						<div
							style={{
								backgroundColor: primaryColor,
								padding: 20,
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
							}}
						>
							<div style={{ fontWeight: 600, marginBottom: 10 }}>Shopping</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									lineHeight: 1.7,
									fontSize: 14,
								}}
							>
								<div>total price</div>
								<div>rp1232123</div>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									lineHeight: 1.7,
									fontSize: 14,
								}}
							>
								<div>shipping cost</div>
								<div>rp123</div>
							</div>
							<div className={styles.divider}></div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: 30,
								}}
							>
								<div style={{ fontSize: 18, fontWeight: 600 }}>Billing</div>
								<div
									style={{
										fontSize: 18,
										fontWeight: 600,
										color: "rgba(250, 89, 29)",
									}}
								>
									Rp700000
								</div>
							</div>
							<div>
								<Button style={{ width: "100%" }} className={styles.primaryBtn}>
									<div className={styles.primaryBtnChild}>Process</div>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<UserFooter />
		</>
	);
};

const useStyles = makeStyles({
	divider: {
		height: 1,
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.3)",
		marginBlock: 15,
	},
	smallText: {
		fontSize: 13,
	},
	whiteBtn: {
		backgroundColor: primaryColor,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.1)",
	},
	whiteBtn2: {
		paddingBlock: 10,
		backgroundColor: primaryColor,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.1)",
	},
	primaryBtn: {
		paddingBlock: 10,
		backgroundColor: accentColor,
		borderWidth: 0,
		// borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.2)",
	},
	whiteBtnChildChangeAddress: {
		textTransform: "",
		color: "black",
		fontSize: 13,
		fontWeight: 600,
	},
	whiteBtnChild: {
		textTransform: "",
		color: "black",
		fontSize: 14,
		fontWeight: 600,
	},
	primaryBtnChild: {
		textTransform: "",
		color: "black",
		fontSize: 14,
		fontWeight: 600,
	},
});

export default CheckoutPage;
