import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import * as Leaflet from 'react-leaflet';
import * as L from 'leaflet';
import {
  FormControl,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import Routing from './components/Routing';
import car from '../../images/car.png';
import place from '../../images/place.png';
import currentLocation from '../../images/current_location.png';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const tesla = L.icon({
  iconUrl: car,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const pin = L.icon({
  iconUrl: place,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

class Map extends React.PureComponent {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    selectedResult: PropTypes.shape({
    }),
    currentLocation: PropTypes.array.isRequired,
  };

  state = {
    focused: 'CURRENT',
    mapLocation: null,
    selectedResult: null,
    showResults: false,
    searchQuery: '',
    zoom: 18,
  };

  componentDidMount() {
    this.props.onLoad();
  }

  onFocusCurrentLocation = () => (
    this.setState({ focused: 'CURRENT' })
  )

  onShowResults = () => (
    this.setState({ showResults: true })
  )

  onViewportChange = ({ center, zoom }) => {
    this.setState({
      mapLocation: center,
      zoom,
    });
  }

  onSelectResult = result => () => {
    this.props.onSelectResult(result);
    this.setState({
      showResults: false,
      focused: 'SELECTED',
    });
  }

  onSearch = event => {
    const value = event.target.value;

    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.props.onSearch(value);
    }, 100);
    this.setState({ showResults: true });
  }

  getId = R.pathOr(null, ['raw', 'place_id']);

  getIsSelected = (result) => {
    return this.getId(result) === this.getId(this.props.selectedResult);
  }

  getMapCenter = () => {
    const selectedResult = this.props.selectedResult;
    switch (this.state.focused) {
      case 'CURRENT':
        return this.props.currentLocation;
      case 'SELECTED':
        return [selectedResult.y, selectedResult.x];
      default:
        return this.state.mapLocation;
    }
  }

  renderResult = result => (
    <ListGroupItem
      active={this.getIsSelected(result)}
      key={this.getId(result)}
      onClick={this.onSelectResult(result)}
    >
      {result.label}
    </ListGroupItem>
  )

  renderResults() {
    if (!this.state.showResults) return null;
    return (
      <ListGroup className="Map__results">
        {this.props.results.map(this.renderResult)}
      </ListGroup>
    );
  }

  renderSelectedMarker() {
    if (!this.props.selectedResult) return null;
    const selectedResult = this.props.selectedResult;
    return (
      <Leaflet.Marker
        icon={pin}
        position={[selectedResult.y, selectedResult.x]}
      />
    );
  }

  renderRouting() {
    if (!this.props.selectedResult) return null;
    const selectedResult = this.props.selectedResult;
    const currentLocation = this.props.currentLocation;
    return (
      <Routing
        waypoints={[
          currentLocation,
          [selectedResult.y, selectedResult.x],
        ]}
      />
    );
  }

  render() {
    return (
      <div className="Map">
        <Leaflet.Map
          onViewportChange={this.onViewportChange}
          center={this.getMapCenter()}
          zoom={this.state.zoom}
        >
          <Leaflet.TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Leaflet.Marker
            icon={tesla}
            position={this.props.currentLocation}
          />
          {this.renderSelectedMarker()}
          {this.renderRouting()}
        </Leaflet.Map>
        <FormControl
          className="Map__searchInput"
          type="text"
          placeholder="Navigate to..."
          onChange={this.onSearch}
          onFocus={this.onShowResults}
        />
        <img
          src={currentLocation}
          className="Map__currentLocation"
          onClick={this.onFocusCurrentLocation}
        />
        {this.renderResults()}
      </div>
    );
  }
}

export default Map;
