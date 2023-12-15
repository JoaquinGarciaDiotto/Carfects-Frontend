import React, { useEffect, useState } from 'react';
import '../assets/css/app.cs';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Loading from './Loading';

const Order = ({pedido}) =>{
    const[detalles,setDetalles]= useState([]);
    const[nombres,setNombres]= useState([]);
    const[nombree,setNombre]= useState(""); 
    const[nombresAuto,setNombresAuto] = useState([]);
    const[autos, setAutos]= useState([]);

    useEffect(()=>{
        getAutos();
        getDetalles();
        getProductos();
    },[]);

    async function getAutos(){
        const response = await axios.get(process.env.REACT_APP_API_URL + '/productos');
        setAutos(response.data);
        getNombres(response.data);
    }

    async function getNombres(auto){
        const a = [];
        for(let i=0; i<auto.length; i++){
            a[i]= auto[i].nombre;
        }
        setNombresAuto(a); 
    }

    async function getDetalles(){
        const response = await axios.get(process.env.REACT_APP_API_URL+ '/detalles/search/'+pedido.id,
        {
            headers: {
              Authorization: 'Bearer '+localStorage.getItem("token")
          }
          });
        setDetalles(response.data);    
    } 

    async function getProductos(){
        let nombr = []; 
        for(let x=0; x<detalles.length; x++){
            nombr[x]= nombresAuto[detalles[x].id_producto]
        }
    }

    async function getNombreProducto(id){
            const response = await (process.env.REACT_APP_API_URL+ '/productos/'+id);
            setNombre(response.data);        
    }

    return (
        <Card style={{ width: '18rem' , 'border':'1px solid transparent', 'box-shadow': 'rgba(0,0,0,0.35) 0px 5px 15px'}}>
        <Card.Body>
            <Card.Title>Pedido <hr></hr></Card.Title>
            <Card.Text>
                Fecha de pedido: {pedido.fecha_pedido} <br></br><strong> Precio total: </strong> {pedido.precio} <hr></hr>
                {detalles.map((detalle)=>{
                     return <div> 
                       <h6>Producto: {nombresAuto[detalle.id_producto-1]} <br></br> Cantidad: {detalle.cantidad}  </h6> Precio: {detalle.precio_total}
                     </div>
                })}
            </Card.Text>
        </Card.Body>
        </Card>
    )
}

export default Order