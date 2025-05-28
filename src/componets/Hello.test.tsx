// src/components/Hello.test.tsx
import { render, screen } from '@testing-library/react';
import Hello from './Hello'; // assuming the component is in the same folder

test('renders the correct message', () => {
  render(<Hello name="Alice" />);
  const heading = screen.getByText(/hello, alice/i);
  expect(heading).toBeInTheDocument();
});
