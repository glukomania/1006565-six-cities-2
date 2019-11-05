import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../../connect';


class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  init() {
    const {currentOffers, currentCoords} = this.props;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const map = this.mapRef.current ? leaflet.map(this.mapRef.current, {
      center: currentCoords,
      zoom: 12,
      zoomControl: false,
      marker: true
    }) : null;

    if (map) {
      map.setView(map.options.center, map.options.zoom);

      leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);
    }

    const displayMarkers = (coords) => {
      leaflet
      .marker(coords, {icon})
      .addTo(map);
    };

    const allCoords = currentOffers.map((item) => item.coords);

    allCoords.map(displayMarkers);
  }

  render() {
    return (
      <div id="map" style={{height: 100 + `%`}} ref={this.mapRef}></div>
    );
  }

  componentDidMount() {
    this.init();
  }

}

Map.propTypes = {
  currentOffers: PropTypes.arrayOf(
      PropTypes.shape({
        coords: PropTypes.array.isRequired
      })
  ),
  currentCoords: PropTypes.array.isRequired
};


export {Map};
export default connect(mapStateToProps, mapDispatchToProps)(Map);
