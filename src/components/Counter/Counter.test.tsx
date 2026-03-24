import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Component: <Counter/>', () => {
  it('should render the counter and handle increment and decrement correctly', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const counterElement = screen.getByText(/count: /i);
    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });

    expect(counterElement).toHaveTextContent('0');
    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(counterElement).toHaveTextContent('2');

    await user.click(decrementButton);
    await user.click(decrementButton);
    await user.click(decrementButton);
    expect(counterElement).toHaveTextContent('0');
  });
});