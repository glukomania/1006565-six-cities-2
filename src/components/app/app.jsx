import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';
import Details from '../details/detailes';
import React from 'react';


const getPageScreen = (props) => {
  const {offers} = props;

  let offer = {};

  const offerClickHandler = (title) => {
    offer = offers.find((item) => item.name === title);
    location.pathname = `/details`;
  };

  console.log(offer);

  switch (location.pathname) {
    default:
      return <MainScreen offers={offers} offerClickHandler={offerClickHandler}/>;
    case `/details`:
      return <Details offer={offer} />;
  }
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
