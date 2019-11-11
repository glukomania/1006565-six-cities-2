import {ActionCreator} from '../../store/reducer';
import Map from '../map/map';
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

export default connect(mapDispatchToProps, mapStateToProps)(Map);
