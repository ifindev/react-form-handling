import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import useLoginFormRHF from "./use-login-form-rhf";

function LoginFormTestWrapper() {
  const { register, handleSubmit, errors } = useLoginFormRHF();

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <input {...register("username")} aria-label="Username" />
      <input {...register("password")} aria-label="Password" />
      {errors.username && <span>{errors.username.message}</span>}
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

describe("useLoginFormRHF hook", () => {
  test("fields update with correct values", () => {
    const { result } = renderHook(() => useLoginFormRHF());

    const username = "";
    const password = "secret";

    act(() => {
      result.current.register("username");
      result.current.register("password");

      result.current.setValue("username", username);
      result.current.setValue("password", password);
    });

    expect(result.current.getValues().username).toEqual(username);
    expect(result.current.getValues().password).toEqual(password);
  });

  test("required errors are returned when fields are empty", async () => {
    render(<LoginFormTestWrapper />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  test("validation errors are returned for invalid input", async () => {
    render(<LoginFormTestWrapper />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(usernameInput, { target: { value: "abc" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Invalid username! Valid username should contain minimum 6 characters"
        )
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Invalid password! Valid password should contain minimum 6 characters"
        )
      ).toBeInTheDocument();
    });
  });
});
