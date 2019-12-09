class Sorting extends React.PureComponent {
  constructor(props) {
    super();
    this.handleSortingChange = props.handleSortingChange;
    this.sortTitleRef = React.createRef();
    this.dropDownHandler = this.dropDownHandler.bind(this);
  }

  dropDownHandler() {
    this.sortTitleRef.current.classList.add(`places__options--opened`);
  }

  render() {
    return <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span> &nbsp;
      <span className="places__sorting-type" tabIndex="0" onClick={this.dropDownHandler}>
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" onClick={
        (evt) => {
          this.sortTitleRef.current.classList.remove(`places__options--opened`);
          return this.handleSortingChange(evt);
        }} ref={this.sortTitleRef}>
        <li className="places__option places__option--active" tabIndex="0" data-sorting="popular">Popular</li>
        <li className="places__option" tabIndex="0" data-sorting="priceLow">Price: low to high</li>
        <li className="places__option" tabIndex="0" data-sorting="priceHigh">Price: high to low</li>
        <li className="places__option" tabIndex="0" data-sorting="rated">Top rated first</li>
      </ul>
    </form>;
  }
}

Sorting.propTypes = {
  // setSortingType: PropTypes.func,
  handleSortingChange: PropTypes.func,
};


export default Sorting;
