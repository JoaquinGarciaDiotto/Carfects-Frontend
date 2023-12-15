import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import NAV from './components/NAV';
import Orders from './components/Orders'
import Brands from './components/Brands';
import Cart from './components/Cart';
import Products from './components/Products';
import CategoriasProduct from './components/CategoriasProduct';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContextProvider } from "./context/shop-context";
import { useAuth0 } from '@auth0/auth0-react';
import Success from './components/Success';
import PaymentError from './components/PaymentError';

function App() {
  const[PRODUCTS,setProducts]= useState([]);
  const {loginWithRedirect, user, isAuthenticated, logout} = useAuth0()

    useEffect(()=>{
      if(!isAuthenticated){
        if(sessionStorage.getItem('reloaded') != null){

        }
        else{
          localStorage.clear();
        }
      }
    },[]);

    useEffect(()=>{
        getProductos();
        if(isAuthenticated){
          loginWithApi();
        }
    },[isAuthenticated]);

    async function getProductos() {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/productos');
        setProducts(response.data);
    }

    async function loginWithApi(){
      if(isAuthenticated){
          fetch(process.env.REACT_APP_API_URL+ "/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
              email: user.email,
              password: user.nickname 
              })
           })
           .then(response => response.json())
           .then(json => {
              if(json.message === 'Bad creds'){
                  fetch(process.env.REACT_APP_API_URL+ '/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
              name: user.nickname,
              email: user.email,
              password: user.nickname ,
              password_confirmation: user.nickname
              })
           })
           .then(response => response.json())
           .then(json => { 
          localStorage.setItem("token",json.token);}
              )
              }
              localStorage.setItem("token",json.token);
           })
    }
  }

  return (
    <ShopContextProvider PRODUCTS={PRODUCTS}> 
    <div className="App">
      <BrowserRouter>
      <NAV> </NAV>
      <Routes> 
        <Route path="/" element= {<Home />} /> 
        <Route path="*" element= {<PageNotFound />} />  
        <Route path="/products" element= {<Products  />}/> 
        <Route path="/categories/:id" element={ <CategoriasProduct/>}  /> 
        <Route path="/cart" element= {<Cart />} /> 
        <Route path="/brands" element= {<Brands />} /> 
        <Route path= "/orders" element={ <Orders /> } />
        <Route path= "/success" element={ <Success /> } />
      </Routes> 
      </BrowserRouter>
    </div>
    </ShopContextProvider>
  );
}

export default App;
