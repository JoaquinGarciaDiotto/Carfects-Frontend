import React from 'react';
import '../App.css';


const NoOrdersMessage = () => {

    return (
        <div className="succcess" style={{'position':'absolute','top':'50%','left':'50%','transform':'translate(-50%,-50%)'}}> 
            <h1>No tienes pedidos realizados.</h1>
        </div>
    );
}

export default NoOrdersMessage