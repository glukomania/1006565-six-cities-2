import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PropertyPhoto from './components/studio-photo/property-photo';
import Features from './components/features/features';
import InsideItem from './components/inside-item/inside-item';
import Feedback from './components/feedback/feedback';
import {Operations} from '../../store/reducer';
import Map from '../../components/map/map';
import Card from '../../components/card/card';
import Comment from './components/comment/comment';
import Header from '../header/header';
import {filterOffers} from '../../store/actions';
import withFormSubmit from '../../hocs/withFormSubmit/withFormSubmit';

const Offer = (props) => {
  const {allOffers, feedbacks, currentCity} = props;
  const id = props.match.params.id;

  let sliceSortFeedbacks = [];

  if ((props.feedbacks === null)) {
    props.onOfferClick(id);
  }

  if (props.feedbacks !== null) {
    sliceSortFeedbacks = props.feedbacks.slice(0, 11).sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log(feedbacks);
    console.log(id);
  }

  const offerHoverHandler = (offerItem) => {
    return offerItem;
  };

  const offer = allOffers.find((item) => item.id === Number(id));
  let status = props.favorites.find((item) => item.id === Number(id)) ? 1 : 0;
  const clickHandler = () => {
    if (props.isAuthorized) {
      if (status === 1) {
        status = 0;
        props.setFavorite(id, status);
      } else {
        status = 1;
        props.setFavorite(id, status);
      }
      props.loadFavorites();
    } else {
      props.history.push(`/login`);
    }
  };

  const CommentWrapped = withFormSubmit(Comment);

  const hostAvatarUrl = `../` + offer.host.avatar_url;

  const nearbyOffers = filterOffers(currentCity, allOffers).slice(0, 3);

  const currentOfferCoords = [offer.location.latitude, offer.location.longitude];

  const submitHandler = (comment) => {
    props.sendComment(props.match.params.id, comment);
  };

  return offer ? <div className="page">
    <Header isInner={true}/>

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
              <button className={status === 1 && props.isAuthorized ? `property__bookmark-button--active property__bookmark-button button` : `property__bookmark-button button`} type="button" onClick={clickHandler}>
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
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{feedbacks === null ? 0 : feedbacks.length}</span></h2>
              <ul className="reviews__list">
                {(feedbacks === null || feedbacks.length === 0) ? null : sliceSortFeedbacks.map((item, index) => <Feedback key={index} feedback={item} />)}
              </ul>
              {props.isAuthorized ? <CommentWrapped onSubmitClick={submitHandler}/> : ``}
            </section>
          </div>
        </div>
        <section className="property__map map">
          {<Map
            currentOffers={nearbyOffers}
            currentCity={currentCity}
            activeCardCoords={currentOfferCoords}
            isOffer={true}/>}

        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearbyOffers.map((it, i) => {
              if (it.id === Number(id)) {
                return ``;
              }
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
  feedbacks: PropTypes.array,
  onOfferClick: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  userCredentials: PropTypes.object,
  favorites: PropTypes.array,
  setFavorite: PropTypes.func,
  loadFavorites: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.allOffers,
  email: state.email,
  feedbacks: state.feedbacks,
  onOfferClick: state.onOfferClick,
  currentCity: state.currentCity,
  isAuthorized: state.isAuthorized,
  userCredentials: state.userCredentials,
  favorites: state.favorites,
  loadFavorites: state.loadFavorites,
});

const mapDispatchToProps = {
  setFavorite: (id, status) => Operations.setFavorite(id, status),
  onOfferClick: (id) => Operations.loadFeedbacks(id),
  loadFavorites: Operations.loadFavorites,
  sendComment: (id, comment) => Operations.sendComment(id, comment)

};

export {Offer};
export default connect(mapStateToProps, mapDispatchToProps)(Offer);
