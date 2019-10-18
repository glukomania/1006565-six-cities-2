import ReactDOM from 'react-dom';

import App from './components/app/app';

const init = () => {
  const places = [
    {name: `Beautiful & luxurious apartment at great location`},
    {name: `Wood and stone place`},
    {name: `Canal View Prinsengracht`},
    {name: `Nice, cozy, warm big bed apartment`},
    {name: `Wood and stone place`},
  ];

  ReactDOM.render(<App
    places={places}
  />, document.querySelector(`#root`));
};

init();
