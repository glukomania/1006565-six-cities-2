import {connect} from 'react-redux';
import {ActionCreator} from '../../../../store/reducer';
import {filterOffers} from '../../../../store/actions';

const City = (props) => {
  const {city, onCityClick, currentCity, allOffers} = props;

  const cityClickHandler = () => {
    const filteredOffers = filterOffers(city, allOffers);
    onCityClick(city, filteredOffers);
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
  currentCity: PropTypes.string.isRequired,
  filterOffers: PropTypes.func,
  allOffers: PropTypes.array
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  currentCity: state.currentCity,
  allOffers: state.allOffers
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city, offers) => {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.setSortedOffers(offers));
  },
});

export {City};
export default connect(mapStateToProps, mapDispatchToProps)(City);
