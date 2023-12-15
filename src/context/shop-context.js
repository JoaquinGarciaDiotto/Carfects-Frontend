import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { json } from "react-router-dom";
import Cookies from "js-cookie";

export const ShopContext = createContext(null);


export const ShopContextProvider = (props) => {
    const[PRODUCTS,setProducts]= useState([]);
    const[cliente,setCliente]= useState("");
    const[compra,setCompra]= useState(false);
    const[isLoading,setisLoading]= useState(false);

    const getDefaultCart = (length) => {
        let cart = {};
        for (let i = 1; i < 100 ; i++) {
          cart[i] = 0;
        }
        return cart;
      };

    const [cartItems, setCartItems] = useState(getDefaultCart(props.PRODUCTS.length));

    useEffect(()=>{
        getProductos();
        const storedCart= localStorage.getItem('cartItems');
        if(storedCart){
          setCartItems(JSON.parse(storedCart));
        }
    },[]);

  


    async function getProductos() {
        const response = await axios.get(process.env.REACT_APP_API_URL+ '/productos');
        setProducts(response.data);
        localStorage.setItem('products',JSON.stringify(PRODUCTS));
    }


  async function buscarClientePorEmail(email){
      const response = await axios.get(process.env.REACT_APP_API_URL + '/clientes/search/'+email,
      {
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("token")
      }
      });
      setCliente(response.data);
      return response.data;
  }


  const getTotalCartItems = () => {
    let totalAmount = 0;
    for (const item in cartItems) 
      totalAmount += cartItems[item];
    return totalAmount;
  };

    

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.precio;
      }
    }
    return parseFloat(totalAmount);
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    localStorage.setItem('cartItems',JSON.stringify({ ...cartItems, [itemId]: cartItems[itemId] + 1 }));
    
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    localStorage.setItem('cartItems',JSON.stringify({ ...cartItems, [itemId]: cartItems[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    localStorage.setItem('cartItems',JSON.stringify({ ...cartItems, [itemId]: newAmount }));
  };

  const checkout = (nombre,email) => {
    setCartItems(getDefaultCart());
    setisLoading(true);
    comprar(nombre,email);
    localStorage.removeItem('cartItems');
  };

  const obtenerFechaActual = () =>{
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const day = String(fechaActual.getDate()).padStart(2,'0');
    const fechaFormateada = `${year}-${month}-${day}`;

    return fechaFormateada;
  }

  async function comprar(nombre,email) {
    setCliente("");
    setCompra(false);
    var pedidoid=0;
    let cliente= await buscarClientePorEmail(email);
    if(cliente.length>0){
      pedidoid = await crearPedido(cliente[0].id);
    }
    else{
      cliente= await crearCliente(nombre,email);
      pedidoid= await crearPedido(cliente.id);
    }
   
   PRODUCTS.forEach((product) =>{
    if(cartItems[product.id] !== 0)
      crearDetalle(product,pedidoid);
      setCompra(true);
   });
  }

  async function crearDetalle(product,pedidoid){
    try{
      const response = await axios.post(process.env.REACT_APP_API_URL+'/detalles/compra',{
        precio_total: cartItems[product.id]*product.precio,
        cantidad: cartItems[product.id],
        id_pedido: pedidoid,
        id_producto: product.id
      },
      {
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("token")
      }
      });
    

   } catch(error){
    console.log("error al crear el pedido", error);
   }
  }

  async function crearPedido(id){
    try{
      const response = await axios.post(process.env.REACT_APP_API_URL+'/pedidos/compra',{
        fecha_pedido: obtenerFechaActual(),
        precio: getTotalCartAmount(),
        id_cliente: id
      },{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("token")
      }
      });

      setisLoading(false);
      return response.data.id;

   } catch(error){
    console.log("error al crear el pedido", error);
   }
  }

  async function crearCliente(nombre,email) {
     try{
        const response = await axios.post(process.env.REACT_APP_API_URL+'/clientes/compra',{
          nombre: nombre,
          email: email
        },
        {
          headers: {
            Authorization: 'Bearer '+localStorage.getItem("token")
        }
        });
        setCliente(response.data);
        return response.data;

     } catch(error){
      console.log("error al crear el ciente", error);
     }
  }

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartItems,
    getTotalCartAmount,
    checkout,
    compra,
    setCompra,
    isLoading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
