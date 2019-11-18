import {ActionCreator} from '../../store/reducer';
import App from './app';
import {connect} from 'react-redux';
import configureAPI from '../../api';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  isLoading: state.isLoading,
  currentCoords: state.currentCoords,
  currentCity: state.currentCity,
  currentOffers: state.currentOffers,
});

const mapDispatchToProps = (dispatch) => ({
  loadOffers: (city) => init(city, dispatch)
});

export const init = (city, dispatch) => {
  return configureAPI
    .get(`/hotels`)
    .then((respond) => {
      console.log(respond);
      dispatch(ActionCreator.loadOffers(respond.data));
      dispatch(ActionCreator.setLoadingState(false));
      dispatch(ActionCreator.getOffers(city, respond.data));
      dispatch(ActionCreator.changeCoords(city, respond.data));
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
