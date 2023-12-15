import React,{Component} from 'react';
import {Map,InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Maps extends Component{
  
render(){
   return (
   <Map style={{width:'100%', height:'500px'}} google={this.props.google} zoom={16} initialCenter={{lat:-38.7186, lng:-62.2659}} initialViewState={{longitude:-100, latitude:40}}> 
      <Marker onClick={this.onMarkerClick} name={''} latitude={-38.7186} longitude={-62.2659} position={{lat:-38.7186, lng:-62.2659}}>
      </Marker>
      <InfoWindow onClose={this.onInfoWindowClose}> </InfoWindow>
   </Map> );
}

}

export default GoogleApiWrapper({
   apiKey: ""+process.env.REACT_APP_GOOGLE_KEY
})(Maps)
