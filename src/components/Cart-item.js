import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ShopContext } from "../context/shop-context";
import '../App.css';

export const CartItem = (props) => {
  const { id, nombre, precio, img } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={img} onError={({ currentTarget }) => {currentTarget.onerror=null;currentTarget.src="https://i.ibb.co/QX1M2qF/default-Car.jpg";}}/>
      <div className="description">
        <p>
          <b>{nombre}</b>
        </p>
        <p> Precio c/u: ${precio}</p>
        <p> Precio subtotal: ${precio * cartItems[id]}</p>
        <ButtonGroup>
          <InputGroup>
            <Button variant="light" onClick={() => removeFromCart(id)}>-</Button>
            <Form.Control type="tel" className="inp" required min="0" pattern="[0-9]+" defaultValue="0" style={{"max-width":"40px","text-align":"center"}}
              value={cartItems[id]}
              onInput={(e) => {if(!isNaN(e.target.value) && parseInt(e.target.value)) updateCartItemCount(parseInt(e.target.value), id)}}
            />
            <Button variant="light" onClick={() => addToCart(id)}>+</Button>
          </InputGroup>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CartItem