import ReactDOM from 'react-dom';
import {offers} from './mocks/offers';

import App from './components/app/app';

const init = (cityOffers) => {
  ReactDOM.render(<App
    places={cityOffers}
  />, document.querySelector(`#root`));
};

init(offers);
