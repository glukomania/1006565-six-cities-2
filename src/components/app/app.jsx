import React from 'react';
import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';

const App = (props) => {
  const {places} = props;

  return <MainScreen
    places={places}
  />;
};

App.propTypes = {
  places: PropTypes.array.isRequired
};

export default App;
