import Card from '../card/card';
import City from './components/city/city';
import Map from '../map/map';
import {Link} from 'react-router-dom';
import {getCoords, filterOffers} from '../../store/actions';

class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  offerHoverHandler(offerItem) {
    return offerItem;
  }

  getAllCities(offers) {
    const uniqueCities = offers.reduce((acc, elem) => acc.add(elem.city.name), new Set());
    return Array.from(uniqueCities).slice(0, 6);
  }


  render() {
    const {currentCity, allOffers, email} = this.props;

    const currentCoords = getCoords(currentCity, allOffers);

    const currentOffers = filterOffers(currentCity, allOffers);

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
              <b className="places__found">{currentOffers.length} {currentOffers.length === 1 ? `place` : `places`} to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
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
                {(currentCoords.length !== 0) ? <Map currentOffers={currentOffers} currentCoords={currentCoords} /> : null}
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
};

export default MainScreen;
