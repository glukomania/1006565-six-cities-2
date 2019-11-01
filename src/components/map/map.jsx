import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
  }

  render() {
    return (
      <div id="map" style={{height: 100 + `%`}} ref={this.mapRef}></div>
    );
  }

  componentDidMount() {
    const {offers} = this.props;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const map = leaflet.map(this.mapRef.current, {
      center: [52.38333, 4.9],
      zoom: 12,
      zoomControl: false,
      marker: true
    });

    map.setView(map.options.center, map.options.zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

    const displayMarkers = (coords) => {
      leaflet
      .marker(coords, {icon})
      .addTo(map);
    };

    const allCoords = offers.map((item) => item.coords);

    allCoords.map(displayMarkers);
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        coords: PropTypes.array.isRequired
      })
  ),
};

export default Map;
