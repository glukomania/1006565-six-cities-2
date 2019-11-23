import Card from '../card/card';
import City from './components/city/city';
import Map from '../map/map';
import Sorting from './components/sorting/sorting';
import {Link} from 'react-router-dom';
import {getCoords, filterOffers} from '../../store/actions';
import {sortOffers} from '../../store/actions';


class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setSortedOffers = props.setSortedOffers;
    this.currentOffers = props.currentOffers;

    if (props.currentOffers.length === 0) {
      const filteredOffers = filterOffers(props.currentCity, props.allOffers);
      props.setSortedOffers(filteredOffers);
    }

    this.currentCoords = getCoords(props.currentCity, props.allOffers);
    this.changeHandle = this.changeHandle.bind(this);
  }

  changeHandle(evt) {
    let sorted = sortOffers(this.props.currentOffers, evt.target.dataset.sorting);
    if (sorted.length === 0) {
      sorted = filterOffers(this.props.currentCity, this.props.allOffers);
    }
    this.setSortedOffers(sorted);
    this.forceUpdate();
  }

  offerHoverHandler(offerItem) {
    return offerItem;
  }

  getAllCities(offers) {
    const uniqueCities = offers.reduce((acc, elem) => acc.add(elem.city.name), new Set());
    return Array.from(uniqueCities).slice(0, 6);
  }

  render() {
    const {currentCity, allOffers, email, currentOffers} = this.props;

    return <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/login">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{email === undefined ? `Sign in` : email}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {this.getAllCities(allOffers).map((item, index) => <City
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
              <b className="places__found" onClick={this.updateHandler}>{currentOffers.length} {currentOffers.length === 1 ? `place` : `places`} to stay in {currentCity}</b>
              {<Sorting changeHandle={this.changeHandle}/>}
              <div className="cities__places-list places__list tabs__content">
                {currentOffers.map((it, i) => {
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
                  />;
                })}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {(this.currentCoords.length !== 0) ? <Map currentOffers={currentOffers} currentCoords={this.currentCoords} isOffer={false}/> : null}
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
  allOffers: PropTypes.array,
  email: PropTypes.string,
  currentOffers: PropTypes.array,
  setSortedOffers: PropTypes.func,
};

export default MainScreen;
