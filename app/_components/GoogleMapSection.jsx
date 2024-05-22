import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';
const containerStyle = {
    width: '100%',
    height: '70vh',
    borderRadius:10,
    padding: 100
  };
  

function GoogleMapSection({coordinates, annonce}) {

    const [center,setCenter]= useState({
      lat: 33.5731, 
      lng: -7.5898  
    })
    
      const [map, setMap] = React.useState(null)

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY
      })

      useEffect(()=>{
        coordinates&&setCenter(coordinates)
      }, [coordinates])
    
      const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

  return (
    <div>
         <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        gestureHandling="greedy"
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {annonce.map((item, index)=>(
            <MarkerItem 
                key={index} 
                item={item} 
            />
        ))}
      </GoogleMap>
    </div>
  )
}

export default GoogleMapSection;