import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import Error from './Error';
import { useParams } from 'react-router-dom';
import Product from "./Product"
import '../App.css';


const CategoriasProduct = () =>{
    const[categorias,setCategorias] = useState([]);
    const[categoriaSeleccionada,setCategoriaSeleccionada]=useState(0);
    const[busqueda,setBusqueda]=useState('');
    const[resultados,setResultados]=useState([]);
    const{ id } = useParams();
    const[error,setError]= useState(false);

    
    useEffect(()=>{
        getCategorias();
        setCategoriaSeleccionada(id);
        getProductosPorCategoria(id);
    },[]);  

    async function getCategorias() {
        const response = await axios.get(process.env.REACT_APP_API_URL+ '/categorias');
        setCategorias(response.data);
    }

    async function getProductos() {
        const response = await axios.get(process.env.REACT_APP_API_URL +'/productos');
        setResultados(response.data);
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
            getProductosPorNombreVacio();
        }
        else{
            getProductosPorNombre(nameInput);
        }
    }

    const handleInputChange = event =>{
        setBusqueda(event.target.value)
    }

    async function getProductosPorNombre(nameInput){
        const response = await axios.get(process.env.REACT_APP_API_URL +'/productos/search/'+busqueda);
        if(response.data.length===0){
            setError(true);
        }
        else{
            setError(false);
            if(categoriaSeleccionada===0){
                setResultados(response.data);
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
    }

    async function getProductosPorNombreVacio(){
        const response = await axios.get(process.env.REACT_APP_API_URL+ '/productos/search/categoria/'+categoriaSeleccionada);
        if(response.data.length===0){
            setError(true);
        }
        else{
            setError(false);
            setResultados(response.data);
        }
    }

    async function getProductosPorCategoria(categ) {
        if(Number.isInteger(Number(id))){
        const response = await axios.get(process.env.REACT_APP_API_URL+ '/productos/search/categoria/'+categ);
        if(response.data.length===0){
            setError(true);
        }
        else{
            setResultados(response.data);
            setError(false);
        }
    }
    else{
        setError(true);
    }
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
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1"
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
            )) )}
        </div>
        </div>
    )
}

export default CategoriasProduct