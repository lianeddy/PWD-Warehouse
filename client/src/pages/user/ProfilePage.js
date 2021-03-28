import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import noProfilePic from "../../assets/noProfilePic.png";
import {
	GeneralProfile,
	NewAddress,
	ProfilePic,
	TransactionItemModal,
} from "../../components/user";
import AddressCard from "../../components/user/AddressCard";
import {
	addToCartAction,
	changeQtyCartAction,
	postPaymentBill,
} from "../../redux/actions";

const ProfilePage = (props) => {
	const [lihatItem, setLihatItem] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState(null);

	const { provinsi, kota, kecamatan, kelurahan } = useSelector(
		(state) => state.daerahReducer
	);

	const { transactionData } = useSelector((state) => state.transactionReducer);

	const { isFinished, isLogin } = useSelector((state) => state.authReducer);

	const { cart } = useSelector((state) => state.cartReducer);

	const {
		id,
		name,
		username,
		email,
		phone,
		userAddress,
		imagepath,
	} = useSelector((state) => state.authReducer);

	const dispatch = useDispatch();

	const uploadImage = (e) => {
		console.log(e.target.files[0]);

		if (e.target.files[0]) {
			setImage({
				imageFile: e.target.files[0],
				imageName: e.target.files[0].name,
			});
		}
	};

	useEffect(() => {
		dispatch(uploadProfilePic({ image, userId: id }));
	}, [image]);
	const handleSubmitBtn = (transactionId) => {
		dispatch(postPaymentBill(transactionId, imagefile, id));
	};

	const [imagefile, setImagefile] = useState(null);
	const thirdButton = (status, index, transactionId) => {
		if (status === "Unpaid") {
			if (imagefile)
				return (
					<>
						<input
							// style={{ color: "rgba(0,0,0,0)" }}
							type="file"
							onChange={(e) => setImagefile(e.target.files[0])}
						/>
						<button onClick={() => handleSubmitBtn(transactionId)}>
							submit
						</button>
					</>
				);
			return (
				<input
					// style={{ color: "rgba(0,0,0,0)" }}
					type="file"
					onChange={(e) => setImagefile(e.target.files[0])}
				/>
			);
		}
		if (status === "Delivered" || status === "In Process") {
			return <button>Barang Sampai</button>;
		}
		if (status === "Canceled" || status === "Arrived") {
			return (
				<button
					onClick={() =>
						transactionData[index].products.map((val) => {
							const productId = val.productId;

							const find = cart.find((val) => {
								return val.product_id === productId;
							});

							if (find) {
								return dispatch(
									changeQtyCartAction({
										qty: find.qty + val.qty,
										id: find.id,
										userId: id,
									})
								);
							}

							dispatch(
								addToCartAction({
									productId: val.productId,
									userId: id,
									qty: val.qty,
								})
							);
						})
					}
				>
					Order Lagi
				</button>
			);
		}
	};

	const onClickLihatItem = (index) => {
		setLihatItem(!lihatItem);
		setSelectedTransaction(index);
	};

	if (isFinished && !isLogin) {
		return <Redirect to="/login" />;
	}

	return (
		<div>
			<div
				style={{
					display: "flex",
					padding: "48px",
					height: "1500px",
				}}
			>
				<div
					style={{
						height: "200px",
						width: "200px",
						flex: "1",
					}}
				>
					<div
						style={{
							fontWeight: "bold",
							fontSize: "36px",
						}}
					>
						Profile
					</div>
					<div
						style={{
							fontWeight: "bold",
							fontSize: "24px",
							margin: "14px 0 0 0",
						}}
					>
						Profile Picture
					</div>
					<div
						style={{
							margin: "14px 0 0 0",
						}}
					>
						<img
							src={!imagepath ? noProfilePic : `${apiUrl}${imagepath}`}
							style={{
								height: "200px",
								width: "200px",
								borderRadius: "100px",
								objectFit: "cover",
								border: "1px black solid",
							}}
						></img>
					</div>
					<input
						type="file"
						onChange={(e) => uploadImage(e)}
						style={{
							margin: "12px 0 0 0",
						}}
					<ProfilePic
						imagepath={imagepath}
						noProfilePic={noProfilePic}
						userId={id}
					/>
					<div
						style={{
							margin: "27px 0 0 0",
						}}
					>
						<GeneralProfile
							name={name}
							username={username}
							email={email}
							phone={phone}
						/>
					</div>
					<div
						style={{
							margin: "24px 0 0 0",
						}}
					>
						<div
							style={{
								fontSize: "24px",
								fontWeight: "bold",
								margin: "0 0 8px 0",
							}}
						>
							Address
						</div>
						<AddressCard userAddress={userAddress} userId={id} />
						<NewAddress
							id={id}
							provinsi={provinsi}
							kota={kota}
							kecamatan={kecamatan}
							kelurahan={kelurahan}
						/>
					</div>
				</div>
			</div>
					<div
						style={{
							fontSize: "24px",
							fontWeight: "bold",
							margin: "12px 0 8px 0",
						}}
					>
						Transaction
					</div>
					<div
						style={{
							padding: "0 24px",
						}}
					>
						<div
							style={{
								display: "flex",
								textAlign: "center",
							}}
						>
							<div
								style={{
									// backgroundColor: "red",
									width: "140px",
									margin: "18px 0 0 0",
								}}
							>
								Transaction Id
							</div>
							<div
								style={{
									// backgroundColor: "blue",
									width: "180px",
									margin: "18px 0 0 0",
								}}
							>
								Date
							</div>
							<div
								style={{
									// backgroundColor: "red",
									width: "170px",
									margin: "18px 0 0 0",
								}}
							>
								Invoice Number
							</div>
							<div
								style={{
									// backgroundColor: "blue",
									width: "180px",
									margin: "18px 0 0 0",
								}}
							>
								Status
							</div>
							<div
								style={{
									// backgroundColor: "blue",
									width: "140px",
									margin: "18px 0 0 0",
								}}
							>
								Total
							</div>
						</div>
					</div>
					<div>
						{transactionData.map((val, i) => {
							return (
								<div
									style={{
										backgroundColor: "white",
										boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
										borderRadius: "12.5px",
										padding: "18px 24px",
										margin: "18px 0 0 0",
									}}
								>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											textAlign: "center",
										}}
									>
										<div
											style={{
												// backgroundColor: "blue",
												width: "140px",
											}}
										>
											{val.transactionId}
										</div>
										<div
											style={{
												// backgroundColor: "red",
												width: "180px",
											}}
										>
											{val.date.split("T")[0]}
										</div>
										<div
											style={{
												// backgroundColor: "blue",
												width: "170px",
											}}
										>
											IVC101010101
										</div>
										<div
											style={{
												// backgroundColor: "red",
												width: "180px",
											}}
										>
											{val.orderStatus}
										</div>
										<div
											style={{
												// backgroundColor: "blue",
												width: "140px",
												margin: "0 24px 0 0",
											}}
										>
											Rp{val.amount.toLocaleString()}
										</div>
										<button
											style={{
												margin: "0 24px 0 0",
											}}
										>
											Lihat Invoice
										</button>
										<button
											style={{
												margin: "0 24px 0 0",
											}}
											onClick={() => onClickLihatItem(i)}
										>
											Detail
										</button>
										{thirdButton(val.orderStatus, i, val.transactionId)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<TransactionItemModal
				lihatItem={lihatItem}
				toggle={onClickLihatItem}
				data={transactionData}
				selected={selectedTransaction}
			/>
		</div>
	);
};

export default ProfilePage;
