import {ActionCreator} from '../../store/reducer';
import App from './app';
import {connect} from 'react-redux';
// import createAPI from '../../api';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  isLoading: state.isLoading,
  currentCoords: state.currentCoords,
  currentCity: state.currentCity,
  currentOffers: state.currentOffers,
});

const mapDispatchToProps = (dispatch) => ({
  getInitialData: (city, allOffers) => {
    dispatch(ActionCreator.changeCoords(city, allOffers));
    dispatch(ActionCreator.getOffers(city, allOffers));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
