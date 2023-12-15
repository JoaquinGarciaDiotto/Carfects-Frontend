import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const Product = (props) => {
  const { id, nombre, precio, img } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

    return <Card className="card" style={{ 'border':'1px solid rgb(238, 238, 238)','box-shadow':'rgba(0, 0, 0, 0.08) 0px 2px 4px 0px','width': '18rem', 'height':'20rem', 'display':'flex', 'justify-self':'center', 'align-self':'center', 'margin-bottom':'2rem', }}>
                <Card.Img variant="top" src={img}  style={{'height':'10rem', 'width':'17.945rem'}} onError={({ currentTarget }) => {currentTarget.onerror=null;currentTarget.src="https://i.ibb.co/QX1M2qF/default-Car.jpg";}}/>
                <Card.Body>
                  <Card.Title style={{'font-size':'18px'}}>{nombre}</Card.Title>
                  <Card.Text>
                    Precio : {precio}
                  </Card.Text>
                  <Button variant="dark" className="btn-comprar" onClick={() => addToCart(id)}>Añadir al carrito</Button>
                  {cartItemCount>0 && <Card.Text style={{'font-size':'10px', 'color':'green'}}>
                    ✔ Producto Añadido
                  </Card.Text>}
                </Card.Body>
              </Card>
}

export default Product