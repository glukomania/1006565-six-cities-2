class Comment extends React.PureComponent {

  constructor(props) {
    super();
    this.starsRef = props.starsRef;
    this.submitHandle = props.submitHandle;
    this.formRef = props.formRef;
    this.starRef = props.starRef;
    this.starsChangeHandle = props.starsChangeHandle;
    this.textRef = props.textRef;
    this.handleChange = props.handleChange;
    this.buttonRef = props.buttonRef;
  }

  render() {
    return <form className="reviews__form form" action="#" method="post" onSubmit={this.submitHandle} ref={this.formRef}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" ref={this.starsRef} onChange={this.starsChangeHandle}>
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" ref={this.starRef}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" ref={this.starRef}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" ref={this.starRef} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" ref={this.starRef} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" ref={this.starRef} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <input
        type="text"
        name="title"
        className="reviews__textarea form__textarea"
        id="review"
        value={this.props.title}
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength="50" maxLength="300" ref={this.textRef}
        onChange={this.handleChange}/>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" ref={this.buttonRef} disabled>Submit</button>
      </div>
    </form>;
  }
}

Comment.propTypes = {
  submitHandle: PropTypes.func,
  starsChangeHandle: PropTypes.func,
  title: PropTypes.string,
  starsRef: PropTypes.object,
  formRef: PropTypes.object,
  starRef: PropTypes.object,
  textRef: PropTypes.object,
  handleChange: PropTypes.func,
  buttonRef: PropTypes.object,
};

export {Comment};
export default Comment;
