import App from './app';
import {connect} from 'react-redux';
import {Operations} from '../../store/reducer';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  isLoading: state.isLoading,
  currentCity: state.currentCity,
  loadOffers: state.loadOffers,
  onOfferClick: state.onOfferClick
});

const mapDispatchToProps = {
  loadOffers: Operations.loadOffers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
