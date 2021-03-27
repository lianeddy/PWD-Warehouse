import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { apiUrl } from "../../helpers";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		// border: "2px solid #000",
		boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
		// padding: theme.spacing(2, 4, 3),
		padding: "0 36px 36px 36px",
	},
}));

const TransactionItemModal = ({ lihatItem, toggle, data, selected }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(lihatItem);
	}, [lihatItem]);

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={toggle}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<div
							style={{
								fontSize: "24px",
								fontWeight: "bold",
								margin: "27px 0 15px 0",
							}}
						>
							Detail Transaksi
						</div>
						<div
							style={{
								display: "flex",
								width: "1000px",
								margin: "0 0 20px 0",
							}}
						>
							<div
								style={{
									// backgroundColor: "blue",
									flex: "5",
								}}
							>
								<div>Nama Penerima:</div>
								<div
									style={{
										margin: "0 0 12px 0",
									}}
								>
									Luthfi Ahmad Robbaniy
								</div>
								<div>Tanggal Transaksi:</div>
								<div
									style={{
										margin: "0 0 12px 0",
									}}
								>
									{data[selected] ? data[selected].date.split("T")[0] : "-"}
								</div>
								<div>Alamat Pengiriman:</div>
								<div>
									Perumahan Karawang Indah, Jl. Merpati 2 Blok J/5, Kabupaten
									Karawang, Jawa Barat
								</div>
							</div>
							<div
								style={{
									// backgroundColor: "red",
									flex: "3",
								}}
							>
								<div>
									<div>Total Pembayaran:</div>
									<div
										style={{
											margin: "0 0 12px 0",
										}}
									>
										{data[selected]
											? `Rp${data[selected].amount.toLocaleString()}`
											: "-"}
									</div>
									<div>Metode Pembayaran:</div>
									<div
										style={{
											margin: "0 0 12px 0",
										}}
									>
										Transfer Bank
									</div>
									<div>Status Transaksi:</div>
									<div>{data[selected] ? data[selected].orderStatus : "-"}</div>
								</div>
							</div>
						</div>
						<div
							style={{
								fontSize: "24px",
								fontWeight: "bold",
								margin: "-2px 0 15px 0",
							}}
						>
							Product List
						</div>
						<div
							style={{
								// backgroundColor: "red",
								height: "250px",
								overflow: "auto",
							}}
						>
							{data[selected]
								? data[selected].products.map((val) => {
										return (
											<div
												style={{
													display: "flex",
													backgroundColor: "white",
													boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
													margin: "24px 0 24px 0",
												}}
											>
												<div>
													<img
														style={{
															height: "150px",
															width: "150px",
														}}
														src={`http://localhost:2000/${val.imagepath}`}
													></img>
												</div>
												<div
													style={{
														margin: "0 0 0 24px",
														display: "flex",
														flexDirection: "column",
														justifyContent: "center",
													}}
												>
													<div
														style={{
															fontSize: "24px",
															fontWeight: "bold",
															margin: "0 0 -4px 0",
														}}
													>
														{val.name}
													</div>
													<div
														style={{
															margin: "0 0 11px 0",
														}}
													>
														Rp{val.price.toLocaleString()}
													</div>
													<div>{val.qty} buah</div>
												</div>
											</div>
										);
								  })
								: null}
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default TransactionItemModal;
