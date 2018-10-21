export const SET_RESULTS = '@@geoSearch/SET_RESULTS';
export const SELECT_RESULT = '@@geoSearch/SELECT_RESULT';
export const SET_CURRENT_LOCATION = '@@geoSearch/SET_CURRENT_LOCATION';

export const setResults = results => ({
  type: SET_RESULTS,
  payload: results,
});

export const selectResult = result => ({
  type: SELECT_RESULT,
  payload: result,
});

export const setCurrentLocation = location => ({
  type: SET_CURRENT_LOCATION,
  payload: location,
});
