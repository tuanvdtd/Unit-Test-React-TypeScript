import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";

describe("Component: <Button/>", () => {
  it('should render the button with the correct text and handle click events', async () => {
    // khởi tạo user ảo để mô phỏng các sự kiện người dùng
    const user = userEvent.setup();

    // tạo một hàm giả giả onClick
    const handleClick = jest.fn();

    // render component Button với content và onClick handler
    render(<Button content="Click me" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /Click me/i });

    // mô phỏng sự kiện click trên button
    await user.click(button);

    // kiểm tra xem button có được render và hàm onClick có được gọi đúng số lần hay không
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});