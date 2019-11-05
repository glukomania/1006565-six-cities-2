import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.state = {
      offers: this.props.currentOffers
    };

  }

  init() {
    this.map = this.mapRef.current ? leaflet.map(this.mapRef.current, {
      center: this.props.currentCoords,
      zoom: 12,
      zoomControl: false,
      marker: true
    }) : null;

    if (this.map) {
      this.map.setView(this.map.options.center, this.map.options.zoom);

      leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.map);
    }
  }

  icon() {
    return leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [25, 30]
    });
  }

  addMarkersToMap() {


    this.markersLayer = leaflet.layerGroup().addTo(this.map);

    const displayMarkers = (coords) => {
      leaflet
      .marker(coords, {icon: this.icon()})
      .addTo(this.markersLayer);
    };

    const allCoords = this.props.currentOffers.map((item) => item.coords);

    allCoords.map(displayMarkers);
  }

  render() {
    return (
      <div id="map" style={{height: 100 + `%`}} ref={this.mapRef}></div>
    );
  }

  componentDidMount() {
    this.init();
    this.addMarkersToMap();
  }

  componentDidUpdate() {
    const {currentOffers, currentCoords} = this.props;

    this.map.setView(currentCoords, this.map.options.zoom);
    console.log(currentCoords);
    this.setState({offers: currentOffers});
    this.map.removeLayer(this.markersLayer);

    this.addMarkersToMap();
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


export default Map;
