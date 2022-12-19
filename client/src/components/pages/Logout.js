import { API_URL } from '../../config';
import { logOut } from '../../redux/usersRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    //TODO: add logout on server - auth/logout
  useEffect(() => { 
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };

    fetch(`${API_URL}/auth/logout`, options )
      .then(() => {
        dispatch(logOut());
        navigate('/');
      })
    }, [dispatch])

    

    return null
  }
 
export default Logout;