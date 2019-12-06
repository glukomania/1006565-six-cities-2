import {Comment} from './comment';
import renderer from 'react-test-renderer';


const sendComment = jest.fn();

it(`Comment is displayed correctly`, () => {
  const props = {
    id: `1`,
    sendComment,
  };

  const comment = renderer
  .create(<Comment {...props} />).toJSON();

  expect(comment).toMatchSnapshot();
});
