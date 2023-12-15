import React, { useContext } from 'react';
import axios from 'axios';
import Loading from "./Loading";
import Success from "./Success";
import EmptyMessage from "./EmptyMessage";
import { ShopContext } from "../context/shop-context";
import { CartItem }  from "./Cart-item";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
import MPCardPayment from './MPCardPayment.js';
import '../App.css';
import PaymentError from './PaymentError';

export const Cart = () => {
  const {loginWithRedirect,user, isAuthenticated} = useAuth0()
  const { cartItems, getTotalCartAmount, checkout, compra, setCompra, isLoading } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();
  const[PRODUCTS,setProducts]= useState([]);
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[error, setError] = useState(false);
 

    useEffect(()=>{
        getProductos();
        setCompra(false);
        if(isAuthenticated){
          initMercadoPago('TEST-2db73935-0854-4f55-bc18-2e38895d8874', {locale: 'es-AR'});
        }
        initMercadoPago('TEST-2db73935-0854-4f55-bc18-2e38895d8874', {locale: 'es-AR'});
        setError(false);
    },[]);



    async function getProductos() {
        const response = await axios.get(process.env.REACT_APP_API_URL+'/productos');
        setProducts(response.data);
    }

    const initialization = {
      amount: getTotalCartAmount(),
    };
    
    const onSubmit = async (formData) => {
      // callback llamado al hacer clic en el botón enviar datos
      return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_API_URL+ '/paymentMP', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
              if(!response.ok){
                setError(true);
              }
              return response.json();
          })
          .then((data) => {
            if (data.status === "approved") {
              resolve();
              checkout(user.nickname,user.email);
              console.log("exito");
              navigate('/success');
            } else {
              setError(true);
              reject();
            }
          })
          .catch((error) => {
            setError(true);
            reject();
          });
      });
    };
    
    const onError = async (error) => {
      // callback llamado para todos los casos de error de Brick
      console.log(error);
    };
    
    const onReady = async () => {
      /*
        Callback llamado cuando Brick está listo.
        Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
      */
    };

    if(error){
      return (
          <div className="intentar">
            <PaymentError> </PaymentError>
            <button
            onClick={() => {
              setIsModalOpen(true);
              setError(false);
            }}
          >
            {" "}
            Volver a intentar{" "}
            </button>
          </div>
      );
    }

    if(isModalOpen){
      return <MPCardPayment
            initialization={initialization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
          />
    }

    if(PRODUCTS.length===0){
      return <Loading> </Loading>
    }

    if(isLoading){
      return <Loading> </Loading>
    }


   return (
    <div className="cart">
      <div>
        <h1 className="items">Carrito</h1>
      </div>
      <div className="cart">
        
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          { !isAuthenticated ? (
          <div> 
          <p> Total: ${totalAmount} </p>
          <h4>Debes iniciar sesión para completar la compra</h4>
            <button onClick={()=>{
                loginWithRedirect()
              }}>Login</button>
           </div> 
          ) : 
          (
            <div>
              <p> Total: ${totalAmount} </p>
            <button onClick={() => navigate("/products")}> SEGUIRE COMPRANDO </button>
          <button 
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            {" "}
            FINALIZAR COMPRA{" "}
            </button>
            
            </div>
          ) }
        
        </div>
      ) : compra ? (
        <div>
          <Success> </Success>
          <button className="botonComprar" onClick={() => navigate("/products")}> SEGUIRE COMPRANDO </button>
        </div>
      ) : isLoading ?( 
        <Loading> </Loading>
      ) : (
        <div> 
          <EmptyMessage> </EmptyMessage>
          <button className="botonComprar" onClick={() => navigate("/products")}> VER PRODUCTOS </button>
        </div> 
      )}
    </div>
  );
};

export default Cart