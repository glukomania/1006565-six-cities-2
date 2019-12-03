import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Header = (props) => {

  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to="/">
            <img className="header__logo" src={props.isInner ? `../img/logo.svg` : `img/logo.svg`} alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={props.isAuthorized ? `/favorites` : `/login`}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{props.isAuthorized === false ? `Sign in` : props.userCredentials.email}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  userCredentials: PropTypes.object,
  isInner: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorized: state.isAuthorized,
  userCredentials: state.userCredentials,
});

const mapDispatchToProps = {
};

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
