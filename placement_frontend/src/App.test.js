import { render, screen } from '@testing-library/react';
import App from './App';

test('renders placement portal title', () => {
  render(<App />);
  const el = screen.getByText(/Placement Portal/i);
  expect(el).toBeInTheDocument();
});
