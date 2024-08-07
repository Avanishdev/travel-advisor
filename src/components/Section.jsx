import React, { useState,useEffect } from 'react'
import { styled } from 'styled-components'
import List from './List'
import Map from './Map'

import getPlacesData from '../api'

const Sec=styled.section`
display: flex;
justify-content: space-between;
`;
const Section = () => {
  const [places,setPlaces]=useState([]);
  const [childClicked,setChildClicked]=useState(null);
  const [coordinates,setCoordinates]=useState({});
  const [bounds,setBounds]=useState({});
  const [type,setType]=useState('restaurants');
  const [rating,setRating]=useState('');
  const [filteredPlaces,setFilteredPlaces]=useState([]);
  
  const [isLoading,setIsLoading]=useState(false);

useEffect(()=>{
  const filtered=places.filter((place)=>Number(place.rating)>rating);
  setFilteredPlaces(filtered);
},[rating]);


  // THIS USEEFFECT WILL ONLY HAPPEN AT THE START
  //SET DEFAULT LOCATION AS SOON AS IT LOADS
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      ({coords:{latitude,longitude}})=>{
        setCoordinates({lat:latitude,lng:longitude});
    },
      (error) => {
        console.error("Geolocation error:", error);
        
      }
    );
  },[]);
  
  
  

  useEffect(()=>{
    // console.log(bounds,coordinates) 
    if(bounds.sw&&bounds.ne){
      setIsLoading(true)
      getPlacesData(type,bounds.sw,bounds.ne)
      .then((data)=>{
        // console.log(data)
        setPlaces(data?.filter((place)=>place.name&&place.num_reviews>0));
        setIsLoading(false)
        setFilteredPlaces([])
      })
    }
  },[type,bounds]);

  console.log(places)
  console.log(filteredPlaces)

  return (
    <>
        <Sec>
            <List places={filteredPlaces.length?filteredPlaces:places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            />
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={filteredPlaces.length?filteredPlaces:places}
              setChildClicked={setChildClicked}
            />
        </Sec>
    </>
  )
}

export default Section