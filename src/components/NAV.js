import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import '../assets/css/app.cs';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import {Link} from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { useAuth0 } from '@auth0/auth0-react';

const NAV = () =>{
  const { getTotalCartItems } = useContext(ShopContext);

  const {loginWithRedirect, user, isAuthenticated, logout} = useAuth0();

  const handleLogout = () => {
    localStorage.removeItem('cartItems');
    logoutWithApi();
    logout({returnTo: window.location.origin});
  }

  async function logoutWithApi(){
    if(isAuthenticated){
        fetch(process.env.REACT_APP_API_URL+ "/logout", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*',
               Authorization: 'Bearer '+localStorage.getItem("token")
            }
         })
         .then(response => response.json())
         .then(json => {
          localStorage.removeItem('token');
         })
         localStorage.removeItem('token');
  }
}

    return(
        <Navbar bg="light" expand="lg" variant="light">
        <Container>
          <Navbar.Brand href="/">CarFects</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to ="/" className="ini">Inicio</Nav.Link>
              <Nav.Link as={Link} to ="/products" >Productos</Nav.Link>
              <Nav.Link as={Link} to ="/brands" >Nuestras Marcas</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to ="/cart" >{<>Carrito 🛒</>}  <Badge pill bg="danger">{getTotalCartItems() > 0 && <>{getTotalCartItems()}</>}</Badge></Nav.Link>
              { !isAuthenticated ? (
              <Nav.Link as={Link} onClick={()=>{
                loginWithRedirect();
              }} >Login</Nav.Link>
              ): (
                <div className="NavBar" >
                <Nav.Link as={Link} to ="/orders" >Mis pedidos</Nav.Link>
                <Nav.Link as={Link} onClick={()=>{
                  handleLogout()
                }} >Cerrar sesión</Nav.Link>
                </div> 
              ) }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NAV