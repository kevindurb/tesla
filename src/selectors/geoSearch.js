export const makeSearchResultsSelector = () =>
  state => state.geoSearch.results;

export const makeSelectedResultSelector = () =>
  state => state.geoSearch.selectedResult;

export const makeCurrentLocationSelector = () =>
  state => state.geoSearch.currentLocation;
