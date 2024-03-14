import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import {Button} from "react-bootstrap";
import Login from "../Components/sections/Login"
import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";

const NavBar = () => {
const {currentUser, setCurrentUser, RemoveAuth}=useContext(UserContext);

  const [isOpen, setIsOpen]=useState(false);

  const handleShow=()=>{
    setIsOpen(true)
  };
  const handleClose=()=>{
    setIsOpen(false);
  }

  const Logout=()=>{
    RemoveAuth();
    setCurrentUser(undefined);
  }
  return (

    <>
    <Login isOpen={isOpen} handleClose={handleClose}/>
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      data-bs-theme="dark"
      bg="dark"
    >
      <Container>
        <Navbar.Brand href="#home">CRUD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/acercadenosotros">Acerca de Nosotros</Nav.Link>
              <Nav.Link href="/administracion">Administracion</Nav.Link>        */}
            <NavLink to="/" className={'nav-link'}>Inicio</NavLink>
            <NavLink to="/acercadenosotros" className={'nav-link'}>Acerca de Nosotros</NavLink>
            {(currentUser!==undefined&&currentUser.role==="Admin")&& <NavLink to="/administracion" className={'nav-link'}>Adminsitracion</NavLink>}
           
          </Nav>
          <Nav>
              <Button variant="primary" className="mx-2 my-2 my-md-0" onClick={handleShow}>Login</Button>
              <Button variant="secondary" className="mx-2 my-2 my-md-0" onClick={Logout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default NavBar;
