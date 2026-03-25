import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "./SignUpForm";

describe("Component: <SignUpForm/>", () => {
  it("should render the sign-up form with initial state", async () => {
    const defaultValues = { email: "tuanvdtd@gmail.com", password: "tuan123456" };

    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} defaultValues={defaultValues} />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    expect(emailInput).toHaveValue(defaultValues.email);
    expect(passwordInput).toHaveValue(defaultValues.password);
  });

  it("should display validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("should display validation error for invalid email format", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} />);
    const emailInput = screen.getByPlaceholderText("Enter email");

    await user.type(emailInput, "invalid-email");
    
    const passwordInput = screen.getByPlaceholderText("Enter password");
    await user.type(passwordInput, "validpassword");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Email is not valid")).toBeInTheDocument();
  });

  it("should display validation error for password less than 6 characters", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    await user.type(emailInput, "tuanvdtd@gmail.com");
    await user.type(passwordInput, "123");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
  });

  it("should call onSubmit with form data when submitting valid form", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<SignUpForm onSubmit={onSubmit} />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    await user.type(emailInput, "tuanvdtd@gmail.com");
    await user.type(passwordInput, "tuan123456");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.click(submitButton);

    // Kiểm tra xem onSubmit đã được gọi với dữ liệu form đúng hay chưa
    expect(onSubmit).toHaveBeenCalledWith({
      email: "tuanvdtd@gmail.com",
      password: "tuan123456",
    });

    // Sau khi submit thành công, form sẽ được reset về giá trị mặc định là empty string
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });

});