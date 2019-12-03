import Card from '../card/card';
import City from './components/city/city';
import Map from '../map/map';
import Sorting from './components/sorting/sorting';
import {getCoords, filterOffers} from '../../store/actions';
import {sortOffers} from '../../store/actions';
import EmptyMain from '../empty-main/empty-main';
import Header from '../header/header';

class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.offerHoverHandler = this.offerHoverHandler.bind(this);

    this.setSortedOffers = props.setSortedOffers;

    if (props.currentOffers.length === 0) {
      const filteredOffers = filterOffers(props.currentCity, props.allOffers);
      props.setSortedOffers(filteredOffers);
    }


    this.currentCoords = getCoords(props.currentCity, props.allOffers);
    this.changeHandle = this.changeHandle.bind(this);
    this.handleRedirectToLogin = this.handleRedirectToLogin.bind(this);
  }

  changeHandle(evt) {
    let sorted = sortOffers(this.props.currentOffers, evt.target.dataset.sorting);
    if (sorted.length === 0) {
      sorted = filterOffers(this.props.currentCity, this.props.allOffers);
    }
    this.setSortedOffers(sorted);
    this.forceUpdate();
  }

  offerHoverHandler(id) {
    const activeOffer = this.props.allOffers.find((item) => item.id === id);
    const coords = [activeOffer.location.latitude, activeOffer.location.longitude];
    this.props.setActivePinCoords(coords);
  }

  getAllCities(offers) {
    const uniqueCities = offers.reduce((acc, elem) => acc.add(elem.city.name), new Set());
    return Array.from(uniqueCities).slice(0, 6);
  }

  handleRedirectToLogin() {
    this.props.history.push(`/login`);
  }

  render() {

    return (this.props.allOffers.length === 0 || this.props.currentOffers.length === 0) ? <EmptyMain /> : <div className="page page--gray page--main">
      <Header isInner={false} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {this.getAllCities(this.props.allOffers).map((item, index) => <City
                key={index}
                city={item}
              />)}

            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found" onClick={this.updateHandler}>{this.props.currentOffers.length} {this.props.currentOffers.length === 1 ? `place` : `places`} to stay in {this.props.currentCity}</b>
              {<Sorting changeHandle={this.changeHandle}/>}
              <div className="cities__places-list places__list tabs__content">
                {this.props.currentOffers.map((it, i) => {
                  return <Card
                    id={it.id}
                    isPremium={it.is_premium}
                    key={it.title + i}
                    title={it.title}
                    images={it.images}
                    price={it.price}
                    rating={it.rating * 10}
                    type={it.type}
                    onOfferOver={this.offerHoverHandler}
                    redirectToLogin={this.handleRedirectToLogin}
                  />;
                })}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {<Map
                  currentOffers={this.props.currentOffers}
                  currentCity={this.props.currentCity}
                  isOffer={false}
                  activeCardCoords={this.props.activeCardCoords}
                />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>;
  }
}

MainScreen.propTypes = {
  currentCity: PropTypes.string.isRequired,
  allOffers: PropTypes.array.isRequired,
  userCredentials: PropTypes.object,
  currentOffers: PropTypes.array,
  setSortedOffers: PropTypes.func,
  isAuthorized: PropTypes.bool.isRequired,
  setActivePinCoords: PropTypes.func,
  history: PropTypes.object,
  activeCardCoords: PropTypes.array
};

export default MainScreen;
