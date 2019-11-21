import {ActionCreator} from '../../store/reducer';
import MainScreen from '../main-screen/main-screen';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.currentCity,
  currentCoords: state.currentCoords,
  currentOffers: state.currentOffers,
  allOffers: state.allOffers,
  email: state.email,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (value) => {
    dispatch(ActionCreator.changeCity(value));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
