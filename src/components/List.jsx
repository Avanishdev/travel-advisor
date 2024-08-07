import styled from 'styled-components'
import PlaceDetails from './PlaceDetails';
import { createRef, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';


const Container=styled.div`
width: 40%;
height: auto;

`;
const Wrapper=styled.div`
margin: 14px ;
`;
const Title=styled.h4`

`;
const Grid=styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 14px;
`;
const Col=styled.div`

`;
const Label=styled.label``;
const Select=styled.select`
display: block;
`;
const Option=styled.option``;
const Wrap=styled.div`
background: #ececec;
height:100vh;
overflow-y: scroll;
border:1px solid gray;
border-radius: 6px;
`; 
const Card=styled.div`
margin:24px;
width:90%;
height:auto;
border:1px solid gray;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const List = ({places,childClicked,isLoading,type,setType,rating,setRating}) => {



  const [elRefs,setElRefs]=useState([]);

  useEffect(()=>{
    setElRefs((refs)=>Array(places?.length).fill().map((_,i)=>elRefs[i]||createRef()));
  },[places]);

  return (
    <Container>
      <Wrapper>
        <Title>Food & Dining around you.</Title>
        {isLoading?
        <div>
          <CircularProgress size="5rem" />
        </div>:
        (
          <>
            <Grid>
            <Col >
              <Label>Type</Label>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <Option value="restaurants" >Restaurants</Option>
                <Option value="hotels">Hotels</Option>
                <Option value="attractions">Attractions</Option>
              </Select>
            </Col>
            <Col >
              <Label>Rating</Label>
              <Select value={rating} onChange={(e) => setType(e.target.value)}>
                <Option value="" >All</Option>
                <Option value="3">Above 3.0</Option>
                <Option value="4">Above 4.0</Option>
                <Option value="4.5">Above 4.5</Option>
              </Select>
            </Col>
            </Grid>
          <Wrap>
            {places?.map((place,i)=>(
              <Card key={i}>
                <PlaceDetails place={place}
                  selected={Number(childClicked)===i}
                  refProp={elRefs[i]}
                />
              </Card>
            )
            )}
          </Wrap>
        </>
        )};
      </Wrapper>
    </Container>
  )
}

export default List