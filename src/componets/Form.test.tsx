// src/components/Form.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

test('allows user to type their name and submit the form', () => {
  // Render the Form component
  render(<Form />);

  // Find the input field and the submit button using their role or label text
  const input = screen.getByLabelText(/name/i);  // Get the input element by its label
  const button = screen.getByRole('button', { name: /submit/i });  // Get the submit button

  // Step 1: Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'Alice' } });  // Simulate typing 'Alice'

  // Verify that the input value has been updated
  expect(input).toHaveValue('Alice');  // Check that the input field has 'Alice'

  // Step 2: Simulate form submission
  fireEvent.click(button);  // Simulate clicking the submit button

  // Step 3: Verify that the submitted name is displayed in the message
  const message = screen.getByText(/hello, alice/i);  // Check if the message contains 'Hello, Alice!'
  expect(message).toBeInTheDocument();  // Ensure that the message is displayed
});
