import React, { useEffect, useState } from 'react';
import '../assets/css/app.cs';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Order from './Order';
import Loading from './Loading';
import NoOrdersMessage from './NoOrdersMessage';

const Orders = () => {
    const {user, isAuthenticated} = useAuth0()
    const [pedidos,setPedidos] = useState([]);
    const [cliente, setCliente] = useState(0);
    const [existe, setExiste] = useState(true);

    useEffect(()=>{
        if(!isAuthenticated){
            setExiste(false);
        }
        else{
            if(localStorage.getItem('token') === null || localStorage.getItem('token') == undefined){
                loginWithApi();   
            }
            else{
                getUsuario(user.email);
            }
        }
    }, []);

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
            localStorage.setItem("token",json.token);
            getUsuario(user.email);
        }
            
                )
                }
                localStorage.setItem("token",json.token);
                getUsuario(user.email);
             })
      }
    }

    async function getUsuario(email){
        const response = await axios.get(process.env.REACT_APP_API_URL + '/clientes/search/'+email, 
        {
            headers: {
              Authorization: 'Bearer '+localStorage.getItem("token")
          }
          });
        if(response.data.length ===0){
            setExiste(false);
        }
        else {
            setCliente(response.data[0].id);
            getPedidosCliente(response.data[0].id);
        }
    } 

    async function getPedidosCliente(cliente){
        const response = await axios.get(process.env.REACT_APP_API_URL +'/pedidos/search/'+cliente, {
            headers: {
                Authorization: 'Bearer '+localStorage.getItem("token")
            }
        })
        .then((response) => {
            if(response.data.length>0) {
                setPedidos(response.data);
                setExiste(true);
                setExiste(true);
            }    
            else
                setExiste(false);
        });
    
    }

    if(!isAuthenticated){
        return <h1 style={{'position':'absolute','top':'50%', 'left':'50%', 'transform':'translate(-50%,-50%)'}}> Debes iniciar sesion para ver tus pedidos. </h1>
    }

    if(pedidos.length ===0 && existe){
        return <Loading></Loading>
    }

    if(pedidos.length ===0 && !existe){
        return <NoOrdersMessage></NoOrdersMessage>
    }

    return (<div style={{display:'flex', 'flex-wrap':'wrap', 'justify-content':'space-evenly','align-items':'center'}}>
        {pedidos.map((pedido,index)=>{
            return <div style={{'margin':'1rem 2rem'}}>        
                <Order pedido={pedido}> </Order>
                </div>
        })}
        </div>
    )
}

export default Orders