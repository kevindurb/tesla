import React from 'react';
import PropTypes from 'prop-types';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as Leaflet from 'react-leaflet';
import * as L from 'leaflet';
import car from '../../images/car.png';
import 'leaflet/dist/leaflet.css';

const style = {
  height: '100%',
  width: '100%',
  overflow: 'hidden',
}

const tesla = L.icon({
  iconUrl: car,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

class Map extends React.PureComponent {
  state = {
    mapLocation: null,
    markerLocation: null,
  };

  constructor(props) {
    super(props);
    this.provider = new OpenStreetMapProvider();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.setInitialPosition);
    navigator.geolocation.watchPosition(this.setPosition);

    this.provider.search({ query: '7350 Timber grove Pl' })
      .then(console.log.bind(console));
  }

  setInitialPosition = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    this.setState({
      mapLocation: { lat, lng },
      markerLocation: { lat, lng },
    });
  }

  setPosition = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    this.setState({
      markerLocation: { lat, lng },
    });
  }

  render() {
    return (
      <Leaflet.Map
        center={this.state.mapLocation}
        zoom={19}
        style={style}
      >
        <Leaflet.TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Leaflet.Marker
          icon={tesla}
          position={this.state.markerLocation}
        />
      </Leaflet.Map>
    );
  }
}

export default Map;
