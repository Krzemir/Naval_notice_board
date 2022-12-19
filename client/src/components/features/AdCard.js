import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import styles from './AdCard.module.scss';
import { IMGS_URL } from '../../config';

const AdCard = ({ title, localization, photo, id }) => {
  return ( 
    <Card style={{ width: '18rem', marginBottom: '2rem', marginInline: '1rem', color: '#111947' }} >
      <Card.Img variant="top"  className={`${styles.cardImage} my-2`} src={IMGS_URL + photo } />
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{ localization }</Card.Subtitle>
        <NavLink to={`/ad/${id}`} >
          <Button variant="secondary" >Se(a) it!</Button>
        </NavLink>
      </Card.Body>
    </Card>
   );
}
 
export default AdCard;