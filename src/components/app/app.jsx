import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';
import Details from '../details/details';
import {offers} from '../../mocks/offers';

const offerClickHandler = () => {
  getPageScreen();
};

const getPageScreen = () => {

  const getIDFromAddress = () => {
    const id = offers[location.pathname.split(`-`).splice(-1) - 1];
    return id;
  };

  switch (location.pathname) {
    case `/`:
      return <MainScreen offerClickHandler={offerClickHandler}/>;
    case location.pathname:
      return <Details offer={getIDFromAddress()} />;
  }

  return <div>Ooops! No such page</div>;
};

const App = () => {
  return <>{getPageScreen()}</>;
};

getPageScreen.propTypes = {
  offer: PropTypes.any,
};

export default App;
