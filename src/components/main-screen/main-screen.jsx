import PropTypes from 'prop-types';
import {PureComponent} from 'react';
// import {connect} from "react-redux";
import {mapStateToProps, mapDispatchToProps} from './main-screen.connect';

import Card from '../card/card';
import City from './components/city/city';
import {cities} from '../../mocks/cityCoords';
import MapWrapped from '../../hocs/withActualOffers/withActualOffers';

class MainScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  offerHoverHandler(offerItem) {
    return offerItem;
  }

  render() {
    const {currentOffers, currentCoords, offerClickHandler} = this.props;

    return <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
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
              {cities.map((item, index) => <City
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
              <b className="places__found">{currentOffers.length} {currentOffers.length === 1 ? `place` : `places`} to stay in Amsterdam</b>
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
                    key={it.name + i}
                    title={it.name}
                    images={it.images}
                    price={it.price}
                    rating={it.rating}
                    type={it.type}
                    onOfferOver={this.offerHoverHandler}
                    onOfferClick={offerClickHandler}
                  />;
                })}

              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {<MapWrapped currentOffers={currentOffers} currentCoords={currentCoords} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>;
  }
}

MainScreen.propTypes = {
  currentOffers: PropTypes.array,
  currentCoords: PropTypes.array,
  offerClickHandler: PropTypes.func,
};

export {MainScreen};
// export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
