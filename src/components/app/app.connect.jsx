import {ActionCreator} from '../../store/reducer';
import App from './app';
import {connect} from 'react-redux';
import configureAPI from '../../api';
// import {parseOffer} from '../../adapter';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  isLoading: state.isLoading,
  currentCoords: state.currentCoords,
  currentCity: state.currentCity,
  currentOffers: state.currentOffers,
});

const mapDispatchToProps = (dispatch) => ({
  loadOffers: (city) => {
    configureAPI
      .get(`/hotels`)
      .then((respond) => {
        // const parsedOffers = respond.data.map(parseOffer);
        dispatch(ActionCreator.loadOffers(respond.data));
        dispatch(ActionCreator.setLoadingState(false));
        dispatch(ActionCreator.getOffers(city, respond.data));
        dispatch(ActionCreator.changeCoords(city, respond.data));

      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
