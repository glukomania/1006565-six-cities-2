const withFormSubmit = (Component) => {
  class WithFormSubmit extends React.PureComponent {
    constructor(props) {
      super();
      this.state = {
        isTextCorrect: false,
        isStarsChosen: false,
        isValid: false,
        title: ``,
        stars: 0,
      };

      this.formRef = React.createRef();
      this.starsRef = React.createRef();
      this.textRef = React.createRef();
      this.starRef = React.createRef();
      this.buttonRef = React.createRef();

      this._starsChangeHandle = this._starsChangeHandle.bind(this);
      this._submitHandle = this._submitHandle.bind(this);
      this._handleChange = this._handleChange.bind(this);
    }

    _starsChangeHandle(evt) {
      if (evt.target.id !== 0) {
        this.setState({
          isStarsChosen: true,
          stars: this._getRating(evt.target.id)
        });

        if (this.textRef.current.content) {
          this.buttonRef.current.disabled = false;
        }
      }
    }

    _checkState() {
      return this.state.isStarsChosen;
    }

    _handleChange(event) {
      this.setState({title: event.target.value});
      if (this.state.title.length >= 50) {
        this.setState.isTextCorrect = true;

        if (this.state.isStarsChosen) {
          this.buttonRef.current.disabled = false;
        }
      }
    }

    _getRating(value) {
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

    _submitHandle(evt) {
      evt.preventDefault();
      this.formRef.current.disabled = true;

      const comment = {
        rating: this.state.stars,
        comment: this.state.title
      };
      if (this.setState.isTextCorrect && this.state.isStarsChosen) {
        this.props.onSubmitClick(comment);
        this.textRef.current.value = ``;
        this.formRef.current.reset();
        this.textRef.current.value = ``;
        this.setState.title = ``;
        this.buttonRef.current.disabled = true;
        this.setState.stars = 0;

      } else {
        this.formRef.current.disabled = false;
        this.formRef.current.classList.add(`apply-shake`);
      }
    }

    render() {
      return <Component
        {...this.props}
        submitHandle={this._submitHandle}
        starsChangeHandle={this._starsChangeHandle}
        handleChange={this._handleChange}
        formRef={this.formRef}
        starsRef={this.starsRef}
        textRef={this.textRef}
        starRef={this.starRef}
        buttonRef={this.buttonRef}
        title={this.state.title}
      />;
    }

  }

  WithFormSubmit.propTypes = {
    onSubmitClick: PropTypes.func,
  };

  return WithFormSubmit;
};

export default withFormSubmit;
