import * as R from 'ramda';
import {
  SET_RESULTS,
  SELECT_RESULT,
  SET_CURRENT_LOCATION,
} from '../actions/geoSearch';

const initialState = {
  results: [],
  selectedResult: null,
  currentLocation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULTS:
      return R.assoc(
        'results',
        action.payload,
        state,
      );
    case SELECT_RESULT:
      return R.assoc(
        'selectedResult',
        action.payload,
        state,
      );
    case SET_CURRENT_LOCATION:
      return R.assoc(
        'currentLocation',
        action.payload,
        state,
      );
    default:
      return state;
  }
};
