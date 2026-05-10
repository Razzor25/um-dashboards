import { render } from '@testing-library/react';
import { HelloWorld } from '../src/hello-world';

describe('Renders the component', () => {
  it('Load the Hello World component', () => {
    const { getByText } = render(<HelloWorld />);
    expect(getByText('Hello World')).toBeInTheDocument();
  });
});
