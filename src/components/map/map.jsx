import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../../connect';


class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    const {currentOffers, currentCoords} = this.props;
    this.currentOffers = currentOffers;
    this.currentCoords = currentCoords;


    this.mapRef = React.createRef();

    this.state = {
      offers: currentOffers
    };

    this.init = this.init.bind(this);
  }

  init() {
    this.map = this.mapRef.current ? leaflet.map(this.mapRef.current, {
      center: this.currentCoords,
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

  addMarkersToMap() {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this.markersLayer = leaflet.layerGroup().addTo(this.map);

    const displayMarkers = (coords) => {
      leaflet
      .marker(coords, icon)
      .addTo(this.markersLayer);
    };

    const allCoords = this.currentOffers.map((item) => item.coords);

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
    console.log(this.currentCoords);
    this.setState({offers: this.currentOffers});
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


export {Map};
export default connect(mapStateToProps, mapDispatchToProps)(Map);
