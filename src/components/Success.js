import React from 'react';
import '../App.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const Success = () => {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    if(!isAuthenticated){
        navigate('/');
    }

    return (
        <div className="succcess" style={{'position':'absolute','top':'50%','left':'50%','transform':'translate(-50%,-50%)'}}> 
            <h1>Felicidades! Hemos recibido tu pago. =)</h1>
            <button onClick={
                ()=>{
                    navigate('/orders')
                  }
            }>Ver mis pedidos</button>
        </div>
    );
}

export default Success