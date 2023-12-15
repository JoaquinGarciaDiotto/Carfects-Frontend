import React from 'react';
import '../App.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const PaymentError = () => {
    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    if(!isAuthenticated){
        navigate('/');
    }

    return (
        <div className="succcess" style={{'position':'absolute','top':'50%','left':'50%','transform':'translate(-50%,-50%)'}}> 
            <h1>Tu pago no ha podido ser procesado. Vuelve a intentarlo!</h1>
        </div>
    );
}

export default PaymentError