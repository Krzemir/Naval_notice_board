import AdList from '../features/AdList';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import { useEffect, useState } from 'react';

const Search = () => {
  const search = useParams().search
  const [searchedAds, setSearchedAds] = useState(null);
 
  useEffect(() => {
  fetch(`${API_URL}/API/ads/search/${search}`)
  .then(res => res.json())
  .then(ads => setSearchedAds(ads))
  }, [])

  if(!searchedAds) return null;

  return (
    <div>
      <h1 style={{ color: '#111947' }}>Search results for: {search}</h1>
      <AdList ads={searchedAds}/>
    </div>
    );
}
 
export default Search;