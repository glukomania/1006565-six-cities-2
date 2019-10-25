import PropTypes from 'prop-types';

const StudioPhoto = (props) => {
  return <div className="property__image-wrapper">
    <img className="property__image" src={props.src} alt="Photo studio" />
  </div>;
};

StudioPhoto.propTypes = {
  src: PropTypes.string.isRequired
};

export default StudioPhoto;
