// src/components/navigation-bar/navigation-bar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './navigation-bar.scss';

export const NavigationBar = ({
  user,
  onLoggedOut,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <Navbar bg="black" expand="md" className="mb-5">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="kraftflix-title me-5">
          <h1>kraftFlix</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="nav-item"
                  activeClassName="active"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/signup"
                  className="nav-item"
                  activeClassName="active"
                >
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/"
                  exact
                  className="nav-item ms-5"
                  activeClassName="active"
                >
                  Movies
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/profile"
                  className="nav-item ms-5"
                  activeClassName="active"
                >
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="nav-item mx-5">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search for movies"
                className="mr-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
  }),
  onLoggedOut: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
