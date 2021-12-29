import { React } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
//Button, Alert,Breadcrumb,Card,,Row,Col,
function NavBar(props) {
  let loginButtons = [];
  loginButtons.push(
    <Nav.Link
      className={props.textColor + "    rounded hover-shadow ripple"}
      variant="secondary"
      href="home"
    >
      {" "}
      Predict
    </Nav.Link>
  );
  //add sticky for sticky
  return (
    <Navbar bg=" " expand="lg" className={props.backgroundColor}>
      <Container fluid>
        <Container>
          <div className="custom-margin-left-4">
            <Navbar.Brand href="home">
              <img
                src="/doglogo.png"
                width="60"
                height="60"
                className="d-inline-block align-top "
                alt="Logo"
              />
            </Navbar.Brand>
          </div>
        </Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
        </Navbar.Collapse>
      </Container>

      <Button
        variant="outline-warning"
        href="home"
        className="custom-margin-right-4"
        size="lg"
      >
        Predict
      </Button>
    </Navbar>
  );
}

export default NavBar;
