import React from 'react';
import PropTypes from 'prop-types';
import 'leaflet-routing-machine';
import * as L from 'leaflet';

class Routing extends React.PureComponent {
  static propTypes = {
    leaflet: PropTypes.shape({
      map: PropTypes.object,
    }),
    waypoints: PropTypes.array,
  };

  componentDidMount() {
    new L.Routing.Control({
      waypoints: this.props.waypoints,
    }).addTo(this.props.leaflet.map);
  }

  render() {
    return (
      <div />
    );
  }
}

export default Routing;
