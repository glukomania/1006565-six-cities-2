import renderer from 'react-test-renderer';
import Feedback from './feedback';
import {feedbacks} from '../../../../mocks-for-tests';

it(`Feedback of property are displayed correctly`, () => {
  const feedback = renderer
    .create(<Feedback
      feedback={feedbacks[0]}
    />)
  .toJSON();
  expect(feedback).toMatchSnapshot();
});
