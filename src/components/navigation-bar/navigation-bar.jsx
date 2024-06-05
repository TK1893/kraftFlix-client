import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Version CF
// export const NavigationBar = ({ user, onLoggedOut }) => {
//   return (
//     <Navbar bg="light" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">
//           kraftFlix
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {!user && (
//               <>
//                 <Nav.Link as={Link} to="/login">
//                   Login
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/signup">
//                   Signup
//                 </Nav.Link>
//               </>
//             )}
//             {user && (
//               <>
//                 <Nav.Link as={Link} to="/">
//                   Home
//                 </Nav.Link>
//                 <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// Version Tobi
export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    // <Container fluid>
    <Navbar bg="black" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand as={Link} to="/" className="kraftflix-title me-5">
          <h1>kraftFlix</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" className="ciao-button">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="ciao-button">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" className="ciao-button ms-5">
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="ciao-button mx-5">
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
