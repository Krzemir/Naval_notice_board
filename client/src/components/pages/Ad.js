import { useSelector } from "react-redux";
import { useState } from "react";
import { getAdById } from "../../redux/adsRedux";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../../redux/usersRedux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAds } from '../../redux/adsRedux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_URL, IMGS_URL } from '../../config';
import styles from './Ad.module.scss';

const Ad = () => {
  const adId = useParams().id;
  const ad = useSelector(getAdById(adId));
  const userLogin = useSelector(getUser);
  const[showDeleted, setShowDeleted] = useState(false);
  const [show, setShow] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseDeleted = () => setShowDeleted(false);
 
  
  if(!ad) return null;

  const {title, content, date, photo, localization, price, user} = ad


  const deleteAd = () => {
    fetch(`${ API_URL }/api/ads/${ adId }`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      dispatch(fetchAds());
      setShowDeleted(true);
      navigate('/')
    })};


  const handleSubmit = () => {
    setShow(false);
    deleteAd();
  }

  return (
    <div>

      <Row>
        <Col sm={4} ><img src={IMGS_URL + photo } className={styles.image}/></Col>
        <Col sm={4}>
          <ListGroup variant="flush">
            <ListGroup.Item className="h2">{ title }</ListGroup.Item>
            <ListGroup.Item variant="light">Where: { localization }</ListGroup.Item>
            <ListGroup.Item className={`h3 ${ styles.price }`}>Price: { price } USD</ListGroup.Item>
            <ListGroup.Item variant="light">Date added: { date }</ListGroup.Item>
            <ListGroup.Item variant="light">By: { user.login }</ListGroup.Item>
          </ListGroup>

          { userLogin && userLogin.user === user.login &&
          <div className="col border-end  d-flex justify-content-center align-items-center">
            <Link to={`${ process.env.PUBLIC_URL }/edit-ad/${ adId }`}>
            <Button variant="success" className='mx-2'>
              Edit your notice
            </Button>
            </Link>
            
            <Button variant="danger" className='mx-2' onClick={handleShow}>
              Delete your notice
            </Button>
            
          </div>
          } 
          
        </Col>    
      </Row>
      <Row className="p-3 m-2">{ content }</Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete notice?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, are you sure? That can't be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Yes, I'm sure!
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleted} onHide={handleCloseDeleted}>
        <Modal.Header closeButton>
          <Modal.Title>Notice deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>There's nothing more here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
        handleCloseDeleted(); 
        navigate('/')
      }}>
            Okay
          </Button>
         
        </Modal.Footer>
      </Modal>



    </div>
    );
}
 
export default Ad;