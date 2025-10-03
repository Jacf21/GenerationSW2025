import { render, screen } from '@testing-library/react';
import App from './src/App';

test('renders React app', () => {
  render(<App />);
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});