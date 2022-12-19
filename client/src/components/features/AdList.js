import Row from 'react-bootstrap/Row';
import AdCard from './AdCard';

const AdList = ( props ) => {

  const ads = props.ads;

  
  return ( 
    <div>
      <Row className='d-flex flex-wrap my-4'>
        { ads.map( ad => (
          <AdCard key={ ad._id } title={ ad.title } localization={ ad.localization } photo={ ad.photo} id={ ad._id} />
        )) }
        </Row>     

      
    </div>
   );
}
 
export default AdList;