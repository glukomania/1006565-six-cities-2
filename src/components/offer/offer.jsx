import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropertyPhoto from './components/studio-photo/property-photo';
import Features from './components/features/features';
import InsideItem from './components/inside-item/inside-item';
import Feedback from './components/feedback/feedback';
import {Operations} from '../../store/reducer';
import Map from '../../components/map/map';
import Card from '../../components/card/card';
import Comment from './components/comment/comment';
import {filterOffers, getCoords} from '../../store/actions';

const Offer = (props) => {
  const {allOffers, email, feedbacks, currentCity} = props;
  const id = props.match.params.id;

  if (props.feedbacks.length === 0) {
    props.onOfferClick(id);
  }

  const offerHoverHandler = (offerItem) => {
    return offerItem;
  };

  const offer = allOffers.find((item) => item.id === +id);

  const hostAvatarUrl = `../` + offer.host.avatar_url;

  const nearbyOffers = filterOffers(currentCity, allOffers).slice(0, 3);
  const currentCoords = getCoords(currentCity, allOffers);

  return offer ? <div className="page">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="../img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={email === undefined ? `/login` : `/`}>
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

    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer.images.map((item, index) => <PropertyPhoto key={index} src={item}/>)}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            <div className="property__mark">
              <span>Premium</span>
            </div>
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer.title}
              </h1>
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: offer.rating * 20 + `%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">&nbsp;{Math.round(offer.rating * 10) / 10}</span>
            </div>
            {<Features
              bedroom={offer.bedrooms}
              adults={offer.max_adults}
            />}
            <div className="property__price">
              <b className="property__price-value">&euro;{offer.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer.goods.map((item, index) => <InsideItem key={index} item={item}/>)}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={hostAvatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {offer.host.name}
                </span>
                <span className="property__user-status">
                  {offer.host.is_pro ? `Pro` : `Free`}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{feedbacks.length}</span></h2>
              <ul className="reviews__list">
                {feedbacks === undefined ? null : feedbacks.map((item, index) => <Feedback key={index} feedback={item} />)}
              </ul>
              {props.isAuthorized ? <Comment /> : ``}
            </section>
          </div>
        </div>
        <section className="property__map map">
          {<Map currentOffers={nearbyOffers} currentCity={currentCity} isOffer={true}/>}

        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearbyOffers.map((it, i) => {
              return <Card
                id={it.id}
                isPremium={it.is_premium}
                key={it.title + i}
                title={it.title}
                images={it.images}
                price={it.price}
                rating={it.rating * 10}
                type={it.type}
                onOfferOver={offerHoverHandler}
              />;
            })}
          </div>
        </section>
      </div>
    </main>
  </div> : <div style={{textAlign: `center`, fontSize: `70px`, padding: `100px 60px`, color: `#ffffff`}}>Page not found</div>;
};


Offer.propTypes = {
  allOffers: PropTypes.array.isRequired,
  email: PropTypes.string,
  match: PropTypes.object,
  feedbacks: PropTypes.array.isRequired,
  onOfferClick: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  email: state.email,
  feedbacks: state.feedbacks,
  onOfferClick: state.onOfferClick,
  currentCity: state.currentCity,
  isAuthorized: state.isAuthorized,
});

const mapDispatchToProps = {
  onOfferClick: (id) => Operations.loadFeedbacks(id)
};


export default connect(mapStateToProps, mapDispatchToProps)(Offer);
