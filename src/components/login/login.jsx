import {connect} from 'react-redux';
import {Operations} from '../../store/reducer';
import Header from '../header/header';

class Login extends React.PureComponent {
  constructor() {
    super();

    this.credentials = {
      email: ``,
      password: ``,
    };

    this.validation = {
      isEmailValid: false,
      isPasswordValid: false
    };

    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.formRef = React.createRef();
  }

  checkEmail(email) {
    if (email.length !== 0) {
      return true;
    }
    return false;
  }

  checkPassword(password) {
    if (password.length !== 0) {
      return true;
    }
    return false;
  }

  onEmailInputChange(evt) {
    console.log(evt.target.value);
    this.validation.isEmailValid = this.checkEmail(evt.target.value);
    this.credentials.email = evt.target.value;
  }

  onPasswordInputChange(evt) {
    this.validation.isPasswordValid = this.checkPassword(evt.target.value);
    this.credentials.password = evt.target.value;
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.validation.isEmailValid && this.validation.isPasswordValid) {
      this.props.sendCredentials(this.credentials.email, this.credentials.password);
      this.props.loadFavorites();
      this.props.history.push(`/`);
      return;
    }
    this.formRef.current.classList.add(`apply-shake`);
    return;
  }

  render() {

    return <div>
      <div className="page page--gray page--login">
        <Header isInner={true}/>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" onSubmit={this.handleSubmit} ref={this.formRef}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" onChange={this.onEmailInputChange}/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" onChange={this.onPasswordInputChange}/>
                </div>
                <button className="login__submit form__submit button" type="submit">
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>;
  }
}

Login.propTypes = {
  sendCredentials: PropTypes.func,
  history: PropTypes.object,
  loadFavorites: PropTypes.func
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorized: state.isAuthorized,
  setEmail: state.email,
  sendCredentials: state.sendCredentials,
  userCredentials: state.userCredentials,
});

const mapDispatchToProps = {
  setAuthorizationFlag: () => Operations.setAuthorizationFlag(true),
  sendCredentials: (email, password) => Operations.sendCredentials(email, password),
  loadFavorites: Operations.loadFavorites,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
