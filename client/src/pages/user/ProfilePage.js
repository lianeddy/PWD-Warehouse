import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noProfilePic from "../../assets/noProfilePic.png";
import { GeneralProfile, NewAddress } from "../../components/user";
import AddressCard from "../../components/user/AddressCard";
import { apiUrl } from "../../helpers";
import { uploadProfilePic } from "../../redux/actions";

const ProfilePage = (props) => {
	const [image, setImage] = useState({});

	const { provinsi, kota, kecamatan, kelurahan } = useSelector(
		(state) => state.daerahReducer
	);

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
		</div>
	);
};

export default ProfilePage;
