import { API_URL } from "../config";


//selectors

export const getAllAds = state => state.ads;
export const getAdById = (id) => state => state.ads.find(ad => ad._id === id);


// actions
const createActionName = actionName => `app/ads/${actionName}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');

// action creators
export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const addAd = payload => ({ payload, type: ADD_AD });


//API requests
export const fetchAds = () => {
  return (dispatch) => {
  fetch(API_URL + '/api/ads')
    .then(res => res.json())
    .then(ads => dispatch(loadAds(ads)))
  };
};

export const addAdRequest = newAdData => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAdData),
    };
    fetch(API_URL + '/api/ads', options)
    .then(() => dispatch(addAd(newAdData)))
  };
};



//reducer
const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS: {
      return [...action.payload];
      }
    case ADD_AD: {
      return [...statePart, action.payload];
    }
 
    default:
      return statePart;
  };
};

export default adsReducer;