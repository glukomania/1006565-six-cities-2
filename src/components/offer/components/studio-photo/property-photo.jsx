import PropTypes from 'prop-types';

const PropertyPhoto = (props) => {
  return <div className="property__image-wrapper">
    <img className="property__image" src={props.src} alt="Photo studio" />
  </div>;
};

PropertyPhoto.propTypes = {
  src: PropTypes.string.isRequired
};

export default PropertyPhoto;
