import React, { useEffect, useState } from 'react';
import '../assets/css/app.cs';
import Brand from './Brand';

const Brands = () =>{
    const Marcas = ["Ferrari","Mercedes Benz","Audi","Porsche","Citroen","Ford","Nissan","Bentley"];

    return (
        <div> 
            <h4 style={{margin:'1rem'}}>Las mejores fotografias de los vehiculos de las marcas que vendemos! </h4>
            <div style={{display:'flex', 'flex-wrap':'wrap','margin':'1rem', 'justify-content':'center','align-items':'center'}}> 
                {Marcas.map((marca) => {
                    return <Brand nombre={marca}> </Brand>
                }) }
            </div>
        </div>
    );
    
}

export default Brands