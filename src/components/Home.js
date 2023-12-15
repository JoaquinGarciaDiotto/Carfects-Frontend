import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Maps from './Maps';
import '../App.css';
import { Link } from 'react-router-dom';

const Home = () =>{

    return(
      <div>
      <Carousel className="appn">
      <Carousel.Item className="carrouselItem">
        <Link to="/products"> 
        <img
          className="ol"
          src="https://i.ibb.co/j8L0QJ7/EC79946-B-CABA-4-D8-D-B8-B5-239-CDD1551-DD.png?fbclid=IwAR161AgVgHZaHWsMcmQTZOhCB3RnOh-egipFCiMiCC4S1VWS0zcCWYlAYig"
          alt="First slide"
        />
        </Link>

      </Carousel.Item>
      <Carousel.Item className="carrouselItem">
       <Link to="/products"> 
        <img
          className="ol"
          src="https://i.ibb.co/7r4TSd8/4-F7-C9-C06-8-C8-E-47-FF-AF68-24-BB142-B0-B00.png?fbclid=IwAR32QnvVE9Vr9wUaizRQTXQFidkQFEp2PUyZIKtRLMpS8-3dSoy8vEBmN58"
          alt="First slide"
        />
        </Link>

      </Carousel.Item>
      <Carousel.Item className="carrouselItem">
       <Link to="/products">  
        <img
          className="ol"
          src="https://i.ibb.co/H2Qwv3p/FBC1-D879-177-F-4-A74-A3-AB-304635-A6-F68-A.png"
          alt="First slide"
        />
         </Link>
      </Carousel.Item>

      <Carousel.Item className="carrouselItem">
       <Link to="/products">  
        <img
          className="ol"
          src="https://i.ibb.co/7XC7FD3/2-C311-D42-224-A-4307-870-A-DF001-EA5-C146.png"
          alt="First slide"
        />
        </Link>
      </Carousel.Item>
    </Carousel>
    

    <div className="categories"> 
      <h3>Categorias de productos</h3>
      <div className="imagesContainer"> 
      <div className="images">
      <Link to="/categories/1"> 
        <img className="imag" style={{'object-fit':'cover'}} src="https://i.ibb.co/FV9xscw/5-FF76-A15-62-A6-48-C1-8418-B40-AFEC42636.jpg"></img>
        <div className="overlay"> 
        <div className="content"> 
          <h5>Compacto Ejecutivo</h5>
        </div>
        </div> 
        </Link> 
      </div>

      <div className="images">
      <Link to="/categories/2"> 
        <img className="imag" style={{'object-fit':'cover'}} src="https://i.ibb.co/R4rV8kD/5-A61-CF86-D07-B-44-FF-8-FB0-4-BA100657980.jpg"></img>
        <div className="overlay"> 
        <div className="content"> 
          <h5>Ejecutivo</h5>
        </div>
        </div> 
        </Link> 
      </div>

      <div className="images">
      <Link to="/categories/3"> 
        <img className="imag" src="https://i.ibb.co/SrQHVJ2/80905-F3-E-71-B5-4745-B7-E9-CFAE22-D3-CFF6.jpg"></img>
        <div className="overlay"> 
        <div className="content"> 
          <h5>Familiar Grande</h5>
        </div>
        </div>  
        </Link>
      </div>

      <div className="images">
      <Link to="/categories/4"> 
        <img className="imag" src="https://i.ibb.co/q7NkkQT/D09-A00-C0-7296-4-F6-A-A655-9-DEB7464-CD76.jpg?fbclid=IwAR1tXTXkHOq94t4HoYX5lTJzu6yteiiGDxcHFYRAkiGK2HT_AyLw7Ctkrvg"></img>
        <div className="overlay"> 
        <div className="content"> 
          <h5>Accesorios</h5>
        </div>
        </div>
        </Link>  
      </div>
    </div>
    <div style={{width:'250px', 'position':'relative', 'left':'50%', 'transform':'translateX(-50%)'}}>
      <h4>Donde encontrarnos?</h4>
      <p>Rivadavia 150, Bahia Blanca, Buenos Aires, Argentina</p> 
      <Maps 
      ></Maps>
    </div>
    </div>
    </div>
    )
}


export default Home
