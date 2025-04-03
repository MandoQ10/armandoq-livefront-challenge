import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders a component with text', () => {
  render(<Button />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
