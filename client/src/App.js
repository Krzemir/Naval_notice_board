import { Routes, Route } from 'react-router-dom';
import { fetchAds } from "./redux/adsRedux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_URL } from './config';
import { logIn } from './redux/usersRedux';
import Home from './components/pages/Home';
import Ad from './components/pages/Ad';
import EditAd from './components/pages/EditAd';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Register from './components/pages/Register';
import NewAd from './components/pages/NewAd';
import Search from './components/pages/Search';
import NotFound from './components/pages/NotFound';
import NavBar from './components/views/NavBar';
import { Container } from 'react-bootstrap'
import Footer from './components/views/Footer';


function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAds()), [dispatch])


  const options = {
    credentials: 'include',
  };

 
   fetch(`${API_URL}/auth/user`, options)
    .then(res => {
      
      if (res.status === 200) {
        res.json()
        .then(data => data.user)
        .then(user => { dispatch(logIn({ user }))})
      }
    })
    .catch(err => console.log('user not logged in'));   
   

  return (
    <main>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/edit-ad/:id" element={<EditAd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-ad" element={<NewAd />} />
          <Route path="/search/:search" element={<Search />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
      
    </main>
  );
}

export default App;
