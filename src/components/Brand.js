import React, { useEffect, useState } from 'react';
import '../assets/css/app.cs';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Brand = ({nombre}) => {
    const [images, setImages]= useState([]);
    
    useEffect(()=>{
        getTextFromWiki(nombre);
    }, [])

    async function getTextFromWiki(nombre){
       const response = await axios.get(process.env.REACT_APP_PIXABAY_API_URL+nombre+'+vehicle&image_type=photo&pretty=true');
       const images = []
       for(let x = 0; x<5; x++){
         images[x] = response.data.hits[x];
       } 
       setImages(images);
    }

    return (
        <div style={{ width:'300px'}}> 
            {images.map((image) => {
                return <div style={{'margin':'1rem'}}> 
                    <Card >
                        <Card.Img style={{width:'300px', height:'150px'}} variant="top" src={image.largeImageURL} />
                        <Card.Body>
                            <Card.Title>{nombre}</Card.Title>
                        </Card.Body>
                    </Card> 
                </div>
            })}
    </div>)
}

export default Brand