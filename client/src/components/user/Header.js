import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import { primaryColor, surfaceColor } from "../../helpers";
import { Fade } from "react-reveal";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions";

const Header = () => {
	const dispatch = useDispatch();
	const styles = useStyles();
	const [showSearchInput, setShowSearchInput] = useState(false);

	const handleLogoutBtn = () => {
		dispatch(logoutAction());
		alert("logout");
	};

	return (
		<div className={styles.container}>
			<div className="mr-4">
				<img src="https://i.imgur.com/eKvfJEW.png" height="50" width="50" />
			</div>
			<div className={styles.navContainer}>
				<div className={styles.navLeftContainer}>
					<Link to="/" className={styles.navItemContainer}>
						<div className={styles.textLink}>home</div>
					</Link>
					<Link to="/products" className={styles.navItemContainer}>
						<div className={styles.textLink}>products</div>
					</Link>
					<Link to="/products" className={styles.navItemContainer}>
						<div className={styles.textLink}>dummy1</div>
					</Link>
					<Link to="/products" className={styles.navItemContainer}>
						<div className={styles.textLink}>dummy2</div>
					</Link>
				</div>
				<div className="d-flex">
					<div
						style={{
							borderRight: "1px solid rgba(0,0,0,0.1)",
							marginRight: "20px",
							paddingInline: 10,
						}}
					>
						<InputGroup>
							<Fade left when={showSearchInput}>
								<Input
									placeholder="search"
									style={{ borderRadius: 50, paddingInline: 20 }}
								/>
							</Fade>
							<InputGroupAddon addonType="prepend">
								<InputGroupText
									onClick={() => setShowSearchInput(!showSearchInput)}
									style={{
										backgroundColor: "rgba(0, 0, 0, 0)",
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
						<Link to="/login">
							<Button style={{ backgroundColor: surfaceColor, borderWidth: 0 }}>
								sign in
							</Button>
						</Link>
						<Button
							style={{ backgroundColor: surfaceColor, borderWidth: 0 }}
							onClick={handleLogoutBtn}
						>
							logout
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

const useStyles = makeStyles({
	container: {
		backgroundColor: primaryColor,
		height: "70px",
		maxHeight: "70px",
		paddingInline: "50px",
		boxShadow: "1px 0 12px 1px rgba(0,0,0,0.3)",
		display: "flex",
		alignItems: "center",
	},
	navContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	navLeftContainer: {
		display: "flex",
		height: "100%",
	},
	navItemContainer: {
		paddingInline: "10px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		"&:hover": {
			background: "rgba(0,0,0,0.1)",
			textDecoration: "none",
			borderBottom: `3px solid ${surfaceColor}`,
		},
	},
	textLink: {
		fontWeight: 600,
		textTransform: "uppercase",
		color: surfaceColor,
	},
});

export default Header;
