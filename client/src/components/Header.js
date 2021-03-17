import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{ boxShadow: '1px 0 12px 1px rgba(0,0,0,0.3)' }}>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">naturegoods</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-between">
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink>products</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <Button>sign in</Button>
            <Link to="/register">
              <Button>register</Button>
            </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
