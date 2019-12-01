import {ActionCreator} from '../../store/reducer';
import MainScreen from '../main-screen/main-screen';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.currentCity,
  currentOffers: state.currentOffers,
  allOffers: state.allOffers,
  userCredentials: state.userCredentials,
  setSortedOffers: state.setSortedOffers,
  sortingType: state.sortingType,
  isAuthorized: state.isAuthorized,
  setActivePinCoords: state.setActivePinCoords,
  activeCardCoords: state.activeCardCoords,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (value) => {
    dispatch(ActionCreator.changeCity(value));
  },
  setSortedOffers: (value) => {
    dispatch(ActionCreator.setSortedOffers(value));
  },
  setActivePinCoords: (value) => {
    dispatch(ActionCreator.setActivePinCoords(value));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
