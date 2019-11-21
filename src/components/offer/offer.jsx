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
                <span style={{width: offer.rating * 10 + `%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{Math.round(offer.rating * 10) / 10}</span>
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
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
              <ul className="reviews__list">
                {feedbacks === undefined ? null : feedbacks.map((item, index) => <Feedback key={index} feedback={item} />)}
              </ul>
              <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" htmlFor="review">Your review</label>
                <div className="reviews__rating-form form__rating">
                  <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                  <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                  <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                  <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                  <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                  <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </div>
                <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <section className="property__map map">
          {<Map currentOffers={nearbyOffers} currentCoords={currentCoords} isOffer={true}/>}

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
  currentCity: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  email: state.email,
  feedbacks: state.feedbacks,
  onOfferClick: state.onOfferClick,
  currentCity: state.currentCity,
});

const mapDispatchToProps = {
  onOfferClick: (id) => Operations.loadFeedbacks(id)
};


export default connect(mapStateToProps, mapDispatchToProps)(Offer);
