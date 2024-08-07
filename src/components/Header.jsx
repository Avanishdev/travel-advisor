import styled from 'styled-components'
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@react-google-maps/api'
import { useState } from 'react';


const Head=styled.header`
  box-sizing: border-box;
`;
const Navbar=styled.nav`
display: flex;
justify-content: space-between;
background-color: #1070ca;
color: white;
padding: 0.5rem;
`;
const Left=styled.div`
  
`;
const Title=styled.h3``;
const Right=styled.div`
display: flex;
align-items: center;
`;
const Explore = ({ className, children }) => (
    <a className={className} href='/' style={{textDecoration:'none',color:'white'}}>
      {children}
    </a>
  );
  
const SearchContainer=styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0px 4px;
`;
const Input=styled.input`
padding: 3px;
border-radius: 8px;
`;
const Header = ({setCoordinates}) => {

const [autocomplete,setAutoComplete]=useState(null)

const onLoad=(autoC)=>setAutoComplete(autoC)

const onPlaceChanged=()=>{
  const lat=autocomplete.getPlace().geometery.location.lat();
  const lng=autocomplete.getPlace().geometery.location.lng();

  setCoordinates({lat,lng});
}

  return (
    <> 
        <Head>
            <Navbar>
                <Left>
                    <Title>Travel Advisor</Title>
                </Left>
                <Right> 
                        <Explore>Explore new places</Explore>
                        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <SearchContainer>
                            <SearchIcon/>                           
                            <Input placeholder='Search...'/>
                        </SearchContainer>
                        </Autocomplete>
                </Right>
            </Navbar>
        </Head>
    </>
  )
}

export default Header