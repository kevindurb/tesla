import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as actions from '../actions/geoSearch';

const provider = new OpenStreetMapProvider();

export const onLoad = () =>
  async (dispatch, getState, callApi) => {
    const updateLocation = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      dispatch(actions.setCurrentLocation([lat, lng]));
    };

    navigator.geolocation.getCurrentPosition(updateLocation);
    navigator.geolocation.watchPosition(updateLocation);
  }

export const search = query =>
  async (dispatch, getState, callApi) => {
    const results = await provider.search({ query });

    dispatch(actions.setResults(results));
  };
