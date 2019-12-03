import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Operations} from '../../store/reducer';
import {connect} from 'react-redux';

const Card = (props) => {
  const {id, isPremium, title, images, price, rating, type, onOfferOver, redirectToLogin} = props;

  const bookmarkRef = React.createRef();
  const setAddress = () => {
    return `/offer/${id}`;
  };

  let status = props.favorites.find((item) => item.id === id) ? 1 : 0;

  const clickHandler = () => {
    if (props.isAuthorized) {
      if (status === 1) {
        status = 0;
        props.setFavorite(id, status);
      } else {
        status = 1;
        props.setFavorite(id, status);
      }
    } else {
      redirectToLogin();
    }
    props.loadFavorites();
  };

  return <article className="cities__place-card place-card" onMouseOver={() => {
    onOfferOver(id);
  }}>
    {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ``}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={setAddress()}>
        <img className="place-card__image" src={images[1]} width="260" height="200" alt="Place image" />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={status === 1 && props.isAuthorized ? `place-card__bookmark-button--active place-card__bookmark-button button` : `place-card__bookmark-button button`} name="bookmark" type="button"ref={bookmarkRef} onClick={clickHandler}>
          <svg className="place-card__bookmark-icon" width="18" height="19" >
            <use xlinkHref="#icon-bookmark" value="tut" ></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: (rating * 2) + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={setAddress()} className="place-card_title">{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onOfferOver: PropTypes.func,
  isPremium: PropTypes.bool.isRequired,
  favorites: PropTypes.array,
  setFavorite: PropTypes.func,
  isAuthorized: PropTypes.bool,
  loadFavorites: PropTypes.func,
  redirectToLogin: PropTypes.func
};
const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favorites: state.favorites,
  isAuthorized: state.isAuthorized,
});

const mapDispatchToProps = {
  setFavorite: (id, status) => Operations.setFavorite(id, status),
  loadFavorites: Operations.loadFavorites,
};

export {Card};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
