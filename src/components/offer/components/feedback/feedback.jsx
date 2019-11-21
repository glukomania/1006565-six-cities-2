const Feedback = (props) => {

  // [
  //   {
  //     id: 1,
  //     user: {
  //       id: 4,
  //       is_pro: false,
  //       name: "Max",
  //       avatar_url: "img/1.png"
  //     },
  //     rating: 4,
  //     comment: "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
  //     date: "2019-05-08T14:13:56.569Z"
  //   }
  // ]
  console.log(props);

  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={props.user.avatar_url} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {props.user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: props.rating * 4 + `94%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {props.comment}
      </p>
      <time className="reviews__time" dateTime="2019-04-24">{props.date}</time>
    </div>
  </li>;
};

Feedback.propTypes = {
  user: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.date
};

export default Feedback;
