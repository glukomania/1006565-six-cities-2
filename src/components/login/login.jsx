import {connect} from 'react-redux';
import {ActionCreator} from '../../store/reducer';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Login extends React.PureComponent {
  constructor(props) {
    super();

    this.state = {
      email: ``,
      isEmailValid: false,
      isPasswordValid: false
    };
    this.onInputChnge = this.onInputChnge.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkEmail(email) {
    if (email.length !== 0) {
      return true;
    }
    return false;
  }

  onInputChnge(evt) {

    this.setState({
      isEmailValid: this.checkEmail(evt.target.value),
      email: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.isEmailValid) {
      this.props.onSubmitClick(true);
      this.props.setEmail(this.state.email);
      return <Redirect to='/' />;
    } else {
      console.log(`email is wrong`);
    }
  }

  render() {
    return <div>
      <div className="page page--gray page--login">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to="/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" onSubmit={this.handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" onChange={this.onInputChnge}/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required=""/>
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
  };
};

Login.propTypes = {
  onSubmitClick: PropTypes.func.isRequired,
  setEmail: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorized: state.isAuthorized,
  setEmail: state.email,

});

const mapDispatchToProps = (dispatch) => ({
  onSubmitClick: () => {
    dispatch(ActionCreator.authorize(true));
  },
  setEmail: (value) => {
    dispatch(ActionCreator.setEmail(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
