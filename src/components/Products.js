import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Product from "./Product"
import Loading from './Loading';
import Error from './Error';
import { useParams } from 'react-router-dom';
import '../App.css';
import { useAuth0 } from '@auth0/auth0-react';


const Products = () =>{
    const[productos,setProductos] = useState([]);
    const[categorias,setCategorias] = useState([]);
    const[categoriaSeleccionada,setCategoriaSeleccionada]=useState(0);
    const[busqueda,setBusqueda]=useState('');
    const[resultados,setResultados]=useState([]);
    const{ id } = useParams();
    const[error,setError]= useState(false);

    const { user, isAuthenticated} = useAuth0()
   
    
    useEffect(()=>{
        setCategoriaSeleccionada(0);
        getCategorias();
        if(!id){
            getProductos();
        }
        else{
            setCategoriaSeleccionada(id);
            getProductosPorCategoria(id);
        }
    },[]);  
   
    

    async function getProductos() {
        const response = await axios.get(process.env.REACT_APP_API_URL+"/productos");
        setProductos(response.data);
        setResultados(response.data);
    }

    async function getCategorias() {
        const url =  process.env.REACT_APP_API_URL + '/categorias';
        console.log(url);
        const response = await axios.get(url);
        setCategorias(response.data);
    }


    const handleCategoriaChange = event => {
        const categoriaSeleccionada = event.target.value;
        if(categoriaSeleccionada==""){
            getProductos();
            setCategoriaSeleccionada(0);
        }
        else{
            setCategoriaSeleccionada(categoriaSeleccionada);
            getProductosPorCategoria(categoriaSeleccionada);
        } 
    }

    const handleNameChange = event =>{
        const nameInput = event.target.value;
        if(busqueda === ""){
            if(Number(categoriaSeleccionada)===0){
                getProductos();
            }
            else{
                getProductosPorNombreVacio();
            }
        }
        else{
            getProductosPorNombre(nameInput);
        }
    }

    async function getProductosPorNombreVacio(){
        const response = await axios.get(process.env.REACT_APP_API_URL+ "/productos/search/categoria/"+categoriaSeleccionada);
        if(response.data.length===0){
            setError(true);
        }
        else{
            setError(false);
            setResultados(response.data);
        }
    }

    const handleInputChange = event =>{
        setBusqueda(event.target.value)
    }

    async function getProductosPorNombre(nameInput){
        const response = await axios.get(process.env.REACT_APP_API_URL + "/productos/search/"+busqueda);
        if(categoriaSeleccionada===0){
            setResultados(response.data);  
            if(response.data.length===0){
                setError(true);
            }
            else{
                setError(false);
            }     
        }
        else{      
            const productosFiltrados = response.data.filter(producto => producto.id_categoria===Number(categoriaSeleccionada));
            if(productosFiltrados.length===0){
                setError(true); 
            }
            else{   
                setError(false);
                setResultados(productosFiltrados);
            }
        }
    }

    async function getProductosPorCategoria(categ) {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/productos/search/categoria/"+categ);
        setProductos(response.data);
        setResultados(response.data);
    }

    if(resultados.length===0 && !error){
       return <Loading> </Loading>
    }


    return(
        <div>
        <div className="filtrado" style={{'margin-top':'2rem', 'display':'flex','justify-content':'center','align-items':'center'}}>
            <div className="filtrado_categoria" style={{'display':'flex', 'align-self':'center','justify-self':'center','align-items':'center','width':'348px'}}>
            <h5>Filtrar por Categoria: </h5>
            <Form.Select className="categoria" style={{display:'flex', 'width':'250px','margin-left':'1rem'}} value={categoriaSeleccionada} onChange={handleCategoriaChange} >
                <option value="">Selecciona una categoria</option>
                {categorias.map(categoria=>(
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option> 
                ))}
            </Form.Select>
            </div> 
            <div className="filtrado_nombre" style={{'display':'flex', 'justify-content':'space-evenly','align-items':'center', 'margin-left':'1rem','width':'410px'}}>
            <h5 className="nombreh5">Filtrar por Nombre:</h5>
            <InputGroup onChange={handleInputChange} style={{'position':'relative','right':'2.3rem', 'margin-left':'1rem',display:'flex', 'justify-content':'center','align-items':'center', width:'232px'}}>
                <Form.Control
                aria-label="Example text with button addon" aria-describedby="basic-addon1"
                />
                <Button onClick={handleNameChange} variant="outline-secondary" id="button-addon1" style={{'display':'flex', 'align-items':'center','justify-content':'center'}}>
                Buscar
                </Button>
            </InputGroup>
            </div>
         </div>   
         <h2 style={{'margin-top':'2rem'}}>Productos disponibles</h2>
        <div style={{'display': 'flex', 'flex-wrap':'wrap', 'justify-content':'space-around', 'align-items':'center', 'padding':'2rem'}}>
        {error ? ( <Error> </Error>) : (
            resultados?.map((product) =>(
                <Product data={product}> </Product>
            )))}
        </div>
        </div>
    )
}

export default Products