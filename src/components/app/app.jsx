import MainScreen from '../main-screen/main-screen.connect';
import Details from '../details/details';
import {offers} from '../../mocks/offers';

const offerClickHandler = () => {
  getPageScreen();
};

const getPageScreen = (props) => {
  const {isLoading} = props;

  const getIDFromAddress = () => {
    const id = offers[location.pathname.split(`-`).splice(-1) - 1];
    return id;
  };

  switch (location.pathname) {
    case `/`:
      return (isLoading || props.allOffers.length === 0) ? <div>Is loading...</div> : <MainScreen offerClickHandler={offerClickHandler}/>;
    case location.pathname:
      return <Details offer={getIDFromAddress()} />;
  }

  return <div>Ooops! No such page</div>;
};

const App = (props) => {
  if (props.allOffers.length === 0) {
    props.loadOffers(props.currentCity);
  }

  return <>{getPageScreen(props)}</>;
};

getPageScreen.propTypes = {
  offer: PropTypes.object.shape = {
    id: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    coords: PropTypes.array.isRequired,
  },
  isLoading: PropTypes.bool.isRequired
};

App.propTypes = {
  allOffers: PropTypes.array,
  loadOffers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default App;
