import MainScreen from '../main-screen/main-screen.connect';
import Offer from '../offer/offer';
import Login from '../login/login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const App = (props) => {
  const {isLoading, allOffers} = props;

  if ((props.isLoading === false) && (props.currentOffers.length === 0)) {
    props.getInitialData(props.currentCity, props.allOffers, props.isLoading);
  }

  return allOffers.length === 0 ? null : <Router>
    <Switch>
      <Route path="/" exact component={(isLoading || allOffers.length === 0) ? null : MainScreen} />;
      <Route path='/login' exact component={Login} />;
      <Route path='/offer/:id' exact render={(offerProps) => <Offer {...offerProps}/>} />;
      <Route render={() => <div style={{textAlign: `center`, fontSize: `70px`, padding: `100px 60px`, color: `#ffffff`}}>Page not found</div>} />
    </Switch>
  </Router>;
};

App.propTypes = {
  allOffers: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  currentCity: PropTypes.string.isRequired,
  getInitialData: PropTypes.func.isRequired,
  currentOffers: PropTypes.array,
};

export default App;
