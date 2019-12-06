import {connect} from 'react-redux';
import Header from '../header/header';
import FavoriteEmpty from '../favorite-empty/favorite-emty';
import {Operations} from '../../store/reducer';
import FavoriteCity from './components/favorite-city/favorite-city';

class FavoritesList extends React.PureComponent {
  constructor(props) {
    super();
    props.loadFavorites();

    this.favoriteCities = Array.from(props.favorites.reduce((acc, elem) => acc.add(elem.city.name), new Set()));
  }

  render() {
    return (this.props.favorites.length === 0) ? <FavoriteEmpty /> : <div>
      <Header isInner={true}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {this.favoriteCities.map((item, index) => <FavoriteCity key={index} city={item} favorites={this.props.favorites.filter((favoriteItem) => favoriteItem.city.name === item)}/>)}
            </ul>
          </section>
        </div>
      </main>
    </div>;
  }
}

FavoritesList.propTypes = {
  favorites: PropTypes.array.isRequired,
  loadFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favorites: state.favorites,
});

const mapDispatchToProps = {
  loadFavorites: Operations.loadFavorites,
};

export {FavoritesList};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);
