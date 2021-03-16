import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	Collapse,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarText,
	NavbarToggler,
	UncontrolledDropdown,
} from "reactstrap";
import { logoutAction } from "../redux/action";

class Header extends Component {
	state = {
		isOpen: false,
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	render() {
		const { email, logoutAction, username } = this.props;
		return (
			<div>
				<Navbar color="light" light expand="md">
					<Link to="/">Home</Link>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Options
								</DropdownToggle>
								{email ? (
									<DropdownMenu right>
										<DropdownItem>
											<Link to="/" onClick={logoutAction}>
												Log Out
											</Link>
										</DropdownItem>
									</DropdownMenu>
								) : (
									<DropdownMenu right>
										<DropdownItem>
											<Link to="/login">Login</Link>
										</DropdownItem>
										<DropdownItem>
											<Link to="/register">Register</Link>
										</DropdownItem>
									</DropdownMenu>
								)}
							</UncontrolledDropdown>
						</Nav>
						<NavbarText>{email ? username : null}</NavbarText>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

const mapStatetoProps = ({ user: { email, username } }) => {
	return {
		email,
		username,
	};
};

export default connect(mapStatetoProps, { logoutAction })(Header);
// export default Header;
