import Header from "../views/Header";
import { useSelector } from "react-redux";
import { getAllAds } from "../../redux/adsRedux";
import AdList from "../features/AdList";

const Home = () => {

  const ads = useSelector(getAllAds);
  
  return (
    <>
      < Header />
      <h1 style={{ color: '#111947' }}>All ads</h1>
      <AdList ads={ads}/>
    </>
    );
}
 
export default Home;