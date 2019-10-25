import PropTypes from 'prop-types';

const Card = (props) => {
  const {title, images, price, rating, type, onOfferOver, onOfferClick} = props;

  return <article className="cities__place-card place-card" onMouseOver={() => {
    onOfferOver(title);
  }} onClick={() => {
    onOfferClick(title);
  }}>
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={images[1]} width="260" height="200" alt="Place image" />
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: rating + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#" className="place-card_title">{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  onOfferOver: PropTypes.func,
  images: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onOfferClick: PropTypes.func.isRequired,
};

export default Card;
