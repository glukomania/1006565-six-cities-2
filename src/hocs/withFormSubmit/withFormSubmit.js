const withFormSubmit = (Component) => {
  class WithFormSubmit extends React.PureComponent {
    constructor(props) {
      super();
      this.state = {
        isTextCorrect: false,
        isStarsChosen: false,
        isValid: false,
        title: ``,
        stars: 0,
      };
    }

    render() {
      return <Component
        {...this.props}
        submitHandle={}
      />;
    }

  }

  return WithFormSubmit;
};

export default withFormSubmit;
