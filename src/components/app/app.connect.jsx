import App from './app';
import {connect} from 'react-redux';
import {Operations} from '../../store/reducer';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  isLoading: state.isLoading,
  currentCity: state.currentCity,
  loadOffers: state.loadOffers,
  onOfferClick: state.onOfferClick,
  isAuthorized: state.isAuthorized,
  loadFavorites: state.loadFavorites,
});

const mapDispatchToProps = {
  loadOffers: Operations.loadOffers,
  loadFavorites: Operations.loadFavorites,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
