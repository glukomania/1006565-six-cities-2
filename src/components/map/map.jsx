import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import withActualOffers from '../../hocs/withActualOffers/withActualOffers';
import {getCoords} from '../../store/actions';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.isOffer = props.isOffer;
  }

  init() {

    this.map = this.mapRef.current ? leaflet.map(this.mapRef.current, {
      center: getCoords(this.props.currentCity, this.props.currentOffers),
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

  setIcon() {
    if (this.isOffer) {
      return leaflet.icon({
        iconUrl: `../img/pin.svg`,
        iconSize: [25, 30]
      });
    }
    return leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [25, 30]
    });
  }

  setActiveIcon() {
    if (this.isOffer) {
      return leaflet.icon({
        iconUrl: `../img/pin-active.svg`,
        iconSize: [25, 30]
      });
    }
    return leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [25, 30]
    });
  }

  addMarkersToMap() {


    this.markersLayer = leaflet.layerGroup().addTo(this.map);

    const displayMarkers = (coords) => {
      leaflet
      .marker(coords, {icon: this.setIcon()})
      .addTo(this.markersLayer);
    };

    const displayActiveCard = (coords) => {
      if (coords.length !== 0) {
        leaflet
        .marker(coords, {icon: this.setActiveIcon()})
        .addTo(this.markersLayer);
      }
      return;
    };

    const allCoords = this.props.currentOffers.map((item) => this._getCoords(item));

    allCoords.map(displayMarkers);

    displayActiveCard(this.props.activeCardCoords);
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
    const {currentOffers, renderOffers} = this.props;

    this.map.setView(getCoords(this.props.currentCity, this.props.currentOffers), this.map.options.zoom);
    renderOffers(currentOffers);
    this.map.removeLayer(this.markersLayer);

    this.addMarkersToMap();
  }

  _getCoords(offer) {
    return [offer.location.latitude, offer.location.longitude];
  }

}

Map.propTypes = {
  currentOffers: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.object.isRequired
      })
  ),
  currentCity: PropTypes.string.isRequired,
  renderOffers: PropTypes.func,
  isOffer: PropTypes.bool.isRequired,
  activeCardCoords: PropTypes.array.isRequired
};

export default withActualOffers(Map);
