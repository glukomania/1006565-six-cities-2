import PropTypes from 'prop-types';

const Features = (props) => {
  const {bedroom, adults} = props;
  return <ul className="property__features">
    <li className="property__feature property__feature--entire">
      Entire place
    </li>
    <li className="property__feature property__feature--bedrooms">
      {bedroom} bedrooms
    </li>
    <li className="property__feature property__feature--adults">
      Max {adults} adults
    </li>
  </ul>;
};

Features.propTypes = {
  entire: PropTypes.string,
  bedroom: PropTypes.number,
  adults: PropTypes.number
};

export default Features;
