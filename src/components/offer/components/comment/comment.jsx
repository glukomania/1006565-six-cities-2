import {connect} from 'react-redux';
import {Operations} from '../../../../store/reducer';

class Comment extends React.PureComponent {

  constructor(props) {
    super();
    this.state = {
      isTextCorrect: false,
      isStarsChosen: false,
      isValid: false,
      title: ``,
      stars: 0,
    };
    this.id = props.id;
    this.formRef = React.createRef();
    this.starsRef = React.createRef();
    this.textRef = React.createRef();
    this.starRef = React.createRef();
    this.buttonRef = React.createRef();
    this.starsChangeHandle = this.starsChangeHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }

  starsChangeHandle(evt) {
    if (evt.target.id !== 0) {
      this.setState({isStarsChosen: true});
      this.setState({stars: this.getRating(evt.target.id)});
    }
    if (this.textRef.current.content && this.state.isStarsChosen) {
      this.buttonRef.current.disabled = false;
    }
  }

  checkState() {
    return this.state.isStarsChosen;
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    if (this.state.title.length >= 50) {
      this.setState.isTextCorrect = true;
      console.log(this.state.stars);
    }
    if (this.setState.isTextCorrect && this.state.isStarsChosen) {
      this.buttonRef.current.disabled = false;
      console.log(this.state.stars);
    }
  }

  getRating(value) {
    if (value === `1-star`) {
      return 1;
    } else if (value === `2-stars`) {
      return 2;
    } else if (value === `3-stars`) {
      return 3;
    } else if (value === `4-stars`) {
      return 4;
    } else if (value === `5-stars`) {
      return 5;
    }
    return null;
  }

  submitHandle(evt) {
    evt.preventDefault();
    this.formRef.current.disabled = true;

    const comment = {
      rating: this.state.stars,
      comment: this.state.title
    };
    if (this.setState.isTextCorrect && this.state.isStarsChosen) {
      this.props.sendComment(this.props.id, comment);
      this.textRef.current.value = ``;
      this.starRef.current.checked = false;
      this.buttonRef.current.disabled = true;
      this.setState.stars = 0;
    } else {
      this.formRef.current.disabled = false;
      this.formRef.current.classList.add(`apply-shake`);
    }
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
        value={this.state.title}
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength="50" maxLength="300" ref={this.textRef}
        onChange={this.handleChange.bind(this)}/>

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
  id: PropTypes.string.isRequired,
  sendComment: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  sendComment: state.sendComment,
});

const mapDispatchToProps = {
  sendComment: (id, comment) => Operations.sendComment(id, comment)
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
