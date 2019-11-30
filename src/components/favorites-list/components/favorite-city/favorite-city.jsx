import FavoriteCard from "../favorite-card/favorite-card";

const FavoriteCity = (props) => {


  return <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{props.city}</span>
        </a>
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

