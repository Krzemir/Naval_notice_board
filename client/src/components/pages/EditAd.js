import AdForm from '../features/AdForm';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../redux/adsRedux';
import { getUser } from '../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const EditAd = () => {
  const adId = useParams().id;
  const userLogin = useSelector(getUser);
  const adUser = useSelector(getAdById(adId)).user.login;
  const adData = useSelector(getAdById(adId));
  let ad = null;
  const navigate = useNavigate();



  ad = adData;

   if (userLogin.user === adUser) {
    ad = adData;
  } else {
    navigate('/not-found')
  }
  
  if(!ad) return null;


  return ( 
    <div>
      <h1 className='col-12 col-sm-3 mx-auto' style={{ color: '#111947' }}>Edit your notice</h1>
      <AdForm ad={ad}/>
    </div>
   );
}
 
export default EditAd;