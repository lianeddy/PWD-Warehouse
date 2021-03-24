import { Drawer, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { LoaderPage } from "../../components";
import { UserFooter } from "../../components/user";
import { accentColor, primaryColor, surfaceColor } from "../../helpers";
import { changeMainAddressAction } from "../../redux/actions";
import Loader from "react-loader-spinner";

const CheckoutPage = () => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const { address, username, isLoading } = useSelector(
		(state) => state.authReducer
	);
	const { cart } = useSelector((state) => state.cartReducer);
	const mainAddress = address.find((value) => {
		return value.is_main === 1;
	});
	const [open, setOpen] = useState(false);
	const [localUsername, setLocalUsername] = useState("");
	const [localAddress, setLocalAddress] = useState("");
	const [localLabel, setLocalLabel] = useState("");
	const [localPhone, setLocalPhone] = useState("");
	useEffect(() => {
		if (!isLoading) {
			setLocalUsername(username);
			setLocalAddress(mainAddress.alamat_detail);
			setLocalLabel(mainAddress.label);
			setLocalPhone(mainAddress.phone);
		}
	}, [address]);
	const handleSetToMainAddressBtn = (mainAfterId) => {
		const payload = {
			mainBeforeId: mainAddress.id,
			mainAfterId,
		};
		dispatch(changeMainAddressAction(payload));
	};

	const handleSelectBtn = (value) => {
		setLocalAddress(value.alamat_detail);
		setLocalLabel(value.label);
		setLocalPhone(value.phone);
	};

	const renderList = () => {
		return cart.map((value) => {
			return (
				<div>
					<div style={{ display: "flex" }} key={value.id}>
						<div
							style={{
								width: "15%",
								height: 100,
								width: 100,
								backgroundColor: accentColor,
								borderRadius: 5,
							}}
						>
							<img
								src={value.image}
								alt="file_err"
								style={{
									backgroundColor: accentColor,
									borderRadius: 5,
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

	const renderAddress = () => {
		return address.map((value) => {
			return (
				<div
					key={value.id}
					style={{
						borderRadius: 10,
						boxShadow: "0 0 5px 0 rgba(0,0,0,0.3)",
						marginBottom: 5,
						paddingInline: 20,
						paddingBlock: 10,
						backgroundColor: primaryColor,
					}}
				>
					<div style={{ marginBottom: 10 }}>
						<div>
							{value.is_main === 1 ? (
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<div>
										<span>{username}</span>
										<span>({value.label})</span>
									</div>
									<div
										style={{
											fontSize: 8,
											boxShadow: "0 0 5px 0 rgba(0,0,0,0.15)",
											fontWeight: 600,
											borderRadius: 5,
											paddingInline: 5,
											border: "1px solid rgba(240, 165, 0)",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<div>primary</div>
									</div>
								</div>
							) : (
								<div>
									<span>{username}</span>
									<span>({value.label})</span>
								</div>
							)}
						</div>
						<div>{value.phone}</div>
						<div>{value.alamat_detail}</div>
					</div>
					<div>
						{value.alamat_detail === localAddress ? (
							<div>
								<Button className={styles.primaryBtn}>
									<div className={styles.primaryBtnChild}>selected</div>
								</Button>
							</div>
						) : (
							<div>
								<Button
									className={styles.whiteBtn}
									style={{ marginRight: 5 }}
									onClick={(e) => handleSelectBtn(value)}
								>
									<div className={styles.whiteBtnChild}>select</div>
								</Button>
								{value.is_main === 1 ? null : (
									<Button
										disabled={isLoading}
										className={styles.whiteBtn}
										onClick={(e) => handleSetToMainAddressBtn(value.id)}
									>
										<div className={styles.whiteBtnChild}>
											set to main address
										</div>
									</Button>
								)}
							</div>
						)}
					</div>
				</div>
			);
		});
	};

	const toggleDrawer = (event, isOpen) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setOpen(isOpen);
	};

	if (isLoading) return <LoaderPage />;

	return (
		<div>
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
								{localAddress === "" ? (
									<Loader type="ThreeDots" />
								) : (
									<div>
										<div
											className={styles.smallText}
											style={{ fontWeight: "bold" }}
										>
											{localUsername} (
											<span style={{ fontWeight: 600 }}>{localLabel}</span>)
										</div>
										<div className={styles.smallText}>{localPhone}</div>
										<div className={styles.smallText}>{localAddress}</div>
									</div>
								)}
								<div className={styles.divider}></div>
								<div style={{ display: "flex" }}>
									<Button
										className={styles.whiteBtn}
										onClick={(e) => toggleDrawer(e, true)}
									>
										<div className={styles.whiteBtnChildChangeAddress}>
											change address
										</div>
									</Button>
									<Drawer
										anchor="right"
										open={open}
										onClose={(e) => toggleDrawer(e, false)}
									>
										<div
											style={{
												width: "400px",
											}}
										>
											<div
												style={{
													backgroundColor: primaryColor,
													display: "flex",
													justifyContent: "center",
													paddingBlock: 20,
													boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)",
													fontWeight: 600,
													fontSize: 18,
													// marginBottom: 100,
												}}
											>
												<div>Change Address</div>
											</div>
											<div style={{ padding: 20 }}>{renderAddress()}</div>
											<div style={{ paddingTop: 32 }}>
												<div
													style={{
														position: "fixed",
														bottom: 0,
														width: "400px",
														backgroundColor: "red",
														color: "white",
														textAlign: "center",
													}}
												>
													<Button
														className={styles.primaryBtn}
														style={{ width: "100%", borderRadius: 0 }}
													>
														<div className={styles.primaryBtnChild}>
															+ Add New Address
														</div>
													</Button>
												</div>
											</div>
										</div>
									</Drawer>
								</div>
							</div>
						</div>
						<div style={{ backgroundColor: primaryColor, paddingBlock: 15 }}>
							<div>
								<div style={{ fontWeight: "bold" }}>Your Order</div>
								<div className={styles.divider}></div>
								<div>{renderList()}</div>
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
		</div>
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
