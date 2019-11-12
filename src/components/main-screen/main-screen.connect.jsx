import {ActionCreator} from '../../store/reducer';
import MainScreen from '../main-screen/main-screen';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.currentCity,
  currentCoords: state.currentCoords,
  currentOffers: state.currentOffers,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (value) => {
    dispatch(ActionCreator.changeCity(value));
    dispatch(ActionCreator.changeCoords(value));
    dispatch(ActionCreator.getOffers(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
