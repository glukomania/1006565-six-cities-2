import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../../../store/reducer';

const City = (props) => {
  const {city, onCityClick, currentCity} = props;

  const cityClickHandler = () => {
    onCityClick(city);
    // const target = evt.target;
    // target.parentNode.classList.add(`tabs__item--active`);
  };

  return <li className="locations__item" onClick={cityClickHandler}>
    <a className={city === currentCity ? `locations__item-link tabs__item tabs__item tabs__item--active` : `locations__item-link`} href="#">
      <span>{city}</span>
    </a>
  </li>;
};

City.propTypes = {
  city: PropTypes.string.isRequired,
  onCityClick: PropTypes.func,
  currentCity: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.currentCity,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (value) => {
    dispatch(ActionCreator.changeCity(value));
    dispatch(ActionCreator.changeCoords(value));
    dispatch(ActionCreator.getOffers(value));
  }
});

export {City};
export default connect(mapStateToProps, mapDispatchToProps)(City);
