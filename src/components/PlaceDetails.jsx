import {React} from 'react';
import styled from 'styled-components'
import {Chip,Button,CardActions,Typography} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating'
import LocalPhoneOutlinedIcon from '@material-ui/icons/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';


const Wrapper=styled.div``;
const Card=styled.div``;
const CardMedia=styled.img`
height: 100%;
width: 100%;
`;
const CardContent=styled.div`
margin:10px;
`;
const Title=styled.h4`

`;
const Box=styled.div`
display: flex;
justify-content: space-between;
`;
const Subtitle=styled.h6``;



const PlaceDetails = ({place,selected,refProp}) => {
  // console.log(place);
  // To scroll into ChildClicked hotel or restaurant
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <>
      <Wrapper>
        <Card>
          <CardMedia
            style={{height:200}}
            src={place.photo?place.photo.images.large.url:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'}
            title={place.name}
          />
          <CardContent>
            <Title>{place.name}</Title>
            
            <Box>
              <Rating name="read-only" value={Number(place.rating)} readOnly/>
              <Subtitle> {place.num_reviews} review{place.num_reviews > 1 && 's'}</Subtitle>
            </Box>
            <Box>
              <Subtitle>Price</Subtitle>
              <Subtitle>{place.price}</Subtitle>
            </Box>
            <Box>
              <Subtitle>Ranking</Subtitle>
              <Subtitle style={{fontSize:'11px',}}>{place.ranking}</Subtitle>
            </Box>
            {place?.awards?.map((award) => (
              <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
                <img src={award.images.small} alt={place.name}/>
                <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
              </Box>
            ))}
            {place?.cuisine?.map(({ name }) => (
              <Chip key={name} size="small" label={name} 
              // className={classes.chip} 
              style={{margin: '5px 5px 5px 0',}}
              />
            ))}


            {/* {place?.is_closed?  (
              <Chip  style={{margin: '5px 5px 5px 0',}}size="small" color='primary' key={place.is_closed} label={place.is_closed} 
              // className={classes.chip} 
              />
            ):
            <Chip style={{margin: '5px 5px 5px 0',}} size='small'color='success' key={place.is_closed} label={place.is_closed} />} */}


            {place?.address&&(
              <Box>
                <LocationOnOutlinedIcon/>
                <Subtitle>{place.address}</Subtitle>
              </Box>
            )}
            {place?.phone&&(
              <Box>
                <LocalPhoneOutlinedIcon/>
                <Subtitle>{place.phone}</Subtitle>
              </Box>
            )}

            {/* {place.is_closed?(
              <Button size='small' color='danger'>{place.is_closed}</Button>
            ):(
              <Button size='small' color='success'>{place.is_closed}</Button>
            )} */}
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => window.open(place?.web_url, '_blank')}>
              Trip Advisor
            </Button>
            <Button size="small" color="primary" onClick={() => window.open(place?.website, '_blank')}>
              Website
            </Button>
        </CardActions>
        </Card>
      </Wrapper>
    </>
  )
}

export default PlaceDetails;