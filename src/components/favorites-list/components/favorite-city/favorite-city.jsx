import FavoriteCard from "../favorite-card/favorite-card";
import {Link} from 'react-router-dom';

const FavoriteCity = (props) => {

  return <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to="/" >
          <span>{props.city}</span>
        </Link>
      </div>
    </div>
    <div className="favorites__places">
      {props.favorites.map((item, index) => <FavoriteCard key={index} favorite={item}/>)}
    </div>
  </li>;
};

FavoriteCity.propTypes = {
  favorites: PropTypes.array,
  city: PropTypes.string.isRequired,
};

export default FavoriteCity;

