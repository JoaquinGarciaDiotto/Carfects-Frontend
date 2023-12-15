import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () =>{
    return <div style={{'position':'absolute','left':'50%','top':'50%','bottom':'50%', 'transform': 'translate(-50%,-50%)'}}><ClipLoader color="#36d7b7"/></div>
}

export default Loading