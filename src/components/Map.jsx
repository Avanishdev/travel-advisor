import React from "react";
import GoogleMapReact from 'google-map-react';
import LocationOnOutlinedIcon  from "@material-ui/icons/LocationOnOutlined";
import {  Paper,Typography, useMediaQuery } from "@material-ui/core";
import { Rating } from "@material-ui/lab";



// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map=({setCoordinates,setBounds,coordinates,places,setChildClicked})=>{
  const isDesktop=useMediaQuery('(min-with:600px)');
  const defaultProps = {
    center: {
      lat:  52.520007,
      lng: 13.404954,
    },
    zoom: 14
  };
  
  return (
    // Important! Always set the container height explicitly
    <div style={{  height: '91vh', width: '100%', }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAJPNV8E3h3ovkBpwipVCNi0zXnQU6h5kQ" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={defaultProps.zoom}
        margin={[50,50,50,50]}
        options={""}
        onChange={(e)=>{
          // console.log(e)
          setCoordinates({lat:e.center.lat,lng:e.center.lng})
          setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
        }}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {places?.map((place,i)=>(
          <div
          // className={classes.markerContainer}
            style={{position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },}}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {isDesktop
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3}
                // className={classes.paper}
                style={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',}}
                  >
                  <Typography 
                  // className={classes.typography} 
                  variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    // className={classes.pointer}
                    style={{cursor:'pointer'}}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )};
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}
export default Map;