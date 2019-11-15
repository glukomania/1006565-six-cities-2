import {ActionCreator} from '../../store/reducer';
import App from './app';
import {connect} from 'react-redux';
import configureAPI from '../../api';

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadOffers: () => {
    console.log(`start loading....`);
    configureAPI
      .get(`/hotels`)
      .then((respond) => {
        dispatch(ActionCreator.loadOffers(respond.data));
        dispatch(ActionCreator.setLoadingState(false));
        console.log(respond.data);
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
