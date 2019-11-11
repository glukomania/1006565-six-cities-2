import PropTypes from 'prop-types';
import {PureComponent} from 'react';
import {Map} from '../../components/map/map';

const withActualOffers = (Component) => {
  class WithActualOffers extends PureComponent {
    constructor(props) {
      super();
      this.state = {
        offers: props.currentOffers
      };
    }

    render() {
      return <Component
        {...this.props}
        renderOffers={(newCurrentOffers) => this.setState({offers: newCurrentOffers})}
      />;
    }
  }

  WithActualOffers.propTypes = {
    currentOffers: PropTypes.array,
  };

  return WithActualOffers;
};

export default withActualOffers(Map);
