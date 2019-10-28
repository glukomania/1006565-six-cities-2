import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';
import Details from '../details/details';
import React from 'react';

const offerClickHandler = (props) => {
  getPageScreen(props);
};

const getPageScreen = (props) => {
  const {offers} = props;

  const getIDFromAddress = (mocks) => {
    const id = mocks[location.pathname.split(`-`).splice(-1) - 1];
    return id;
  };

  switch (location.pathname) {
    case `/`:
      return <MainScreen offers={offers} offerClickHandler={offerClickHandler}/>;
    case location.pathname:
      return <Details offer={getIDFromAddress(offers)} />;
  }

  return <div>Ooops! No such page</div>;
};

const App = (props) => {
  return <React.Fragment>{getPageScreen(props)}</React.Fragment>;
};

getPageScreen.propTypes = {
  offers: PropTypes.array.isRequired,
  offer: PropTypes.any,
  detailesProps: PropTypes.any,
};


App.propTypes = {
  offers: PropTypes.array.isRequired
};

export default App;
