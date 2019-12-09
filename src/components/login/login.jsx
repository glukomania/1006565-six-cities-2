import {connect} from 'react-redux';
import {Operations} from '../../store/reducer';
import Header from '../header/header';
import {Link} from 'react-router-dom';

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

    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

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

  handleEmailInputChange(evt) {
    this.validation.isEmailValid = this.checkEmail(evt.target.value);
    this.credentials.email = evt.target.value;
  }

  handlePasswordInputChange(evt) {
    this.validation.isPasswordValid = this.checkPassword(evt.target.value);
    this.credentials.password = evt.target.value;
  }

  handleFormSubmit(evt) {
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
              <form className="login__form form" onSubmit={this.handleFormSubmit} ref={this.formRef}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" onChange={this.handleEmailInputChange}/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" onChange={this.handlePasswordInputChange}/>
                </div>
                <button className="login__submit form__submit button" type="submit">
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={`/`}>
                  <span>Amsterdam</span>
                </Link>
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
