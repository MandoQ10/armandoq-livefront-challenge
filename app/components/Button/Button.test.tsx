import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders a component with text', () => {
  const buttonLabel = "Testing Button";
  render(<Button label={buttonLabel} />);
  expect(screen.getByText(buttonLabel)).toBeInTheDocument();
});
