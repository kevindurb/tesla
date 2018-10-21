import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as awaits from '../../awaits/geoSearch';
import * as selectors from '../../selectors/geoSearch';
import * as actions from '../../actions/geoSearch';

const mapState = () =>
  createStructuredSelector({
    results: selectors.makeSearchResultsSelector(),
    selectedResult: selectors.makeSelectedResultSelector(),
    currentLocation: selectors.makeCurrentLocationSelector(),
  });

const mapDispatch = {
  onLoad: awaits.onLoad,
  onSearch: awaits.search,
  onSelectResult: actions.selectResult,
};

export default connect(mapState, mapDispatch);
