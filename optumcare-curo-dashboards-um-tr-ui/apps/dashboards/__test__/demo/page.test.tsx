import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '../../app/page';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
  useSession: () => ({ status: 'loading' }),
  signIn: jest.fn(),
}));

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
  }),
}));

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning: validateDOMNesting')) {
      return;
    }
  });
});

describe('Renders the dashboard', () => {
  it('Home content loaded', () => {
    const { getByText } = render(<Page />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
