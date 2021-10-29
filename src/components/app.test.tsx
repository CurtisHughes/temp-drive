import { render, screen } from '@testing-library/react';
import App from './app';

test('renders learn react link', () => {
  render(<App />);
  const name = screen.getByText(/temp drive/i);
  expect(name).toBeInTheDocument();
});
