import {connect} from 'react-redux';
import {ActionCreator} from '../../../../store/reducer';

const City = (props) => {
  const {city, onCityClick, filterOffers, currentCity, allOffers} = props;

  const cityClickHandler = () => {
    onCityClick(city, allOffers);
    filterOffers(city, allOffers);
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
  allOffers: state.allOffers
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (value, allOffers) => {
    dispatch(ActionCreator.changeCity(value, allOffers));
    dispatch(ActionCreator.changeCoords(value, allOffers));
  },
  filterOffers: (city, allOffers) => {
    dispatch(ActionCreator.getOffers(city, allOffers));
  }
});

export {City};
export default connect(mapStateToProps, mapDispatchToProps)(City);
