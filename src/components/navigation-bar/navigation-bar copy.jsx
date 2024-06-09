import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Version Tobi
export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="black" expand="md" className="mb-5">
      <Container>
        <Navbar.Brand as={Link} to="/" className="kraftflix-title me-5">
          <h1>kraftFlix</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" className="nav-item">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-item">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" className="nav-item ms-5">
                  Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-item ms-5">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="nav-item mx-5">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
