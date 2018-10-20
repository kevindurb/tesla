import React from 'react';
import PropTypes from 'prop-types';
import Map from '../Map';
import CarStatus from '../CarStatus';
import './App.css';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <div className="App__left">
          <CarStatus />
        </div>
        <div className="App__right">
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
