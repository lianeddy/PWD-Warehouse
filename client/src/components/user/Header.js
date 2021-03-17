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
  Button,
} from 'reactstrap';
import { makeStyles } from '@material-ui/styles';

const Header = () => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div style={{ boxShadow: '1px 0 12px 1px rgba(0,0,0,0.3)' }} className="px-5">
      <Navbar expand="md" style={{ background: 'blue', padding: 0, margin: 0 }}>
        <NavbarBrand href="/">
          <div>
            <img src="https://i.imgur.com/eKvfJEW.png" height="50" width="50" />
          </div>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className={styles.navWrapper}>
          <Nav className={styles.navItemWrapper}>
            <NavItem>
              <Link to="/products" className={styles.link}>
                <div className={styles.textLink}>products</div>
              </Link>
            </NavItem>
          </Nav>
          <Nav navbar>
            <Link to="/login">
              <Button>sign in</Button>
            </Link>
            <Link to="/register">
              <Button>sign up</Button>
            </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const useStyles = makeStyles({
  navWrapper: {
    justifyContent: 'space-between',
    marginVertical: '50px',
    padding: 0,
    '&:hover': {
      background: 'red',
    },
  },
  navItemWrapper: {
    margin: 0,
    padding: 0,

    '&:hover': {
      background: 'red',
    },
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  textLink: {
    fontWeight: 600,
    textTransform: 'uppercase',
    color: 'green',
    '&:hover': {
      color: '#064f2d',
    },
  },
});

export default Header;
