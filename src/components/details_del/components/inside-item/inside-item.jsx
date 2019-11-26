import PropTypes from 'prop-types';

const InsideItem = (props) => {
  const {item} = props;
  return <li className="property__inside-item">
    {item}
  </li>;
};

InsideItem.propTypes = {
  item: PropTypes.string
};

export default InsideItem;
