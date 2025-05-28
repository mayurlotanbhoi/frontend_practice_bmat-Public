// src/components/Hello.test.tsx
import { render, screen } from '@testing-library/react';
import Hello from './Hello'; // assuming the component is in the same folder

test.each([
  ['Alice', /hello, alice/i],
  ['Bob', /hello, bob/i],
  ['Charlie', /hello, charlie/i],
])('renders Hello with name %s', (name, expectedText) => {
  render(<Hello name={name} />);
  expect(screen.getByText(expectedText)).toBeInTheDocument();
});