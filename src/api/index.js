import axios from 'axios';

const getPlacesData=async(type,sw,ne)=>{
    try{
        const {data:{data}}=await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params: {
                // bl_latitude: '11.847676',
                // tr_latitude: '12.838442',
                // bl_longitude: '109.095887',
                // tr_longitude: '109.149359',
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': '80af1c1be3msh8b5074153dc9c86p10a535jsn6e4a5cca83cb',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        });
        // console.log(data)
        return data;
    }catch(error){
        console.log(error);
    }
};

export default getPlacesData;

 